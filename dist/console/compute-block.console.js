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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockConsole = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const image_url_to_buffer_1 = require("../shared/helpers/image-url-to-buffer");
const nest_commander_1 = require("nest-commander");
const sharp_1 = __importDefault(require("sharp"));
const nftSizes = [1, 3, 3, 6, 8, 9, 10, 10, 10, 10, 20, 1];
const width = 360;
const height = width;
const channels = 3;
const whitePixel = 0xffffff;
const emptyCanvas = Buffer.alloc(width * height * channels, whitePixel);
let BlockConsole = class BlockConsole extends nest_commander_1.CommandRunner {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.memo = new Map();
    }
    async run() {
        while (true) {
            const emptyImage = await (0, sharp_1.default)(emptyCanvas, {
                raw: { width, height, channels },
            })
                .png()
                .toBuffer();
            const nfts = await this.prisma.nft.findMany({
                where: {
                    is_active: true,
                },
                orderBy: [{ position: "asc" }, { id: "desc" }],
            });
            const ids = JSON.stringify(nfts.slice(0, 1001).map((x) => x.id));
            if (this.memo.get("ids_1001") === ids) {
                return;
            }
            this.memo.set("ids_1001", ids);
            const imageBuffers = await Promise.all(nfts.map(async (nft) => {
                return (0, image_url_to_buffer_1.imageUrlToBuffer)(nft.image_url).catch(() => emptyImage);
            }));
            const compositeParamsList = [];
            for (let blockNumber = 1; blockNumber <= 12; ++blockNumber) {
                const size = nftSizes[blockNumber - 1];
                const compositeParams = [];
                const borderSize = Math.min(Math.ceil(width / size / 12), 9);
                for (let idx = 0; idx < size * size; ++idx) {
                    let border = borderSize;
                    let imageBuffer = emptyImage;
                    if (imageBuffers.length > 0) {
                        imageBuffer = imageBuffers.shift();
                        border = 0;
                    }
                    if (!imageBuffer)
                        imageBuffer = emptyImage;
                    const buffer = await (0, sharp_1.default)(imageBuffer)
                        .resize({
                        width: width / size - border * 2,
                        height: width / size - border * 2,
                    })
                        .extend({
                        top: border,
                        bottom: border,
                        left: border,
                        right: border,
                        background: "#E6F2F5",
                    })
                        .toBuffer();
                    compositeParams.push({
                        input: buffer,
                        top: (width / size) * Math.trunc(idx / size),
                        left: (width / size) * Math.trunc(idx % size),
                    });
                }
                compositeParamsList.push(compositeParams);
            }
            const outputBuffers = await Promise.all(compositeParamsList.map(async (compositeParams) => {
                return (0, sharp_1.default)(emptyImage).composite(compositeParams).png().toBuffer();
            }));
            await Promise.all(outputBuffers.map(async (outputBuffer, idx) => {
                (0, sharp_1.default)(outputBuffer).toFile(`public/block_${idx + 1}.png`);
            }));
        }
    }
};
exports.BlockConsole = BlockConsole;
exports.BlockConsole = BlockConsole = __decorate([
    (0, nest_commander_1.Command)({
        name: "compute-block",
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlockConsole);
//# sourceMappingURL=compute-block.console.js.map