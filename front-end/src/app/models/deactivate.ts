import { Observable } from "rxjs";

export interface Deactivate {
    SalirDeRuta: () => Observable<boolean> | boolean;
}
