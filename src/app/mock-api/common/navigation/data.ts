/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'browse-task',
        title: 'Browse Task',
        subtitle: 'Custom made application designs',
        type: 'basic',
        icon: 'heroicons_outline:search',
        link: '/browse-browse-task',
    },
    {
        id: 'issue-task',
        title: 'Issue Task',
        type: 'basic',
        icon: 'heroicons_outline:plus-circle',
        link: '/issue-browse-task',
    }
];

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'browse-task',
        title: 'Browse Task',
        type: 'basic',
        icon: 'heroicons_outline:search',
        link: '/browse-browse-task'
    },
    {
        id: 'issue-task',
        title: 'Issue Task',
        type: 'basic',
        icon: 'heroicons_outline:plus-circle',
        link: '/issue-browse-task',
    },
];
