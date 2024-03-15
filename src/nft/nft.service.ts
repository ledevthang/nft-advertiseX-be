import { Injectable } from "@nestjs/common";
import { PrismaService } from "@root/prisma/prisma.service";
import { CreateNftPayload } from "./parsers/create-nft";
import { fetchNft } from "@root/shared/services/fetch-nft";
import { DateTime } from "luxon";
import { ParseNftQuery } from "./parsers/parse-nft";

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
}
