import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Category, Task} from 'app/paotui/component/search-task/browse-task.types';
import {TaskService} from 'app/paotui/component/search-task/browse-task.service';

@Injectable({
    providedIn: 'root'
})
export class TaskCategoriesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _taskService: TaskService,
        private _router: Router,
    ) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._taskService.getCategories().pipe(
            catchError((error) => {
                this._router.navigateByUrl('/404');
                return throwError(error);
            })
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class TaskListResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private _taskService: TaskService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
        return this._taskService.getTasks();
    }
}

@Injectable({
    providedIn: 'root'
})
export class TaskDetailResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _taskService: TaskService
    ) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
        return this._taskService.getTaskById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested search-task is not available
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
