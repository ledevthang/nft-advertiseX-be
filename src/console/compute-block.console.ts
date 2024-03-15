import { Command, CommandRunner } from "nest-commander";

@Command({
  name: "compute-block",
})
export class BlockConsole extends CommandRunner {
  constructor() {
    super();
  }
  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {}
}
