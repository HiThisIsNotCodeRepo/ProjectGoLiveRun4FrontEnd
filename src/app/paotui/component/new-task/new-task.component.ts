import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../../app.const';
import {PaoTuiAuthService} from '../../paotui-auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeExpectedRateDialogComponent} from './change-expected-rate-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


interface NewTaskResponse {
    status: string;
    msg: string;
}

interface OnGoingNewTaskResponse {
    tasks: Task[];
}

export interface DialogData {
    animal: string;
    rate: number;
}

interface Task {
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
    taskDeliverId: string;
    taskDeliverRate: number;
    bidders: Bidder[];
}

interface Bidder {
    taskBidderId: string;
    taskBidderRate: number;
}

interface UpdateExpectedRateResponse {
    status: string;
    msg: string;
}

interface DeleteResponse {
    status: string;
    msg: string;
}

@Component({
    selector: 'forms-wizards',
    templateUrl: './new-task.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./new-task.component.css']
})
export class FormsWizardsComponent implements OnInit {
    horizontalStepperForm: FormGroup;
    public dataStr;
    public tasks: Task[];
    rate: number;
    bidderIdChoice: string;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder, private _httpClient: HttpClient, private _patotuiAuthService: PaoTuiAuthService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router,) {
    }

    public tabChange(event: any): void {
        if (event === 1) {
            this._httpClient.get<OnGoingNewTaskResponse>(`${BASE_URL}/tasks/${this._patotuiAuthService.myId}?option=on-going&category=only-me&identity=user`).subscribe(
                (data) => {
                    console.log(data);
                    this.tasks = data.tasks;
                }
            );
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                taskTitle: ['', [Validators.required]],
                from: ['', Validators.required],
                to: ['', Validators.required],
                category: ['', Validators.required],
                expectedRate: ['', Validators.required],

            }),
            step2: this._formBuilder.group({
                start: ['', [Validators.required, timeValidator()]],
                duration: ['', Validators.required],
                description: ['', Validators.required],
            }),
        });
        const date = new Date();
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + '';
        const newHour = date.getHours() + 1;
        const h = (newHour < 10 ? '0' + newHour : newHour) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const dataStr = Y + M + D + 'T' + h + m + '00';
        this.dataStr = dataStr;
        this.horizontalStepperForm.get('step2.start').setValue(this.dataStr);
    }

    sendData(): void {
        const taskTitle = this.horizontalStepperForm.get('step1.taskTitle').value;
        const from = this.horizontalStepperForm.get('step1.from').value;
        const to = this.horizontalStepperForm.get('step1.to').value;
        const category = this.horizontalStepperForm.get('step1.category').value;
        const expectedRate = this.horizontalStepperForm.get('step1.expectedRate').value;
        const duration = this.horizontalStepperForm.get('step2.duration').value;
        const start = this.horizontalStepperForm.get('step2.start').value;
        const description = this.horizontalStepperForm.get('step2.description').value;
        console.log(`taskTitle:${taskTitle} type: ${typeof taskTitle},from:${from} type: ${typeof from},to:${to} type: ${typeof to},category:${category}
        type: ${typeof category},expectedRate:${expectedRate}  type: ${typeof expectedRate},duration:${duration}  type: ${typeof duration},start:${start}  type: ${typeof start}`);
        this._httpClient.post<NewTaskResponse>(`${BASE_URL}/tasks/task`, {
            taskOwnerId: `${this._patotuiAuthService.myId}`,
            taskTitle: taskTitle,
            from: from,
            to: to,
            category: Number(category),
            expectedRate: expectedRate,
            duration: duration,
            start: start,
            description: description,
        }).subscribe((data) => {
            console.log(data);
            if (data.status === 'success') {
                this.openSnackBar('Add successful');
            }

        })
        ;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    updateExpectedRate(taskId: string): void {
        const dialogRef = this.dialog.open(ChangeExpectedRateDialogComponent, {
            width: '400px',
            data: {rate: this.rate}
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result !== undefined) {
                console.log(`The new rate is ${result}`);
                this._httpClient.put<UpdateExpectedRateResponse>(`${BASE_URL}/tasks/task/${taskId}?option=update-expected-rate`, {
                    rate: result,
                }).subscribe((data) => {
                    console.log(data);
                    if (data.status === 'success') {
                        this.openSnackBar('Update successful');
                        this._httpClient.get<OnGoingNewTaskResponse>(`${BASE_URL}/tasks/${this._patotuiAuthService.myId}?option=on-going&category=only-me&identity=user`).subscribe(
                            (response) => {
                                console.log(response);
                                this.tasks = response.tasks;
                            }
                        );
                    }

                });
            }

        });
    }

    confirmDeliver(taskId: string, deliverId: string): void {
        const deliverID = deliverId.split('|')[0];
        const deliverRate = deliverId.split('|')[1];
        console.log(`confirm deliver taskId: ${taskId},deliverId:${deliverID},deliverRate:${deliverRate}`);
        this._httpClient.put<UpdateExpectedRateResponse>(`${BASE_URL}/tasks/task/${taskId}?option=confirm-task-deliver`, {
            deliverRate: Number(deliverRate),
            deliverId: deliverID,
        }).subscribe((data) => {
            console.log(data);
            if (data.status === 'success') {
                this.openSnackBar('Confirm successful');
                this._httpClient.get<OnGoingNewTaskResponse>(`${BASE_URL}/tasks/${this._patotuiAuthService.myId}?option=on-going&category=only-me&identity=user`).subscribe(
                    (response) => {
                        console.log(response);
                        this.tasks = response.tasks;
                    }
                );
            }

        });
    }

    deleteTask(taskId: string): void {
        console.log(`confirm delete taskID: ${taskId}`);
        this._httpClient.delete<DeleteResponse>(`${BASE_URL}/tasks/task/${taskId}?option=delete`).subscribe((data) => {
            console.log(data);
            if (data.status === 'success') {
                this.openSnackBar('Delete successful');
                this._httpClient.get<OnGoingNewTaskResponse>(`${BASE_URL}/tasks/${this._patotuiAuthService.myId}?option=on-going&category=only-me&identity=user`).subscribe(
                    (response) => {
                        console.log(response);
                        this.tasks = response.tasks;
                    }
                );
            } else if (data.status === 'error') {
                this.openSnackBar('Delete fail');
            }

        });
    }

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'close', {
            duration: 2000,
            panelClass: ['my-snack-bar']
        });
    }
}

export function timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDate = new Date(control.value);
        const currentDate = new Date();
        const flag = inputDate < currentDate;
        return flag ? {invalidTime: {value: control.value}} : null;
    };
}
