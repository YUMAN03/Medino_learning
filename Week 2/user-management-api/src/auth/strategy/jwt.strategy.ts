import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config: ConfigService,
    private prisma:PrismaService
  ) {
    console.log('hi');
    const jwtSecret = config.get<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret || 'fallback_secret',
    });
  }

async validate(payload: { sub: number; email: string }) {
  const user = await this.prisma.user.findUnique({
    where: { id: payload.sub },
  });
  console.log('Validating JWT for user:', payload);


  if (!user) throw new ForbiddenException('Access denied');

  return {
  userId: user.id,
  email: user.email,
};
}
}
