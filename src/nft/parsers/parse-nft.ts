import { ApiProperty } from "@nestjs/swagger";

export class ParseNftQuery {
  @ApiProperty()
  tokenAddress: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  chain: string;
}
