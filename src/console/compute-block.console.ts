import { PrismaService } from "@root/prisma/prisma.service";
import { imageUrlToBuffer } from "@root/shared/helpers/image-url-to-buffer";
import { Command, CommandRunner } from "nest-commander";
import sharp from "sharp";

const nftSizes = [1, 3, 3, 6, 8, 9, 10, 10, 10, 10, 20, 1];

const width = 360;
const height = width;
const channels = 3;
const whitePixel = 0xffffff;

const emptyCanvas = Buffer.alloc(width * height * channels, whitePixel); // single block

@Command({
  name: "compute-block",
})
export class BlockConsole extends CommandRunner {
  private memo = new Map<"ids_1001", string>();

  constructor(private prisma: PrismaService) {
    super();
  }

  async run(): Promise<void> {
    const emptyImage = await sharp(emptyCanvas, {
      raw: { width, height, channels },
    })
      .png()
      .toBuffer();

    const nfts = await this.prisma.nft.findMany({
      where: {
        is_active: true,
      },
      orderBy: [{ position: "asc" }, { id: "desc" }],
    });

    const ids = JSON.stringify(nfts.slice(0, 1001).map((x) => x.id));

    if (this.memo.get("ids_1001") === ids) {
      return;
    }

    this.memo.set("ids_1001", ids);

    const imageBuffers = await Promise.all(
      nfts.map(async (nft) => {
        return imageUrlToBuffer(nft.image_url).catch(() => emptyImage);
      }),
    );

    const compositeParamsList = [];

    for (let blockNumber = 1; blockNumber <= 12; ++blockNumber) {
      const size = nftSizes[blockNumber - 1]; //[1, 3, 3, 6, 8, 9, 10, 10, 10, 10, 20, 1]
      const compositeParams = []; // signle block from size 1, 3, 3, 6 , 8 ...
      const borderSize = Math.min(Math.ceil(width / size / 12), 9);

      for (let idx = 0; idx < size * size; ++idx) {
        let border = borderSize;
        let imageBuffer: Buffer = emptyImage;

        if (imageBuffers.length > 0) {
          imageBuffer = imageBuffers.shift()!;
          border = 0;
        }
        if (!imageBuffer) imageBuffer = emptyImage;

        const buffer = await sharp(imageBuffer)
          .resize({
            width: width / size - border * 2,
            height: width / size - border * 2,
          })
          .extend({
            top: border,
            bottom: border,
            left: border,
            right: border,
            background: "#E6F2F5",
          })
          .toBuffer();

        compositeParams.push({
          input: buffer,
          top: (width / size) * Math.trunc(idx / size),
          left: (width / size) * Math.trunc(idx % size),
        }); // piece of single block ( EX: block 12 includes 20x20 pieces, block 11 includes 10x10 pieces )
      }

      compositeParamsList.push(compositeParams); //list of 12 blocks
    }

    const outputBuffers = await Promise.all(
      compositeParamsList.map(async (compositeParams) => {
        return sharp(emptyImage).composite(compositeParams).png().toBuffer();
      }),
    ); // buffer of 12 blocks

    await Promise.all(
      outputBuffers.map(async (outputBuffer, idx) => {
        sharp(outputBuffer).toFile(`public/block_${idx + 1}.png`);
      }),
    );
  }
}
