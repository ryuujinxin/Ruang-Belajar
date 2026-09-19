import { UserRole } from "../../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & Session["user"];
  }

  interface User {
    role: UserRole;
  }
}