import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token: string;
  private payload: any;

  constructor(private jwtHelper: JwtHelperService) { }

  setToken(token: string) {
    this.token = token;
    this.extractPayloadFromToken();
  }

  private extractPayloadFromToken() {
    this.payload = this.jwtHelper.decodeToken(this.token);
  }

  getUserRole(): string {
    return this.payload.role;
  }
}
