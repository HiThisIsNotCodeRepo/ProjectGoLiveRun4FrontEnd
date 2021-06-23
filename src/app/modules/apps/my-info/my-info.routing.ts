import { Route } from '@angular/router';
import {MyInfoComponent} from './my-info.component';
import {MyInfoResolver} from './my-info.resolvers';

export const myInfoRoutes: Route[] = [
    {
        path     : '',
        component: MyInfoComponent,
        resolve  : {
            data: MyInfoResolver
        }
    }
];
