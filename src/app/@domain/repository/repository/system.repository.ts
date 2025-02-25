import { Observable } from 'rxjs';
import { SystemRequest } from '../../../@data/model/general/systemRequest';
import { SystemResponse } from '../../../@data/model/general/systemResponse';
import { ResponseBody } from '../../../@data/model/general/responseBody';

export abstract class SystemRepository {
  /**
   * Obtiene la configuración completa del sistema.
   * @returns Observable con la configuración del sistema.
   */
  abstract getSystem(): Observable<SystemResponse>;

  /**
   * Registra o actualiza la configuración del sistema.
   * @param systemRequest El objeto del sistema a registrar o actualizar.
   * @returns Observable con la configuración registrada o actualizada.
   */
  abstract saveSystem(systemRequest: SystemRequest): Observable<SystemResponse>;

  /**
   * Elimina la configuración actual del sistema.
   * @returns Observable vacío indicando éxito en la operación.
   */
  abstract deleteSystem(systemId: string): Observable<void>;
  /**
   * Busca un sistema por su ID.
   * @param systemId El ID del sistema.
   * @returns Observable con el sistema encontrado.
   */
  abstract getSystemById(systemId: string): Observable<SystemResponse>;

  /**
   * Busca sistemas por parámetros específicos.
   * @param params Un objeto con los parámetros de búsqueda.
   * @returns Observable con una lista de sistemas que coinciden con los parámetros.
   */
  abstract searchSystems(params: Partial<SystemRequest>, currentPage:number , pageSize:number): Observable<ResponseBody>;
}
