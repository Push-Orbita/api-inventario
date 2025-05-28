import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: keyof any = 'userId', ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        const value = data ? user?.[data] : user;

        // ✅ Forzar número solo si es userId
        return data === 'userId' ? Number(value) : value;
    },
);