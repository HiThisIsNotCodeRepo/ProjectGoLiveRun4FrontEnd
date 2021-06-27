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

## File Directory
As project progresses now slowly merge file
```
|--src
|   |--app
|   ...
|   |-- paotui
|       |-- component # This folder contains main component of the application
|       |-- app.const.ts # Some constant
|       |-- paotui-auth.service.ts # Singleton service store user data
|       |-- paotui-guard.guard.ts # Route guard
|        ...
```
## Page navigation and route guard
1. User id and password login
   - Back end server issue token back.
2. Page routing and guard
   - Only valid token will grant user access to restricted page
3. Token storage
   - Token is stored in the application, refresh will make it lose.
## My Info Page List
1. Spending-Buy Necessity-Card(Yesterday/2 days ago/3 days ago)
2. Spending-Food Delivery-Card(Yesterday/2 days ago/3 days ago)
3. Spending-Send Document-Card(Yesterday/2 days ago/3 days ago)
4. Spending-Other-Card(Yesterday/2 days ago/3 days ago)
5. Spending-Task Summary(Line/Column Table/OverView)(Last Week/This Week)
6. Spending-DataSource
7. Earning-Earning Summary(Last Week/This Week)
8. Earning-Past 2 Days
9. Earning-Past 5 Days
10. Earning-Past 10 Days
11. Earning-DataSource

## Screen Recording
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/Animation_20210627.gif)
## Main Tech Stack
**Angular**,**HTML**,**CSS**,**Javascript**,**Go**,**MySQL**,**Docker**,**Containerd**,**K8s**

## Document Link
### Git
[git update](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/git/git.md)
### Angular
[angular update](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/angular/angular.md)
### Log
1. [20210619](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/log/log_20210619.md)
2. [20210620](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/log/log_20210620.md)



