import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {concatAll, takeUntil} from 'rxjs/operators';
import {AcademyService} from 'app/modules/admin/apps/academy/academy.service';
import {Category, Course, Paginator} from 'app/modules/admin/apps/academy/academy.types';

@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyListComponent implements OnInit, OnDestroy {
    @ViewChild('paginatorObj') paginatorObj: MatPaginator;
    initComplete = false;
    initCategory = 'all';
    initQuery = '';
    paginator: Paginator = {
        pageIndex: 0,
        pageSize: 3,
    };
    categories: Category[];
    courses: Course[];
    filteredCourses: Course[];
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
    b4PaginatorFilterCourseSize: number;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _academyService: AcademyService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the categories
        this._academyService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[]) => {
                this.categories = categories;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the courses
        this._academyService.courses$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((courses: Course[]) => {
                this.courses = this.filteredCourses = courses;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$, this.filters.paginator$])
            .subscribe(([categorySlug, query, hideCompleted, paginator]) => {

                // Reset the filtered courses
                this.filteredCourses = this.courses;

                // Filter by category
                if (categorySlug !== 'all') {
                    this.filteredCourses = this.filteredCourses.filter(course => course.category === categorySlug);

                }

                // Filter by search query
                if (query !== '') {
                    this.filteredCourses = this.filteredCourses.filter(course => course.title.toLowerCase().includes(query.toLowerCase())
                        || course.description.toLowerCase().includes(query.toLowerCase())
                        || course.category.toLowerCase().includes(query.toLowerCase()));
                }

                // Filter by completed
                if (hideCompleted) {
                    this.filteredCourses = this.filteredCourses.filter(course => course.progress.completed === 0);
                }
                // set filtercourse size before paginator
                this.b4PaginatorFilterCourseSize = this.filteredCourses.length;
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
                        this.filteredCourses = this.filteredCourses.slice(0, paginator.pageSize);
                        return;
                    }
                }
                this.filteredCourses = this.filteredCourses.slice(paginator.pageIndex * paginator.pageSize, paginator.pageIndex * paginator.pageSize + paginator.pageSize);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void {
        this.filters.categorySlug$.next(change.value);
    }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    toggleCompleted(change: MatSlideToggleChange): void {
        this.filters.hideCompleted$.next(change.checked);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    // pagination set-up

    handlePageEvent(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.paginator.pageSize = event.pageSize;
        this.paginator.pageIndex = event.pageIndex;
        this.filters.paginator$.next(this.paginator);
    }


}
