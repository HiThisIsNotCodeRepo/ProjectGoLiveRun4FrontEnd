import {Route} from '@angular/router';
import {TaskListComponent} from 'app/paotui/component/search-task/list.component';

export const academyRoutes: Route[] = [
    {
        path: '',
        component: TaskListComponent,

        children: [
            {
                path: '',
                pathMatch: 'full',
                component: TaskListComponent,

            },

        ]
    }
];
