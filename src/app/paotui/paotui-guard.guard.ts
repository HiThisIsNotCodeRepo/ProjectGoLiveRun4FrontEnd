import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../core/auth/auth.service';
import {PaoTuiAuthService} from './paotui-auth.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../core/user/user.service';
import {map} from 'rxjs/operators';
import {BASE_URL} from './app.const';


interface VerifyTokenResponse {
    status: string;
    msg: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaotuiGuard implements CanActivate, CanActivateChild {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _patotuiAuthService: PaoTuiAuthService,
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkToken();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkToken();
    }

    public checkToken(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._patotuiAuthService.myId.trim().length > 0 && this._patotuiAuthService.myToken.trim().length > 0) {
            return this._httpClient.post<VerifyTokenResponse>(`${BASE_URL}/auth/token-verify/${this._patotuiAuthService.myId}`,
                {token: this._patotuiAuthService.myToken}).pipe(map((response) => {
                if (response.status === 'success') {
                    return true;
                } else {
                    return this._router.createUrlTree(['/sign-in']);
                }
            }));
        } else {
            console.log(`both id and token is empty, redirect to sign-in`);
            return this._router.createUrlTree(['/sign-in']);
        }
    }

}
