import { Const } from '../../utils/const';
import { User } from '../../@domain/repository/models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { CorouselImage } from '../model/general/corouselImage';
import { Control } from '../model/general/control';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _imagenSource = new Subject<CorouselImage>();
  corouseObject$ = this._imagenSource.asObservable();

  private lstControlGlobal = new BehaviorSubject<Control[]>([
    { description: '' },
  ]);
  constructor() {}
  SendCorousel(img: CorouselImage) {
    this._imagenSource.next(img);
  }

  setData(data: Control[]) {
    let lstcon: any = localStorage.getItem('control');
    if (lstcon) {
      const cryp = CryptoJS.AES.decrypt(
        JSON.stringify(lstcon),
        Const.KEY
      ).toString();
      this.lstControlGlobal.next(JSON.parse(cryp));
    }
  }

  getData() {
    const observable = this.lstControlGlobal.asObservable();
    if (observable instanceof Observable) {
      return observable;
    } else {
      throw new Error('Data service returned an invalid object');
    }
  }
}
