import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "@root/prisma/prisma.service";
import { CommandRunner } from "nest-commander";
export declare class PositionConsole extends CommandRunner implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    run(): Promise<void>;
    private createTriggerAndListener;
}
