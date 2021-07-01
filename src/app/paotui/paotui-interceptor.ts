import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaoTuiAuthService} from './paotui-auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _patotuiAuthService: PaoTuiAuthService,) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('auth')) {
            console.log(`intercept work,${req.url}`);
            const authReq = req.clone({headers: req.headers.set('Authorization', this._patotuiAuthService.myToken)});
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}


