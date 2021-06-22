/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'search-task',
        title: 'Browse Task',
        subtitle: 'Custom made application designs',
        type: 'basic',
        icon: 'heroicons_outline:search',
        link: '/browse-search-task',
    },
    {
        id: 'post-task',
        title: 'Issue Task',
        type: 'basic',
        icon: 'heroicons_outline:plus-circle',
        link: '/issue-search-task',
    }
];

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'search-task',
        title: 'Browse Task',
        type: 'basic',
        icon: 'heroicons_outline:search',
        link: '/browse-search-task'
    },
    {
        id: 'post-task',
        title: 'Issue Task',
        type: 'basic',
        icon: 'heroicons_outline:plus-circle',
        link: '/issue-search-task',
    },
];
