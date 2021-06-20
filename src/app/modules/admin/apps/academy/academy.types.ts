export interface Category {
    id: string;
    title: string;
    slug: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    time: string;
    duration: number;
    currentStep: number;
    taskOwnerId: string;
    assignedUserId: string;
    from: string;
    to: string;
    expectedRate: number;
    agreedRate: number;
    steps: {
        order: number;
        title: string;
        subTitle: string;
        content: string;
    }[];
}

export interface Paginator {
    pageIndex: number;
    pageSize: number;
}
