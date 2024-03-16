import { ApiProperty } from "@nestjs/swagger";

export class SearchNftsQuery {
  @ApiProperty()
  pageNumber: number = 1;

  @ApiProperty()
  pageSize: number = 30;
}
