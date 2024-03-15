import { CommandRunner, Command } from "nest-commander";

@Command({
  name: "listen-stream",
})
export class StreamConsole extends CommandRunner {
  constructor() {
    super();
  }
  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {}
}
