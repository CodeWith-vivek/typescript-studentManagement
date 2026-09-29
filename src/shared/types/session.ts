declare module "express-session" {
  interface SessionData {
    student?: string | null;
    admin?: string | null;
  }
}

export {};
