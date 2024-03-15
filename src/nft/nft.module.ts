import { Module } from '@nestjs/common';
import { PrismaService } from '@root/prisma/prisma.service';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

@Module({
  controllers: [NftController],
  providers: [PrismaService, NftService],
})
export class NftModule {}
