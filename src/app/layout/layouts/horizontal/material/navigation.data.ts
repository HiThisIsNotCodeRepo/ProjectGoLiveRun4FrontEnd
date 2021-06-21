import { FuseNavigationItem } from '@fuse/components/navigation';
export interface Navigation
{
    default: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}
export const naviData: Navigation = {
    default:
        [
            {
                id: 'browse-task',
                title: 'Browse Task',
                subtitle: 'Custom made application designs',
                type: 'basic',
                icon: 'heroicons_outline:search',
                link: '/browse-task',
            },
            {
                id: 'post-task',
                title: 'Issue Task',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: '/post-task',
            }
        ],
    horizontal:
        [
            {
                id: 'browse-task',
                title: 'Browse Task',
                type: 'basic',
                icon: 'heroicons_outline:search',
                link: '/browse-task'
            },
            {
                id: 'post-task',
                title: 'Issue Task',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                link: '/post-task',
            },
        ]
};
