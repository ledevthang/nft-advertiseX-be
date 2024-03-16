"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNft = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchNft = ({ tokenAddress, tokenId, chain = "ethereum", }) => axios_1.default
    .get(`https://api.opensea.io/api/v2/chain/${chain}/contract/${tokenAddress}/nfts/${tokenId}`, {
    headers: {
        "x-api-key": "a4a7a4419218412f878d0b2b9112cc3c",
    },
})
    .then((res) => res.data.nft);
exports.fetchNft = fetchNft;
//# sourceMappingURL=fetch-nft.js.map