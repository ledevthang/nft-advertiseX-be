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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_nft_1 = require("./parsers/create-nft");
const nft_service_1 = require("./nft.service");
const parse_nft_1 = require("./parsers/parse-nft");
const estimate_nft_1 = require("./parsers/estimate-nft");
const search_nft_1 = require("./parsers/search-nft");
const active_nft_1 = require("./parsers/active-nft");
let NftController = class NftController {
    constructor(nftService) {
        this.nftService = nftService;
    }
    search(query) {
        return this.nftService.search(query);
    }
    estimate(query) {
        return this.nftService.estimateNft(query);
    }
    parseNft(query) {
        return this.nftService.parseNft(query);
    }
    activeNft(body) {
        return this.nftService.activeNft(body);
    }
    getMyNfts() {
        return this.nftService.getMeNfts();
    }
    createNft(body) {
        return this.nftService.createNft(body);
    }
};
exports.NftController = NftController;
__decorate([
    (0, common_1.Get)("search"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_nft_1.SearchNftsQuery]),
    __metadata("design:returntype", void 0)
], NftController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("estimate"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estimate_nft_1.EstimateNftQuery]),
    __metadata("design:returntype", void 0)
], NftController.prototype, "estimate", null);
__decorate([
    (0, common_1.Get)("parse"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parse_nft_1.ParseNftQuery]),
    __metadata("design:returntype", void 0)
], NftController.prototype, "parseNft", null);
__decorate([
    (0, common_1.Post)("active"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [active_nft_1.ActiveNftPayload]),
    __metadata("design:returntype", void 0)
], NftController.prototype, "activeNft", null);
__decorate([
    (0, common_1.Get)("me"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NftController.prototype, "getMyNfts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nft_1.CreateNftPayload]),
    __metadata("design:returntype", void 0)
], NftController.prototype, "createNft", null);
exports.NftController = NftController = __decorate([
    (0, common_1.Controller)("nfts"),
    (0, swagger_1.ApiTags)("nfts"),
    __metadata("design:paramtypes", [nft_service_1.NftService])
], NftController);
//# sourceMappingURL=nft.controller.js.map