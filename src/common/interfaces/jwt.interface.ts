
export interface JwtPayload {
  sub: number;
  email: string;
  verificationCode?: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  // user: UsuarioDTO;
}