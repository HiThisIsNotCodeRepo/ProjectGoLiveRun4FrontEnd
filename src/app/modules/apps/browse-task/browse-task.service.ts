import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Category, Task } from 'app/modules/apps/browse-task/browse-task.types';

@Injectable({
    providedIn: 'root'
})
export class TaskService
{
    // Private
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);
    private _task: BehaviorSubject<Task | null> = new BehaviorSubject(null);
    private _tasks: BehaviorSubject<Task[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for courses
     */
    get tasks$(): Observable<Task[]>
    {
        return this._tasks.asObservable();
    }

    /**
     * Getter for course
     */
    get task$(): Observable<Task>
    {
        return this._task.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getCategories(): Observable<Category[]>
    {
        return this._httpClient.get<Category[]>('api/categories').pipe(
            tap((response: any) => {
                this._categories.next(response);
            })
        );
    }

    /**
     * Get courses
     */
    getTasks(): Observable<Task[]>
    {
        return this._httpClient.get<Task[]>('api/browse-task').pipe(
            tap((response: any) => {
                this._tasks.next(response);
            })
        );
    }

    /**
     * Get course by id
     */
    getTaskById(id: string): Observable<Task>
    {
        return this._httpClient.get<Task>('api/browse-task/task', {params: {id}}).pipe(
            map((task) => {

                // Update the course
                this._task.next(task);

                // Return the course
                return task;
            }),
            switchMap((course) => {

                if ( !course )
                {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    }
}
