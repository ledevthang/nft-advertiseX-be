import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNftPayload } from './parsers/create-nft';
import { NftService } from './nft.service';

@Controller('nfts')
@ApiTags('nfts')
export class NftController {
  constructor(private nftService: NftService) {}

  @Post()
  createNft(@Body() body: CreateNftPayload) {
    return this.nftService.createNft(body);
  }
}
