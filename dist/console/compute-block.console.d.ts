import { PrismaService } from "@root/prisma/prisma.service";
import { CommandRunner } from "nest-commander";
export declare class BlockConsole extends CommandRunner {
    private prisma;
    private memo;
    constructor(prisma: PrismaService);
    run(): Promise<void>;
}
