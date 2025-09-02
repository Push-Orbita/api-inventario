import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
import * as jwt from 'jsonwebtoken';

function decodeJwtFromRequest(ctx: ExecutionContext): JwtPayload {
  const request = ctx.switchToHttp().getRequest();
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException(
      'Token de autorización no encontrado o formato inválido',
    );
  }

  try {
    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'secret';

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') {
      throw new UnauthorizedException('Formato de token inválido');
    }

    return decoded as unknown as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedException('Token inválido');
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedException('Token expirado');
    }
    throw new UnauthorizedException('Error al procesar el token');
  }
}

export const GetUserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const payload = decodeJwtFromRequest(ctx);

    if (!payload.email) {
      throw new UnauthorizedException('Email no encontrado en el token');
    }

    return payload.email;
  },
);

export const GetUserFullName = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const payload = decodeJwtFromRequest(ctx);

    if (!payload.nombre || !payload.apellido) {
      throw new UnauthorizedException(
        'Nombre o apellido no encontrado en el token',
      );
    }

    return `${payload.nombre} ${payload.apellido}`.trim();
  },
);

export const GetUserCuil = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const payload = decodeJwtFromRequest(ctx);

    if (!payload.cuil) {
      throw new UnauthorizedException('CUIL no encontrado en el token');
    }

    return payload.cuil;
  },
);

export const GetUserSystem = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { sistema: string; sistemaId: number } => {
    const payload = decodeJwtFromRequest(ctx);

    if (!payload.sistema || !payload.sistemaId) {
      throw new UnauthorizedException(
        'Información del sistema no encontrada en el token',
      );
    }

    return {
      sistema: payload.sistema,
      sistemaId: payload.sistemaId,
    };
  },
);

export const GetJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    return decodeJwtFromRequest(ctx);
  },
);
