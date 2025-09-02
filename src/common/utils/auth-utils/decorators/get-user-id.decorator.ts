import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
import * as jwt from 'jsonwebtoken';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token de autorización no encontrado o formato inválido',
      );
    }

    try {
      const token = authHeader.substring(7); // Remover 'Bearer '
      const secret = process.env.JWT_SECRET || 'secret';

      const decoded = jwt.verify(token, secret);

      // Verificar que sea un objeto y hacer conversión segura
      if (typeof decoded === 'string') {
        throw new UnauthorizedException('Formato de token inválido');
      }

      const payload = decoded as unknown as JwtPayload;

      if (!payload.id) {
        throw new UnauthorizedException(
          'ID de usuario no encontrado en el token',
        );
      }

      return payload.id;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token expirado');
      }
      throw new UnauthorizedException('Error al procesar el token');
    }
  },
);
