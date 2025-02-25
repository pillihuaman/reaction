import { Const } from '../../utils/const';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SystemRepository } from '../../@domain/repository/repository/system.repository';
import { SystemRequest } from '../model/general/systemRequest';
import { SystemResponse } from '../model/general/systemResponse';
import { ResponseBody } from '../model/general/responseBody';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends SystemRepository {

    constructor(private http: HttpClient, private apiService: ApiService) {
      super();
    }
    getSystem(): Observable<SystemResponse> {
      const url = `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/system/configuration`;
      return this.apiService.get(url) as Observable<SystemResponse>;
    }
  
    saveSystem(systemRequest: SystemRequest): Observable<SystemResponse> {
      //debugger;
      const url = `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/system`;
      return this.apiService.post(url, systemRequest) as Observable<SystemResponse>;
    }
  
    deleteSystem(systemId: string): Observable<void> {
      const url = `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/system/delete/id/{systemId}`;
      return this.apiService.delete(url);
    }
  
    getSystemById(systemId: string): Observable<SystemResponse> {
      const url = `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/system/id/${systemId}`;
      return this.apiService.get(url) as Observable<SystemResponse>;
    }
  //  abstract searchSystems(params: Partial<SystemRequest>, currentPage:number , pageSize:number): Observable<SystemResponse[]>;

    searchSystems(
      systemRequest: Partial<SystemRequest>,
      page: number,
      pageSize: number,
    ): Observable<ResponseBody> {
      const url = `${Const.API_SUPPORT}/${Const.URL_TYPE_ACCES_PUBLIC}/v1/support/system/list`;
    
      // Construir parámetros de consulta
      let params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
    
      Object.entries(systemRequest).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, String(value));
        }
      });
    //debugger
      // Enviar solicitud GET con parámetros
      return this.http.get(url, { params });
    }
  }