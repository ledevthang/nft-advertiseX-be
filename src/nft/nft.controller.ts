import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateNftPayload } from "./parsers/create-nft";
import { NftService } from "./nft.service";
import { ParseNftQuery } from "./parsers/parse-nft";
import { EstimateNftQuery } from "./parsers/estimate-nft";
import { SearchNftsQuery } from "./parsers/search-nft";
import { ActiveNftPayload } from "./parsers/active-nft";

@Controller("nfts")
@ApiTags("nfts")
export class NftController {
  constructor(private nftService: NftService) {}

  @Get("search")
  @UsePipes(new ValidationPipe({ transform: true }))
  search(@Query() query: SearchNftsQuery) {
    return this.nftService.search(query);
  }

  @Get("estimate")
  @UsePipes(new ValidationPipe({ transform: true }))
  estimate(@Query() query: EstimateNftQuery) {
    return this.nftService.estimateNft(query);
  }

  @Get("parse")
  parseNft(@Query() query: ParseNftQuery) {
    return this.nftService.parseNft(query);
  }

  @Post("active")
  activeNft(@Body() body: ActiveNftPayload) {
    return this.nftService.activeNft(body);
  }

  @Get("me")
  getMyNfts() {}

  @Post()
  createNft(@Body() body: CreateNftPayload) {
    return this.nftService.createNft(body);
  }
}
