import { Route } from '@angular/router';
import { CanDeactivateTasksDetails } from 'app/modules/admin/apps/post-task/post-task.guards';
import { TasksResolver, TasksTagsResolver, TasksTaskResolver } from 'app/modules/admin/apps/post-task/post-task.resolvers';
import { BrowseTaskComponent } from 'app/modules/admin/apps/post-task/post-task.component';
import { TasksListComponent } from 'app/modules/admin/apps/post-task/list/list.component';
import { TasksDetailsComponent } from 'app/modules/admin/apps/post-task/details/details.component';

export const tasksRoutes: Route[] = [
    {
        path     : '',
        component: BrowseTaskComponent,
        resolve  : {
            tags: TasksTagsResolver
        },
        children : [
            {
                path     : '',
                component: TasksListComponent,
                resolve  : {
                    tasks: TasksResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : TasksDetailsComponent,
                        resolve      : {
                            task: TasksTaskResolver
                        },
                        canDeactivate: [CanDeactivateTasksDetails]
                    }
                ]
            }
        ]
    }
];
