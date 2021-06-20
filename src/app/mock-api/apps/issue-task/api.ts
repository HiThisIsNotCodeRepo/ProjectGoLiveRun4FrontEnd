import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiUtils } from '@fuse/lib/mock-api/mock-api.utils';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { tags as tagsData, tasks as tasksData } from 'app/mock-api/apps/issue-task/data';

@Injectable({
    providedIn: 'root'
})
export class TasksMockApi
{
    private _tags: any[] = tagsData;
    private _tasks: any[] = tasksData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Tags - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/post-browse-task/tags')
            .reply(() => [
                200,
                cloneDeep(this._tags)
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/post-browse-task/tag')
            .reply(({request}) => {

                // Get the tag
                const newTag = cloneDeep(request.body.tag);

                // Generate a new GUID
                newTag.id = FuseMockApiUtils.guid();

                // Unshift the new tag
                this._tags.unshift(newTag);

                return [
                    200,
                    newTag
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tags - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/post-browse-task/tag')
            .reply(({request}) => {

                // Get the id and tag
                const id = request.body.id;
                const tag = cloneDeep(request.body.tag);

                // Prepare the updated tag
                let updatedTag = null;

                // Find the tag and update it
                this._tags.forEach((item, index, tags) => {

                    if ( item.id === id )
                    {
                        // Update the tag
                        tags[index] = assign({}, tags[index], tag);

                        // Store the updated tag
                        updatedTag = tags[index];
                    }
                });

                return [
                    200,
                    updatedTag
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tag - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/post-browse-task/tag')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the tag and delete it
                const index = this._tags.findIndex(item => item.id === id);
                this._tags.splice(index, 1);

                // Get the post-browse-task that have the tag
                const tasksWithTag = this._tasks.filter(task => task.tags.indexOf(id) > -1);

                // Iterate through them and remove the tag
                tasksWithTag.forEach((task) => {
                    task.tags.splice(task.tags.indexOf(id), 1);
                });

                return [
                    200,
                    true
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tasks - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/post-browse-task/all')
            .reply(() => {

                // Clone the post-browse-task
                const tasks = cloneDeep(this._tasks);

                // Sort the post-browse-task by order
                tasks.sort((a, b) => a.order - b.order);

                return [
                    200,
                    tasks
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tasks Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/post-browse-task/search')
            .reply(({request}) => {

                // Get the search query
                const query = request.params.get('query');

                // Prepare the search results
                let results;

                // If the query exists...
                if ( query )
                {
                    // Clone the post-browse-task
                    let tasks = cloneDeep(this._tasks);

                    // Filter the post-browse-task
                    tasks = tasks.filter(task => task.title && task.title.toLowerCase().includes(query.toLowerCase()) || task.notes && task.notes.toLowerCase()
                                                                                                                                           .includes(query.toLowerCase()));

                    // Mark the found chars
                    tasks.forEach((task) => {
                        const re = new RegExp('(' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
                        task.title = task.title.replace(re, '<mark>$1</mark>');
                    });

                    // Set them as the search result
                    results = tasks;
                }
                // Otherwise, set the results to null
                else
                {
                    results = null;
                }

                return [
                    200,
                    results
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Tasks Orders - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/post-browse-task/order')
            .reply(({request}) => {

                // Get the post-browse-task
                const tasks = request.body.tasks;

                // Go through the post-browse-task
                this._tasks.forEach((task) => {

                    // Find this browse-task's index within the post-browse-task array that comes with the request
                    // and assign that index as the new order number for the browse-task
                    task.order = tasks.findIndex((item: any) => item.id === task.id);
                });

                // Clone the post-browse-task
                const updatedTasks = cloneDeep(this._tasks);

                return [
                    200,
                    updatedTasks
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Task - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/post-browse-task/browse-task')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the post-browse-task
                const tasks = cloneDeep(this._tasks);

                // Find the browse-task
                const task = tasks.find(item => item.id === id);

                return [
                    200,
                    task
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Task - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/post-browse-task/browse-task')
            .reply(({request}) => {

                // Generate a new browse-task
                const newTask = {
                    id       : FuseMockApiUtils.guid(),
                    type     : request.body.type,
                    title    : '',
                    notes    : null,
                    completed: false,
                    dueDate  : null,
                    priority : 1,
                    tags     : [],
                    order    : 0
                };

                // Unshift the new browse-task
                this._tasks.unshift(newTask);

                // Go through the post-browse-task and update their order numbers
                this._tasks.forEach((task, index) => {
                    task.order = index;
                });

                return [
                    200,
                    newTask
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Task - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/post-browse-task/browse-task')
            .reply(({request}) => {

                // Get the id and browse-task
                const id = request.body.id;
                const task = cloneDeep(request.body.task);

                // Prepare the updated browse-task
                let updatedTask = null;

                // Find the browse-task and update it
                this._tasks.forEach((item, index, tasks) => {

                    if ( item.id === id )
                    {
                        // Update the browse-task
                        tasks[index] = assign({}, tasks[index], task);

                        // Store the updated browse-task
                        updatedTask = tasks[index];
                    }
                });

                return [
                    200,
                    updatedTask
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Task - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/post-browse-task/browse-task')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the browse-task and delete it
                const index = this._tasks.findIndex(item => item.id === id);
                this._tasks.splice(index, 1);

                return [
                    200,
                    true
                ];
            });
    }
}
