import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "@root/prisma/prisma.service";
import { CommandRunner, Command } from "nest-commander";
import { Client } from "pg";

@Command({
  name: "compute-position",
})
export class PositionConsole extends CommandRunner implements OnModuleInit {
  constructor(private prisma: PrismaService) {
    super();
  }

  async onModuleInit() {
    await this.createTriggerAndListener();
  }

  async run(): Promise<void> {
    const client = new Client(process.env.DATABASE_URL);

    await client.connect();

    await client.query("LISTEN nfts_change");

    client.on("notification", async () => {
      await this.prisma.$executeRaw`
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
          `;
    });

    console.log("listening nfts");
  }

  private async createTriggerAndListener() {
    await this.prisma.$executeRaw`
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

    await this.prisma.$executeRaw`
        CREATE OR REPLACE TRIGGER nfts_change 
            AFTER 
                INSERT 
                OR DELETE 
                OR UPDATE 
                --OF square_price, is_active
            ON nft
            FOR EACH ROW 
            EXECUTE PROCEDURE nfts_change_listener();
    `;
  }
}
