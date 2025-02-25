import { Observable } from 'rxjs';

import { User } from '../models/user';
import { ImagenTemp } from '../../../@data/model/imagen/imagenTemp';

export abstract class ImagenTempRepository {
  abstract getImagenTemp(): Observable<ImagenTemp[]>;
  abstract registerImagenTemp(
    imagenTemp: ImagenTemp,
    file: File
  ): Observable<ImagenTemp[]>;
}
