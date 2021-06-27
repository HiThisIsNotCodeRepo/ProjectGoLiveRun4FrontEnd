import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaoTuiAuthService {
    public myToken = '';
    public myId = '';
    public email = '';
    public lastLogin = '';

    public clearAll(): void {
        this.myToken = '';
        this.myId = '';
        this.email = '';
        this.lastLogin = '';
    }

}
