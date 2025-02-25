
import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class ModalRepository {
  abstract open(componentType: any): void;
 //bstract showToast(status: NbComponentStatus, message: string, title: string): void;
  //open(componentType: any) {
}
