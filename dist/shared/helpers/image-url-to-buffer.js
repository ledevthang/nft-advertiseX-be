"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUrlToBuffer = void 0;
const axios_1 = __importDefault(require("axios"));
const imageUrlToBuffer = async (imageUrl) => {
    console.log("imageUrl: ", imageUrl);
    const response = await (0, axios_1.default)({
        url: imageUrl,
        method: "GET",
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    console.log("buffer: ", buffer);
    return buffer;
};
exports.imageUrlToBuffer = imageUrlToBuffer;
//# sourceMappingURL=image-url-to-buffer.js.map