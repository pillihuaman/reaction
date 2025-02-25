import { Control } from "../../../@data/model/general/control";

export interface User {
  accessToken?: string;
  id?: string;
  name?: string;
  userName?: string;
  email?: string;
  roles?: Array<string>;
  jwToken?: string;
  refresh_token?: string;
  refreshTokenExpiration?: Date;
  id_user?: string;
  control?: Control[];
}
