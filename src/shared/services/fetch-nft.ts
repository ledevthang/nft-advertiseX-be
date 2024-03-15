import axios from "axios";

type FetchNftParams = {
  tokenAddress: string;
  tokenId: string;
  chain?: string;
};

type NftResponse = {
  nft: {
    identifier: string;
    contract: string;
    image_url: string;
    name: string;
    description?: string;
    animation_url?: string;
    opensea_url?: string;
  };
};

export const fetchNft = ({
  tokenAddress,
  tokenId,
  chain = "ethereum",
}: FetchNftParams) =>
  axios
    .get<NftResponse>(
      `https://api.opensea.io/api/v2/chain/${chain}/contract/${tokenAddress}/nfts/${tokenId}`,
      {
        headers: {
          "x-api-key": "a4a7a4419218412f878d0b2b9112cc3c",
        },
      },
    )
    .then((res) => res.data.nft);
