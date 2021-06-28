import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, Inject,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {Paginator} from 'app/paotui/component/search-task/browse-task.types';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../app.const';
import {PaoTuiAuthService} from '../../paotui-auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

export interface CategoryResponse {
    status: string;
    msg: string;
    categories: Category[];
}

export interface Category {
    cid: string;
    title: string;
}

interface TaskResponse {
    status: string;
    msg: string;
    tasks: Task[];
}

export interface Task {
    no: number;
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskCategoryId: number;
    taskFrom: string;
    taskTo: string;
    taskCreate: string;
    taskStart: string;
    taskComplete: string;
    taskDuration: number;
    taskStep: number;
    taskOwnerId: string;
    taskOwnerRate: number;
    taskDeliverId: number;
    taskDeliverRate: number;
    bidders: Bidder[];
}

interface Bidder {
    taskBidderId: string;
    taskBidderRate: number;
}

@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
    @ViewChild('paginatorObj') paginatorObj: MatPaginator;
    animal: string;
    name: string;
    initComplete = false;
    initCategory = 'all';
    initQuery = '';
    paginator: Paginator = {
        pageIndex: 0,
        pageSize: 3,
    };
    categories: Category[];
    tasks: Task[];
    filteredTasks: Task[];
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
        paginator$: BehaviorSubject<Paginator>;
    } = {
        categorySlug$: new BehaviorSubject('all'),
        query$: new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false),
        paginator$: new BehaviorSubject(this.paginator),
    };

    // MatPaginator Inputs

    pageSize = 3;
    pageSizeOptions: number[] = [3, 9];
    b4PaginatorFilterTaskSize: number;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _httpClient: HttpClient,
        private _patotuiAuthService: PaoTuiAuthService,
        public dialog: MatDialog
    ) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: {name: this.name, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._httpClient.get<CategoryResponse>(`${BASE_URL}/categories`).subscribe((data) => {
            this.categories = data.categories;
        });
        this._httpClient.get<TaskResponse>(`${BASE_URL}/tasks/${this._patotuiAuthService.myId}?option=on-going&category=exclude-me&identity=user`).subscribe((data) => {
            this.tasks = this.filteredTasks = data.tasks;
            this._changeDetectorRef.markForCheck();
            combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$, this.filters.paginator$])
                .subscribe(([categorySlug, query, hideCompleted, paginator]) => {
                    // Reset the filtered courses
                    this.filteredTasks = this.tasks;

                    // Filter by category
                    if (categorySlug !== 'all') {
                        this.filteredTasks = this.filteredTasks.filter(task => task.taskCategoryId === Number(categorySlug));

                    }

                    // Filter by search query
                    if (query !== '') {
                        this.filteredTasks = this.filteredTasks.filter(task => task.taskTitle.toLowerCase().includes(query.toLowerCase())
                            || task.taskDescription.toLowerCase().includes(query.toLowerCase()));
                    }

                    // set filtercourse size before paginator
                    this.b4PaginatorFilterTaskSize = this.filteredTasks.length;
                    if (this.paginatorObj !== undefined) {
                        let flag = false;
                        if (this.initComplete !== hideCompleted) {
                            flag = true;
                            this.paginatorObj.firstPage();
                            this.initComplete = hideCompleted;
                        }
                        if (this.initCategory !== categorySlug && !flag) {
                            flag = true;
                            this.initCategory = categorySlug;
                        }
                        if (this.initQuery !== query && !flag) {
                            flag = true;
                            this.initQuery = query;
                        }
                        if (flag) {
                            this.paginatorObj.firstPage();
                            this.paginatorObj.pageSize = paginator.pageSize;
                            this.filteredTasks = this.filteredTasks.slice(0, paginator.pageSize);
                            return;
                        }
                    }
                    this.filteredTasks = this.filteredTasks.slice(paginator.pageIndex * paginator.pageSize, paginator.pageIndex * paginator.pageSize + paginator.pageSize);
                });
        });


    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }


    filterByCategory(change: MatSelectChange): void {
        console.log(change.value);
        this.filters.categorySlug$.next(change.value);
    }


    toggleCompleted(change: MatSlideToggleChange): void {
        this.filters.hideCompleted$.next(change.checked);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    handlePageEvent(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.paginator.pageSize = event.pageSize;
        this.paginator.pageIndex = event.pageIndex;
        this.filters.paginator$.next(this.paginator);
    }


}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './dialog.html',
    styles: [
        ``
    ]
})
export class DialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
