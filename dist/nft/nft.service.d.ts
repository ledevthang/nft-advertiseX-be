import { PrismaService } from "@root/prisma/prisma.service";
import { CreateNftPayload } from "./parsers/create-nft";
import { ParseNftQuery } from "./parsers/parse-nft";
import { EstimateNftQuery } from "./parsers/estimate-nft";
import { SearchNftsQuery } from "./parsers/search-nft";
import { ActiveNftPayload } from "./parsers/active-nft";
export declare class NftService {
    private prisma;
    constructor(prisma: PrismaService);
    createNft({ chain, tokenAddress, tokenId, duration, }: CreateNftPayload): Promise<{
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
    parseNft({ tokenAddress, tokenId }: ParseNftQuery): Promise<{
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
    activeNft({ amount, id }: ActiveNftPayload): Promise<{
        hash: string;
    }>;
    estimateNft({ position, squarePrice }: EstimateNftQuery): Promise<{
        avgTime: number;
        squarePrice: number | import("@prisma/client/runtime/library").Decimal | undefined;
        blockNumber: number;
        postionOnCategories: {
            name: string;
            position: number | undefined;
        }[];
    }>;
    search({ pageNumber, pageSize }: SearchNftsQuery): Promise<{
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
    getMeNfts(): Promise<{
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
}
