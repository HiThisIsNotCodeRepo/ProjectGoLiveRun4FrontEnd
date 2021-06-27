import { Route } from '@angular/router';
import { AuthSignInComponent } from 'app/paotui/component/sign-in/sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignInComponent
    }
];
