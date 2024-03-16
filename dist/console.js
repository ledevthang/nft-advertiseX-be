"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_commander_1 = require("nest-commander");
const console_module_1 = require("./console/console.module");
async function bootstrap() {
    await nest_commander_1.CommandFactory.run(console_module_1.ConsoleModule, ["warn", "error", "log"]);
}
bootstrap();
//# sourceMappingURL=console.js.map