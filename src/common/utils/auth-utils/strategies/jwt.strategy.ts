// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Usuario } from 'src/schematics/usuario/entities/usuario.entity';
// import { UsuarioRepository } from 'src/schematics/usuario/repository/usuario.repository';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'usuario') {
//   constructor(
//     @InjectRepository(UsuarioRepository)
//     private usuariosRepository: UsuarioRepository,
//     private configService: ConfigService,
//   ) {
//     super({
//       secretOrKey: configService.get('JWT_SECRET'),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload: JwtPayloadUsuario): Promise<Usuario> {
//     const { cuil } = payload;
//     const usuario: Usuario = await this.usuariosRepository.find({
//       where: {
//         cuil: cuil,
//       },
//     });

//     if (!usuario) {
//       throw new UnauthorizedException();
//     }

//     return usuario;
//   }
// }
