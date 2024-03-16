import { CreateNftPayload } from "./parsers/create-nft";
import { NftService } from "./nft.service";
import { ParseNftQuery } from "./parsers/parse-nft";
import { EstimateNftQuery } from "./parsers/estimate-nft";
import { SearchNftsQuery } from "./parsers/search-nft";
import { ActiveNftPayload } from "./parsers/active-nft";
export declare class NftController {
    private nftService;
    constructor(nftService: NftService);
    search(query: SearchNftsQuery): Promise<{
        data: {
            nftName: string | null;
            chain: string;
            marketplace: string;
            tokenId: string;
            tokenAddress: string;
            originalUrl: string | null;
            position: number;
            squarePrice: import("@prisma/client/runtime/library").Decimal;
            isActive: boolean;
            imageUrl: string;
        }[];
        pageNumber: number;
        pageSize: number;
        total: number;
    }>;
    estimate(query: EstimateNftQuery): Promise<{
        avgTime: number;
        squarePrice: number | import("@prisma/client/runtime/library").Decimal | undefined;
        blockNumber: number;
        postionOnCategories: {
            name: string;
            position: number | undefined;
        }[];
    }>;
    parseNft(query: ParseNftQuery): Promise<{
        id: string;
        nftName: string;
        chain: string;
        tokenId: string;
        tokenAddress: string;
        imageUrl: string;
        price: undefined;
        isActive: boolean;
        marketplace: string;
    }>;
    activeNft(body: ActiveNftPayload): Promise<{
        hash: string;
    }>;
    getMyNfts(): Promise<{
        data: {
            nftName: string | null;
            chain: string;
            marketplace: string;
            tokenId: string;
            tokenAddress: string;
            originalUrl: string | null;
            position: number;
            squarePrice: import("@prisma/client/runtime/library").Decimal;
            isActive: boolean;
            imageUrl: string;
        }[];
        pageNumber: number;
        pageSize: number;
        total: number;
    }>;
    createNft(body: CreateNftPayload): Promise<{
        id: number;
        token_address: string;
        token_id: string;
        image_url: string;
        name: string | null;
        opensea_url: string | null;
        animation_url: string | null;
        description: string | null;
        is_active: boolean;
        duration: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        square_price: import("@prisma/client/runtime/library").Decimal;
        position: number;
        payment_date: Date | null;
    }>;
}
