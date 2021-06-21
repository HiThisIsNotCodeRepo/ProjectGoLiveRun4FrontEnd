import {FuseNavigationItem} from '@fuse/components/navigation';

export interface Navigation {
    default: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}

export const naviData: Navigation = {
    default:
        [
            {
                id: 'dashboards',
                title: 'Dashboards',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/dashboard',
            },
            {
                id: 'search-task',
                title: 'Search Task',
                type: 'basic',
                icon: 'heroicons_outline:search',
                link: '/search-task',
            },
            {
                id: 'post-task',
                title: 'New Task',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: '/new-task',
            }
        ],
    horizontal:
        [
            {
                id: 'dashboards',
                title: 'Dashboards',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/dashboard',
            },
            {
                id: 'search-task',
                title: 'Search Task',
                type: 'basic',
                icon: 'heroicons_outline:search',
                link: '/search-task'
            },
            {
                id: 'post-task',
                title: 'New Task',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: '/new-task',
            },
        ]
};
