import { Module } from '@nestjs/common';
import { NftService } from '@root/nft/nft.service';
import { PrismaService } from '@root/prisma/prisma.service';
import { BlockConsole } from './compute-block.console';
import { PositionConsole } from './compute-position.console';

@Module({
  providers: [PrismaService, NftService, BlockConsole, PositionConsole],
})
export class ConsoleModule {}
