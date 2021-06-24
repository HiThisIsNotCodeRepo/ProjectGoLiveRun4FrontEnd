import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {MyInfoService} from './my-info.service';

@Injectable({
    providedIn: 'root'
})
export class MyInfoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _projectService: MyInfoService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._projectService.getData();
    }
}
