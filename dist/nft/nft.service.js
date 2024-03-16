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
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fetch_nft_1 = require("../shared/services/fetch-nft");
const luxon_1 = require("luxon");
const calculate_position_1 = require("../shared/helpers/calculate-position");
const payment_1 = require("../contract/payment");
let NftService = class NftService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNft({ chain, tokenAddress, tokenId, duration, }) {
        const nft = await (0, fetch_nft_1.fetchNft)({
            tokenAddress,
            tokenId,
            chain,
        });
        return this.prisma.nft.create({
            data: {
                token_address: tokenAddress,
                token_id: tokenId,
                image_url: nft.image_url,
                opensea_url: nft.opensea_url,
                animation_url: nft.animation_url,
                description: nft.description,
                duration,
                name: nft.name,
            },
        });
    }
    async parseNft({ tokenAddress, tokenId }) {
        const nft = await (0, fetch_nft_1.fetchNft)({
            tokenAddress,
            tokenId,
        });
        return {
            id: nft.identifier,
            nftName: nft.name,
            chain: "ethereum",
            tokenId: nft.identifier,
            tokenAddress: nft.contract,
            imageUrl: nft.image_url,
            price: undefined,
            isActive: false,
            marketplace: "opensea",
        };
    }
    async activeNft({ amount, id }) {
        const result = await (0, payment_1.createPayment)(amount);
        const nft = await this.prisma.nft.findUnique({
            where: {
                id,
            },
        });
        if (!nft) {
            throw new Error("not found nft when active");
        }
        const squarePrice = amount / nft.duration;
        await this.prisma.nft.update({
            where: {
                id,
            },
            data: {
                amount,
                is_active: true,
                square_price: squarePrice,
                payment_date: luxon_1.DateTime.now().toJSDate(),
            },
        });
        return {
            hash: result.hash,
        };
    }
    async estimateNft({ position, squarePrice }) {
        if (squarePrice) {
            const matchedNft = await this.prisma.nft.findFirst({
                orderBy: [
                    {
                        square_price: "desc",
                    },
                    {
                        id: "desc",
                    },
                ],
                where: {
                    square_price: {
                        lte: squarePrice,
                    },
                    is_active: true,
                },
            });
            return {
                avgTime: 0,
                squarePrice: matchedNft?.square_price || squarePrice,
                blockNumber: calculate_position_1.positionMap?.[matchedNft?.position || 1001]?.blockNumber || 12,
                postionOnCategories: [
                    {
                        name: "NFT",
                        position: matchedNft?.position ||
                            (await this.prisma.nft.count({ where: { is_active: true } })) + 1,
                    },
                ],
            };
        }
        else {
            const matchedNft = await this.prisma.nft.findFirst({
                where: {
                    is_active: true,
                    position,
                },
            });
            return {
                avgTime: 0,
                squarePrice: matchedNft?.square_price || squarePrice,
                blockNumber: calculate_position_1.positionMap?.[matchedNft?.position || 1001]?.blockNumber || 12,
                postionOnCategories: [
                    {
                        name: "NFT",
                        position: matchedNft?.position || position,
                    },
                ],
            };
        }
    }
    async search({ pageNumber, pageSize }) {
        let [nfts, total] = await Promise.all([
            this.prisma.nft.findMany({
                orderBy: {
                    position: "asc",
                },
                where: {
                    is_active: true,
                    position: {
                        gt: 0,
                    },
                },
            }),
            this.prisma.nft.count({
                where: {
                    is_active: true,
                    position: {
                        gt: 0,
                    },
                },
            }),
        ]);
        const nftsMapped = nfts.map((nft) => ({
            nftName: nft.name,
            chain: "ethereum",
            marketplace: "opensea",
            tokenId: nft.token_id,
            tokenAddress: nft.token_address,
            originalUrl: nft.opensea_url,
            position: nft.position,
            squarePrice: nft.square_price,
            isActive: nft.is_active,
            imageUrl: nft.image_url,
        }));
        return {
            data: nftsMapped,
            pageNumber: 1,
            pageSize: 1000,
            total: 10,
        };
    }
    async getMeNfts() {
        const nfts = await this.prisma.nft.findMany({
            orderBy: {
                id: "desc",
            },
        });
        const nftsMapped = nfts.map((nft) => ({
            nftName: nft.name,
            chain: "ethereum",
            marketplace: "opensea",
            tokenId: nft.token_id,
            tokenAddress: nft.token_address,
            originalUrl: nft.opensea_url,
            position: nft.position,
            squarePrice: nft.square_price,
            isActive: nft.is_active,
            imageUrl: nft.image_url,
        }));
        return {
            data: nftsMapped,
            pageNumber: 1000,
            pageSize: 1,
            total: 900,
        };
    }
};
exports.NftService = NftService;
exports.NftService = NftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NftService);
//# sourceMappingURL=nft.service.js.map