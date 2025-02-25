import { Injectable } from '@angular/core';
import { MAT_DATE_LOCALE, } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  constructor() {
    // Detectar el idioma del navegador
    const browserLang = navigator.language || 'es-ES';
console.log(browserLang)
    // Configurar Moment.js para usar el idioma 'es'
    moment.locale('es');

    // Asignar la configuración a Angular Material
    document.documentElement.lang = browserLang;
    localStorage.setItem('lang', browserLang);

    // Configurar Angular Material con el idioma y localización
    this.setLocaleForAngularMaterial(browserLang);
  }

  private setLocaleForAngularMaterial(language: string) {
//    //debugger
    const locales: { [key: string]: { firstDayOfWeek: number; displayName: string; monthNames: string[]; dayNames: string[] } } = {
      'es-ES': {
        firstDayOfWeek: 1,
        displayName: 'Español',
        monthNames: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      }
    };

    const selectedLocale = locales[language] || locales['es-ES'];

    // Proveedores necesarios para Angular Material y Moment.js
    return [
      { provide: MAT_DATE_LOCALE, useValue: language },
      { provide: LOCALE_ID, useValue: language },
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
      MatMomentDateModule, // Asegúrate de importar el adaptador de Moment.js
    ];
  }
}
