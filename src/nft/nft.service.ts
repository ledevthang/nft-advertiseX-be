import { Injectable } from "@nestjs/common";
import { PrismaService } from "@root/prisma/prisma.service";
import { CreateNftPayload } from "./parsers/create-nft";
import { fetchNft } from "@root/shared/services/fetch-nft";
import { DateTime } from "luxon";
import { ParseNftQuery } from "./parsers/parse-nft";
import { EstimateNftQuery } from "./parsers/estimate-nft";
import { positionMap } from "@root/shared/helpers/calculate-position";
import { SearchNftsQuery } from "./parsers/search-nft";

@Injectable()
export class NftService {
  constructor(private prisma: PrismaService) {}

  async createNft({
    chain,
    tokenAddress,
    tokenId,
    duration,
  }: CreateNftPayload) {
    const nft = await fetchNft({
      tokenAddress,
      tokenId,
      chain,
    });

    await this.prisma.nft.create({
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

  async parseNft({ tokenAddress, tokenId }: ParseNftQuery) {
    const nft = await fetchNft({
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

  async activeNft(id: number, amount: number) {
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
        payment_date: DateTime.now().toJSDate(),
      },
    });
  }

  async estimateNft({ position, squarePrice }: EstimateNftQuery) {
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
        blockNumber:
          positionMap?.[matchedNft?.position || 1001]?.blockNumber || 12,
        postionOnCategories: [
          {
            name: "NFT",
            position:
              matchedNft?.position ||
              (await this.prisma.nft.count({ where: { is_active: true } })) + 1,
          },
        ],
      };
    } else {
      const matchedNft = await this.prisma.nft.findFirst({
        where: {
          is_active: true,
          position,
        },
      });

      return {
        avgTime: 0,
        squarePrice: matchedNft?.square_price || squarePrice,
        blockNumber:
          positionMap?.[matchedNft?.position || 1001]?.blockNumber || 12,
        postionOnCategories: [
          {
            name: "NFT",
            position: matchedNft?.position || position,
          },
        ],
      };
    }
  }

  async search({ pageNumber, pageSize }: SearchNftsQuery) {
    let [nfts, total] = await Promise.all([
      this.prisma.nft.findMany({
        orderBy: {
          position: "desc",
        },
        where: {
          is_active: true,
        },
      }),
      this.prisma.nft.count({
        where: {
          is_active: true,
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
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: total,
    };
  }
}
