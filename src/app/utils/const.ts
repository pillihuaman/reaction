import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Const {
  public static USERNAME_SEGURIDAD: string;
  public static PASSWORD_SEGURIDAD: string;
  public static ACCEPT_COOKIE: string;
  public static API_SEGURIDAD: string;
  public static API_SUPPORT: any;
  public static API_INTELLIGENCY_ARTIFICIAL: any;
  public static API_SEARCH: string;
  public static API_IMAGEN: string;
  static URL_TYPE_ACCES_PRIVATE: any;
  static URL_TYPE_ACCES_PUBLIC: any;
  public static KEY = '@@@@@dddd....dont be evil.....';
  constructor(private http: HttpClient) {
    Const.ACCEPT_COOKIE = 'ACCEPT_COOKIE';
  }
  public loadCommonConfig() {

    return this.http
      .get('assets/config/common.config.pro.json')
      .toPromise()
      .then((config: any) => {
        Const.API_SEGURIDAD = config.public_base_url_seguridad;
        Const.API_SUPPORT = config.public_base_url_support;
        Const.API_SEARCH = config.public_base_url_search;
        Const.URL_TYPE_ACCES_PUBLIC = config.acces_public;
        Const.URL_TYPE_ACCES_PRIVATE = config.acces_private;
        Const.API_IMAGEN = config.public_base_url_imagen;
        Const.API_INTELLIGENCY_ARTIFICIAL =
          config.public_base_url_ingelligency_artificial;
      })
      .catch((err: any) => {

        console.error(err);
      });
  }

  public loadEntidadConfig() {

    return this.http
      .get('assets/config/pillihuaman-web.config.json')
      .toPromise()
      .then((config: any) => {
        Const.USERNAME_SEGURIDAD = config.client_id;
        Const.PASSWORD_SEGURIDAD = config.client_secret;
      })
      .catch((err: any) => {

        console.error(err);
      });
  }
}

export const CREDENCIALES = btoa(
  Const.USERNAME_SEGURIDAD + ':' + Const.PASSWORD_SEGURIDAD
);

// Variable para la cabecera de una solicitud de token
export const HTTP_HEADERS_TOKEN = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic ' + CREDENCIALES,
});

export const DEFAULT_LANG  = 'en-US';