import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateNftPayload } from "./parsers/create-nft";
import { NftService } from "./nft.service";
import { ParseNftQuery } from "./parsers/parse-nft";

@Controller("nfts")
@ApiTags("nfts")
export class NftController {
  constructor(private nftService: NftService) {}

  @Get("parse")
  parseNft(@Query() query: ParseNftQuery) {
    return this.nftService.parseNft(query);
  }

  @Post()
  createNft(@Body() body: CreateNftPayload) {
    return this.nftService.createNft(body);
  }
}
