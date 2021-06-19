/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps',
        title: 'Applications',
        subtitle: 'Custom made application designs',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.academy',
                title: 'Academy',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/academy'
            },
            {
                id: 'apps.calendar',
                title: 'Calendar',
                subtitle: '3 upcoming events',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/apps/calendar'
            },
            {
                id: 'apps.chat',
                title: 'Chat',
                type: 'basic',
                icon: 'heroicons_outline:chat-alt',
                link: '/apps/chat'
            },
            {
                id: 'apps.contacts',
                title: 'Contacts',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/apps/contacts'
            },
            {
                id: 'apps.ecommerce',
                title: 'ECommerce',
                type: 'collapsable',
                icon: 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id: 'apps.ecommerce.inventory',
                        title: 'Inventory',
                        type: 'basic',
                        link: '/apps/ecommerce/inventory'
                    }
                ]
            },
            {
                id: 'apps.file-manager',
                title: 'File manager',
                type: 'basic',
                icon: 'heroicons_outline:cloud',
                link: '/apps/file-manager'
            },
            {
                id: 'apps.help-center',
                title: 'Help center',
                type: 'collapsable',
                icon: 'heroicons_outline:support',
                link: '/apps/help-center',
                children: [
                    {
                        id: 'apps.help-center.home',
                        title: 'Home',
                        type: 'basic',
                        link: '/apps/help-center',
                        exactMatch: true
                    },
                    {
                        id: 'apps.help-center.faqs',
                        title: 'FAQs',
                        type: 'basic',
                        link: '/apps/help-center/faqs'
                    },
                    {
                        id: 'apps.help-center.guides',
                        title: 'Guides',
                        type: 'basic',
                        link: '/apps/help-center/guides'
                    },
                    {
                        id: 'apps.help-center.support',
                        title: 'Support',
                        type: 'basic',
                        link: '/apps/help-center/support'
                    }
                ]
            },
            {
                id: 'apps.mailbox',
                title: 'Mailbox',
                type: 'basic',
                icon: 'heroicons_outline:mail',
                link: '/apps/mailbox',
                badge: {
                    title: '27',
                    classes: 'px-2 bg-pink-600 text-white rounded-full'
                }
            },
            {
                id: 'apps.notes',
                title: 'Notes',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/apps/notes'
            },
            {
                id: 'apps.scrumboard',
                title: 'Scrumboard',
                type: 'basic',
                icon: 'heroicons_outline:view-boards',
                link: '/apps/scrumboard'
            },
            {
                id: 'apps.tasks',
                title: 'Tasks',
                type: 'basic',
                icon: 'heroicons_outline:check-circle',
                link: '/apps/tasks'
            }
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example2',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example3',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:qrcode',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
