# Go School Project Go Live Run 4
## Project Title: Pao Tui(跑腿)
**Front End Interface**
>Author: Qin Chenfeng
>
> Email:freddy.qin@gmail.com

## Project Description
Due to Covid 19, an ad hoc job posting platform has emerged to provide more job opportunities, anyone can post their urgent task with personalised requirements ,for instance deliver food, buy necessity, send documents etc, it also needs to include max acceptable rate and expected delivery time. Anyone who is interested in making pocket money can bid for the job with their minimum acceptable rate and finish time. Among those service providers, job posters should pick one. Once a job is assigned, the service provider should do their best to complete the task before the deadline to avoid any penalty.

## Front Ende Template Selection
To expediate front end developement, I have choosen a [template](https://themeforest.net/item/fuse-angularjs-material-design-admin-template/12931855?gclid=CjwKCAjwq7aGBhADEiwA6uGZpx14Dv86Apxo_47dPNLqdKC3U5N7gDGr9eBmZ-sn1-lpdgRpDAkTvhoCTmUQAvD_BwE) which provide UI structure layout and material components. So I can more focus on the logic development.

## Core Feature I Expected To Accomplish In Front End
1. User registeration page.
    - Use the template page in the UI template.
3. User login.
    - Use the template page in the UI template.
3. Search task page.
    - The original template page in the UI template isn't good enough, for example it lacks of pagination control
4. Task inseration page.

## Update on 2021/6/19
![](https://i.imgur.com/QkWLSZt.gif)

### How to make paginator work
The paginator feature is with `<mat-paginator>`tag,you can find the reference [here](https://material.angular.io/components/paginator/overview).
It has a few propertis to suit your need. Here I use `length`,`pageSize`,`pageSizeOptions`, and event `page`.
```
<mat-paginator
    #paginatorObj
    [length]="b4PaginatorFilterCourseSize"
    [pageSize]="pageSize"
    [pageSizeOptions]="pageSizeOptions"
    (page)="handlePageEvent($event)">
    >
</mat-paginator>
```
As we can see, the search page already has some input form.
![Alt_Text](https://i.imgur.com/eyB3nnh.png)
That means every time when we set new value or update value the list needs to be updated. This can be achieved by RxJs operators `combineLatest`.
The paginator control needs some attention as when other inputs change the final list may change as well, to avoid any page index over the limit I have set the page number to 0 here.
```
 if (this.initComplete !== hideCompleted)
...
if (this.initCategory !== categorySlug && !flag)
...
if (this.initQuery !== query && !flag)
...

```
