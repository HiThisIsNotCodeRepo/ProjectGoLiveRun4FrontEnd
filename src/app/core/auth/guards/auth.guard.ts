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
import {AuthService} from 'app/core/auth/auth.service';
import {PaoTuiAuthService} from 'app/paotui/paotui-auth.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../user/user.service';

const user = {
    id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
    name: 'Brian Hughes',
    email: 'hughes.brian@company.com',
    avatar: 'assets/images/avatars/brian-hughes.jpg',
    status: 'online'
};

export interface VerifyTokenResponse {
    status: string;
    msg: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _patotuiAuthService: PaoTuiAuthService,
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }


}
