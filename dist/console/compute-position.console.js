"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionConsole = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const nest_commander_1 = require("nest-commander");
const pg_1 = require("pg");
let PositionConsole = class PositionConsole extends nest_commander_1.CommandRunner {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.createTriggerAndListener();
    }
    async run() {
        const client = new pg_1.Client(process.env.DATABASE_URL);
        await client.connect();
        await client.query("LISTEN nfts_change");
        client.on("notification", async () => {
            await client.query(`
        WITH nft_ext AS (
        SELECT
        "nft"."id",
        row_number() OVER (
          ORDER BY "nft"."square_price" DESC NULLS LAST
        ) AS "index"
        FROM "nft"
        WHERE "nft"."is_active" = true
      )
      UPDATE nft
      SET
        "position" = (
          SELECT "nft_ext"."index"
          FROM "nft_ext"
          WHERE "nft"."id" = "nft_ext"."id"
          LIMIT 1
        )
      WHERE is_active = true
          `);
            console.log("done");
        });
        console.log("listening nfts");
    }
    async createTriggerAndListener() {
        await this.prisma.$executeRaw `
        CREATE OR REPLACE FUNCTION nfts_change_listener()
            RETURNS TRIGGER AS $$
            BEGIN
                IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
                    PERFORM pg_notify('nfts_change', row_to_json(NEW)::text);
                ELSE          
                    PERFORM pg_notify('nfts_change', row_to_json(OLD)::text);
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
    `;
        await this.prisma.$executeRaw `
        CREATE OR REPLACE TRIGGER nfts_change 
            AFTER 
                INSERT 
                OR DELETE 
                OR UPDATE OF square_price, is_active
            ON nft
            FOR EACH ROW 
            EXECUTE PROCEDURE nfts_change_listener();
    `;
    }
};
exports.PositionConsole = PositionConsole;
exports.PositionConsole = PositionConsole = __decorate([
    (0, nest_commander_1.Command)({
        name: "compute-position",
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PositionConsole);
//# sourceMappingURL=compute-position.console.js.map