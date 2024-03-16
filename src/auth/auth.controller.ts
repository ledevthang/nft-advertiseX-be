import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("login")
  login() {
    return {
      accessToken: "nsaognang",
      refreshToken: "moimin",
      user: {
        address: "EKDpZSBnfpJijCwgLPmZnKVnHDe5svMFFHYR4jHTHBAbPPCnuYHH",
      },
    };
  }
}
