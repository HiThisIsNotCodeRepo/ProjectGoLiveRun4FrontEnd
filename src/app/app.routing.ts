import {Route} from '@angular/router';
import {LayoutComponent} from 'app/layout/layout.component';
import {PaotuiGuard} from './paotui/paotui-guard.guard';


// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/paotui/component/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/paotui/component/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/paotui/component/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
        ]
    },
    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        canActivate: [PaotuiGuard],
        canActivateChild: [PaotuiGuard],
        children: [
            // Apps
            {
                path: 'my-info',
                loadChildren: () => import('app/paotui/component/my-info/my-info.module').then(m => m.MyInfoModule)
            },
            {
                path: 'search-task',
                loadChildren: () => import('app/paotui/component/search-task/browse-task.module').then(m => m.BrowseTaskModule)
            },
            {
                path: 'new-task',
                loadChildren: () => import('app/paotui/component/new-task/new-task.module').then(m => m.FormsWizardsModule)
            },
            // 404 page
            {
                path: '404',
                loadChildren: () => import('app/modules/error-404/error-404.module').then(m => m.Error404Module)
            },
        ]
    }
];
