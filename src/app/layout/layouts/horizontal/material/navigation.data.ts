import {FuseNavigationItem} from '@fuse/components/navigation';

export interface Navigation {
    default: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}

export const naviData: Navigation = {
    default:
        [
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
            },
            {
                id: 'my-info',
                title: 'My Info',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/my-info',
            }
        ],
    horizontal:
        [
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
            {
                id: 'my-info',
                title: 'My Info',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/my-info',
            }
        ]
};
