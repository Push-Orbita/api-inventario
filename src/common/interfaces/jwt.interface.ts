export interface JwtPayload {
  id: number;
  apellido: string;
  cuil: string;
  email: string;
  exp: number;
  iat: number;
  nombre: string;
  sistema: string;
  sistemaId: number;
  verificationCode?: string;
}
