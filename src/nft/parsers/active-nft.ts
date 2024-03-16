import { ApiProperty } from "@nestjs/swagger";

export class ActiveNftPayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;
}
