export interface Category {
    id?: string;
    title?: string;
    slug?: string;
}

export interface Task {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}

export interface Paginator {
    pageIndex?: number;
    pageSize?: number;
}
