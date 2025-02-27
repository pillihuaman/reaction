
import { catchError, map, timeout } from 'rxjs/operators';
import { User } from './../../@domain/repository/models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Router } from '@angular/router';


import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Control } from '../model/general/control';;
import { ModalService } from './modal.service';
import { ResponseBody } from '../model/general/responseBody';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';
import { Utils } from '../../utils/utils';
import { Const } from '../../utils/const';
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends AuthenticationRepository {
  clearUser(): void {
    localStorage.clear();
    this.currentUserSubject.next(null!);
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public defaultHeaders = new HttpHeaders();
  private applicationRoles = [];
  private userRoles = [];
  private lstControlGlobal? = new BehaviorSubject<Control[]>(null!);
  currentControl = this.lstControlGlobal?.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalRepository: ModalRepository,
    private toastrService: NbToastrService,private modalService:ModalService
  ) {
    super();


    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('usuario')!)
    );

    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser);
  }

  public get getCurrentUserValue(): User {
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  login(login: string, clave: string): Observable<any> {
    ////debugger
    this.currentUserSubject.next(null!);
    return this.verifyCredentials(login, clave).pipe(
      catchError((e) => {
        if (!Utils.empty(e)) {
          if (!Utils.empty(e.status)) {
            if (e.status === 400) {
              if (!Utils.empty(e.error)) {
                if (!Utils.empty(e.error.detail)) {
                }
              }
            }
          }
        }
        //   this.modalService.create();
        return e;
        // throw e;
      })
    );
  }

  verifyCredentials(login: string, clave: string): Observable<any> {
////debugger
    /*localStorage.clear();
    const userName = Const.USERNAME_SEGURIDAD;
    //const password = Const.PASSWORD_SEGURIDAD;

    let headers = new HttpHeaders();
    let body: any = {
      username: userName,
      password: clave,
      email: login,
    };
    let httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json',
    ];
    const consumes: string[] = [
      'application/json',
      'text/json',
      'application/_*+json',
    ];
    let auto = null;
    headers = headers.set('Accept', httpHeaderAccepts);
    headers = headers.set('Content-Type', consumes);
    headers = headers.set('email', login);
    headers = headers.set('password', clave);
    const url =
      `${Const.API_SEGURIDAD}` +
      `/api/v1/auth/authenticate`;
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('email', login);
    params.set('password', clave);*/


    localStorage.clear();
    ////debugger
    const userName = Const.USERNAME_SEGURIDAD;

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');

    let body = {
        username: userName,
        password: clave,
        email: login,
    };

    const url = `${Const.API_SEGURIDAD}/api/v1/auth/authenticate`;

    return this.http.post<ResponseBody>(url, JSON.stringify(body), { headers: headers }).pipe(
     // timeout(2000),
      map((response: ResponseBody) => {
        const usuario = response as ResponseBody;
        this.currentUserSubject.next({
          accessToken: response.payload.accessToken
        });
        debugger
        let userinfo:User=usuario.payload.user;
        userinfo.accessToken= response.payload.accessToken;
        localStorage.setItem('usuario', JSON.stringify(userinfo));
        localStorage.setItem('token', response.payload.accessToken + '');
       /* if (response.control) {
          const cryp = CryptoJS.AES.encrypt(
            JSON.stringify(response.control),
            Const.KEY
          ).toString();
          localStorage.setItem('control', cryp + '');
          // this.dataService.setData(response.control);
        }*/
        return response.payload.user;
      }),
     /* catchError((e) => {
        let nbComponentStatus: NbComponentStatus = 'danger';
        this.router.navigate(['/auth/login']);
        this.modalRepository.showToast(nbComponentStatus, e.message+"Authenti interce");
        throw e;
      })*/
    );
  }
}
