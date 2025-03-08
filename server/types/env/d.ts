declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      PORT: string;
      MONGODB_URI: string;
    }
  }
}

export {};
