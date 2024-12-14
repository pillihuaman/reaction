import { NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class SpinnerRepository {
  abstract show(): void;
  abstract hide(): void;
}
