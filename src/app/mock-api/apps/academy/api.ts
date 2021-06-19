import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { categories as categoriesData, tasks as tasksData, taskSteps as taskStepsData } from 'app/mock-api/apps/academy/data';

@Injectable({
    providedIn: 'root'
})
export class AcademyMockApi
{
    private _categories: any[] = categoriesData;
    private _tasks: any[] = tasksData;
    private _taskSteps: any[] = taskStepsData;

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
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/categories')
            .reply(() => {

                // Clone the categories
                const categories = cloneDeep(this._categories);

                // Sort the categories alphabetically by title
                categories.sort((a, b) => a.title.localeCompare(b.title));

                return [200, categories];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Courses - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/tasks')
            .reply(() => {

                // Clone the courses
                const courses = cloneDeep(this._tasks);

                return [200, courses];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Course - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/tasks/task')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the courses and steps
                const courses = cloneDeep(this._tasks);
                const steps = cloneDeep(this._taskSteps);

                // Find the course and attach steps to it
                const course = courses.find(item => item.id === id);
                if ( course )
                {
                    course.steps = steps;
                }

                return [
                    200,
                    course
                ];
            });
    }
}
