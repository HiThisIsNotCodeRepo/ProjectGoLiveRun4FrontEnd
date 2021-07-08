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
|       |-- date.pipe.ts # common pipe
|       |-- paotui.module.ts # module to export pipe etc
|        ...
```

## Installation Note
Now available at [Ansible deployment](https://github.com/qinchenfeng/AnsibleDeployProjectGoLiveRun4)
## New features
### HTTPS
![](https://i.imgur.com/2Hw0ody.png)
## Core features
1. User id and password login
2. Page routing and guard, it based on token issued by back end.
3. Token storage in the singleton service.
## Demo
### Login
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/log_in.gif)
### Sign Up
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/sign_up.gif)
### Add Task
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/add_task.gif)
### Bid Task
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/bid_task.gif)
### Edit Task Expected Rate
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/edit_task_expected_rate.gif)
### Delete Task
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/delete_task.gif)
### Accept Bid Task
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/accept_bid_task.gif)
### View Task History
![DemoGif](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/gif/view_task_history.gif)
## Main Tech Stack
**Angular**,**HTML**,**CSS**,**Javascript**,**Go**,**MySQL**,**Docker**,**Containerd**,**K8s**

## Other
### Git
[git update](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/git/git.md)
### Angular
[angular update](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/angular/angular.md)
### Log
1. [20210619](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/log/log_20210619.md)
2. [20210620](https://github.com/qinchenfeng/ProjectGoLiveRun4FrontEnd/blob/dev/src/doc/log/log_20210620.md)



