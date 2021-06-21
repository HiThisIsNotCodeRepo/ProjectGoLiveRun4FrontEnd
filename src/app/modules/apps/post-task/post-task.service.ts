import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Tag, Task } from 'app/modules/apps/post-task/post-task.types';

@Injectable({
    providedIn: 'root'
})
export class PostTaskService
{
    // Private
    private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);
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
     * Getter for tags
     */
    get tags$(): Observable<Tag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for browse-task
     */
    get task$(): Observable<Task>
    {
        return this._task.asObservable();
    }

    /**
     * Getter for post-browse-task
     */
    get tasks$(): Observable<Task[]>
    {
        return this._tasks.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tags
     */
    getTags(): Observable<Tag[]>
    {
        return this._httpClient.get<Tag[]>('api/apps/post-browse-task/tags').pipe(
            tap((response: any) => {
                this._tags.next(response);
            })
        );
    }

    /**
     * Crate tag
     *
     * @param tag
     */
    createTag(tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<Tag>('api/apps/post-browse-task/tag', {tag}).pipe(
                map((newTag) => {

                    // Update the tags with the new tag
                    this._tags.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                })
            ))
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<Tag>('api/apps/post-browse-task/tag', {
                id,
                tag
            }).pipe(
                map((updatedTag) => {

                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                })
            ))
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/apps/post-browse-task/tag', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.tasks$.pipe(
                    take(1),
                    map((tasks) => {

                        // Iterate through the post-browse-task
                        tasks.forEach((task) => {

                            const tagIndex = task.tags.findIndex(tag => tag === id);

                            // If the browse-task has a tag, remove it
                            if ( tagIndex > -1 )
                            {
                                task.tags.splice(tagIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    })
                ))
            ))
        );
    }

    /**
     * Get post-browse-task
     */
    getTasks(): Observable<Task[]>
    {
        return this._httpClient.get<Task[]>('api/apps/post-browse-task/all').pipe(
            tap((response) => {
                this._tasks.next(response);
            })
        );
    }

    /**
     * Update post-browse-task orders
     *
     * @param tasks
     */
    updateTasksOrders(tasks: Task[]): Observable<Task[]>
    {
        return this._httpClient.patch<Task[]>('api/apps/post-browse-task/order', {tasks});
    }

    /**
     * Search post-browse-task with given query
     *
     * @param query
     */
    searchTasks(query: string): Observable<Task[] | null>
    {
        return this._httpClient.get<Task[] | null>('api/apps/post-browse-task/search', {params: {query}});
    }

    /**
     * Get browse-task by id
     */
    getTaskById(id: string): Observable<Task>
    {
        return this._tasks.pipe(
            take(1),
            map((tasks) => {

                // Find the browse-task
                const task = tasks.find(item => item.id === id) || null;

                // Update the browse-task
                this._task.next(task);

                // Return the browse-task
                return task;
            }),
            switchMap((task) => {

                if ( !task )
                {
                    return throwError('Could not found browse-task with id of ' + id + '!');
                }

                return of(task);
            })
        );
    }

    /**
     * Create browse-task
     *
     * @param type
     */
    createTask(type: string): Observable<Task>
    {
        return this.tasks$.pipe(
            take(1),
            switchMap(tasks => this._httpClient.post<Task>('api/apps/post-browse-task/browse-task', {type}).pipe(
                map((newTask) => {

                    // Update the post-browse-task with the new browse-task
                    this._tasks.next([newTask, ...tasks]);

                    // Return the new browse-task
                    return newTask;
                })
            ))
        );
    }

    /**
     * Update browse-task
     *
     * @param id
     * @param task
     */
    updateTask(id: string, task: Task): Observable<Task>
    {
        return this.tasks$
                   .pipe(
                       take(1),
                       switchMap(tasks => this._httpClient.patch<Task>('api/apps/post-browse-task/browse-task', {
                           id,
                           task
                       }).pipe(
                           map((updatedTask) => {

                               // Find the index of the updated browse-task
                               const index = tasks.findIndex(item => item.id === id);

                               // Update the browse-task
                               tasks[index] = updatedTask;

                               // Update the post-browse-task
                               this._tasks.next(tasks);

                               // Return the updated browse-task
                               return updatedTask;
                           }),
                           switchMap(updatedTask => this.task$.pipe(
                               take(1),
                               filter(item => item && item.id === id),
                               tap(() => {

                                   // Update the browse-task if it's selected
                                   this._task.next(updatedTask);

                                   // Return the updated browse-task
                                   return updatedTask;
                               })
                           ))
                       ))
                   );
    }

    /**
     * Delete the browse-task
     *
     * @param id
     */
    deleteTask(id: string): Observable<boolean>
    {
        return this.tasks$.pipe(
            take(1),
            switchMap(tasks => this._httpClient.delete('api/apps/post-browse-task/browse-task', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted browse-task
                    const index = tasks.findIndex(item => item.id === id);

                    // Delete the browse-task
                    tasks.splice(index, 1);

                    // Update the post-browse-task
                    this._tasks.next(tasks);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}
