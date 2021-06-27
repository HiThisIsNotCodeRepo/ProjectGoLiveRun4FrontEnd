import { Route } from '@angular/router';
import { BrowseTaskComponent } from 'app/paotui/component/search-task/browse-task.component';
import { TaskListComponent } from 'app/paotui/component/search-task/list/list.component';
import { TaskDetailsComponent } from 'app/paotui/component/search-task/details/details.component';
import { TaskCategoriesResolver, TaskDetailResolver, TaskListResolver } from 'app/paotui/component/search-task/browse-task.resolvers';

export const academyRoutes: Route[] = [
    {
        path     : '',
        component: BrowseTaskComponent,
        resolve  : {
            categories: TaskCategoriesResolver
        },
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: TaskListComponent,
                resolve  : {
                    courses: TaskListResolver
                }
            },
            {
                path     : ':id',
                component: TaskDetailsComponent,
                resolve  : {
                    course: TaskDetailResolver
                }
            }
        ]
    }
];
