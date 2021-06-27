import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from "../../app.const";
import {PaoTuiAuthService} from "../../paotui-auth.service";


export interface NewTaskResponse {
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
    favoriteSeason: string;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder, private _httpClient: HttpClient,private _patotuiAuthService: PaoTuiAuthService,) {
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
            taskOwnerId: '${this._patotuiAuthService.myId}',
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
        });
    }

    public tabChange(evn: any) {

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
