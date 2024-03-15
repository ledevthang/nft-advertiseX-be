import { CommandRunner, Command } from 'nest-commander';

@Command({
  name: 'compute-position',
})
export class PositionConsole extends CommandRunner {
  constructor() {
    super();
  }
  async run(
    passedParams: string[],
    options?: Record<string, any> | undefined,
  ): Promise<void> {}
}
