import { CommandRunner } from "nest-commander";
export declare class StreamConsole extends CommandRunner {
    constructor();
    run(passedParams: string[], options?: Record<string, any> | undefined): Promise<void>;
}
