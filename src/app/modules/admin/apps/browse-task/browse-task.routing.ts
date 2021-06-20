import { Route } from '@angular/router';
import { BrowseTaskComponent } from 'app/modules/admin/apps/browse-task/browse-task.component';
import { AcademyListComponent } from 'app/modules/admin/apps/browse-task/list/list.component';
import { AcademyDetailsComponent } from 'app/modules/admin/apps/browse-task/details/details.component';
import { AcademyCategoriesResolver, AcademyCourseResolver, AcademyCoursesResolver } from 'app/modules/admin/apps/browse-task/browse-task.resolvers';

export const academyRoutes: Route[] = [
    {
        path     : '',
        component: BrowseTaskComponent,
        resolve  : {
            categories: AcademyCategoriesResolver
        },
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: AcademyListComponent,
                resolve  : {
                    courses: AcademyCoursesResolver
                }
            },
            {
                path     : ':id',
                component: AcademyDetailsComponent,
                resolve  : {
                    course: AcademyCourseResolver
                }
            }
        ]
    }
];
