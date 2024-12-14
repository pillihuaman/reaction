import { Const } from '../../utils/const';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SystemRepository } from '../../@domain/repository/repository/system.repository';
import { SystemRequest } from '../model/general/systemRequest';
import { SystemResponse } from '../model/general/systemResponse';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends SystemRepository {

    constructor(private http: HttpClient, private apiService: ApiService) {
      super();
    }
    getSystem(): Observable<SystemResponse> {
      const url = `${Const.API_SUPPORT}/v1/system/configuration`;
      return this.apiService.get(url) as Observable<SystemResponse>;
    }
  
    saveSystem(systemRequest: SystemRequest): Observable<SystemResponse> {
      const url = `${Const.API_SUPPORT}/v1/system`;
      return this.apiService.post(url, systemRequest) as Observable<SystemResponse>;
    }
  
    deleteSystem(systemId: string): Observable<void> {
      const url = `${Const.API_SUPPORT}/v1/system/delete/id/{systemId}`;
      return this.apiService.delete(url);
    }
  
    getSystemById(systemId: string): Observable<SystemResponse> {
      const url = `${Const.API_SUPPORT}/v1/system/id/${systemId}`;
      return this.apiService.get(url) as Observable<SystemResponse>;
    }
  
    searchSystems(params: Partial<SystemRequest>): Observable<SystemResponse[]> {
      const url = `${Const.API_SUPPORT}/v1/system/list`;
      let httpParams = new HttpParams();
  
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
  
      return this.apiService.get(url, { params: httpParams }) as Observable<SystemResponse[]>;
    }
  }