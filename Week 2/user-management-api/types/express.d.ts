import { User as JwtPayloadUser } from 'src/auth/types'; // or define inline if small

declare global {
  namespace Express {
    interface User {
      sub: number;
      email: string;
      // add more fields if present in JWT
    }
  }
}
