import { ApiProperty } from '@nestjs/swagger';

export class CreateNftPayload {
  @ApiProperty()
  tokenAddress: string;

  @ApiProperty()
  tokenId: string;

  @ApiProperty()
  chain: string;

  @ApiProperty()
  duration: number;
}
