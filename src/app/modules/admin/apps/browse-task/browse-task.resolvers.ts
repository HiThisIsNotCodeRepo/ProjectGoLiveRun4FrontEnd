import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Task } from 'app/modules/admin/apps/browse-task/browse-task.types';
import { AcademyService } from 'app/modules/admin/apps/browse-task/browse-task.service';

@Injectable({
    providedIn: 'root'
})
export class AcademyCategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _academyService: AcademyService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>
    {
        return this._academyService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcademyCoursesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _academyService: AcademyService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]>
    {
        return this._academyService.getTasks();
    }
}

@Injectable({
    providedIn: 'root'
})
export class AcademyCourseResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _academyService: AcademyService
    )
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task>
    {
        return this._academyService.getTaskById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested browse-task is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}
