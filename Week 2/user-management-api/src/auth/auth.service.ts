import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignupDto } from './auth.signup.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthLoginDto } from './auth.login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, 
        private jwt:JwtService,
        private config: ConfigService){}
        async login(dto:AuthLoginDto) {
            const user= await this.prisma.user.findUnique({
                where: {
                    email:dto.email,
                },

            });
            if(!user)
                throw new ForbiddenException('Credentials incorrect');
            const pwMatches =await argon.verify(user.password,dto.password);
            if(!pwMatches)
                throw new ForbiddenException('Incorrect Password');
            return this.signToken(user.id,user.email);         
        }
    async signup(dto: AuthSignupDto) {
      try {
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            password: hash,
          },
        });

        return this.signToken(user.id,user.email);
      } 
      catch (error) {
        console.error('Signup error:', error);
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }

        throw new InternalServerErrorException('Something went wrong during signup');
      }
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
      const payload = { sub: userId, email };
      const secret = this.config.get('JWT_SECRET');
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      });
      return {
        access_token: token,
      };
  }
}
