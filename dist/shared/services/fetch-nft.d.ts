type FetchNftParams = {
    tokenAddress: string;
    tokenId: string;
    chain?: string;
};
export declare const fetchNft: ({ tokenAddress, tokenId, chain, }: FetchNftParams) => Promise<{
    identifier: string;
    contract: string;
    image_url: string;
    name: string;
    description?: string | undefined;
    animation_url?: string | undefined;
    opensea_url?: string | undefined;
}>;
export {};
