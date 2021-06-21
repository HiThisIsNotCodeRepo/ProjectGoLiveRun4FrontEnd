# Angular

## Rxjs operator `combineLatest`
This operator is used to read all the inputs given in the operator on the event of input change.
### What is the best situation to use it?
One good example is to use it in the filter process.
```
       combineLatest([this.filters.categorySlug$, this.filters.query$, this.filters.hideCompleted$, this.filters.paginator$])
            .subscribe(([categorySlug, query, hideCompleted, paginator]) => {

                // Reset the filtered courses
                this.filteredTasks = this.tasks;

                // Filter by category
                if (categorySlug !== 'all') {
                    this.filteredTasks = this.filteredTasks.filter(task => task.category === categorySlug);

                }

                // Filter by search query
                if (query !== '') {
                    this.filteredTasks = this.filteredTasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())
                        || task.description.toLowerCase().includes(query.toLowerCase())
                        || task.category.toLowerCase().includes(query.toLowerCase()));
                }

                // Filter by completed
                if (hideCompleted) {
                    this.filteredTasks = this.filteredTasks.filter(task => task.assignedUserId === '');
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
```

## Angular Resolver
It can be used to prepare data before router get into the specific page.
### Resolver error handling
One strategy is to inject `Router`, and use `pipe` to do view navigation.
```
@Injectable({
    providedIn: 'root'
})
export class TaskCategoriesResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private _taskService: TaskService,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
        return this._taskService.getCategories().pipe(
            catchError((error) => {
                this._router.navigateByUrl('/404');
                return throwError(error);
            })
        );
    }
}

```

## Common Script
`ng n <project name> --routing`

- Create a new project with routing feature.

`ng add @angular/material`

- Add angular material to project
