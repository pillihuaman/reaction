import { Menu } from "./menu";
export interface SystemRequest {
    name?: string;
    version?: string;
    mainMenu?: Menu;
    timezone?: string;
    contactEmail?: string;
    supportPhone?: string;

  }
