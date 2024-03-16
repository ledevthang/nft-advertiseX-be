import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class EstimateNftQuery {
  @ApiPropertyOptional()
  @Type(() => Number)
  squarePrice?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  position?: number = 1;
}
