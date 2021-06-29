import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {} from '../search-task/list.component';
import {FormGroup} from '@angular/forms';
import {DialogData} from './new-task.component';

@Component({
    selector: 'change-expected-rate-dialog',
    templateUrl: './change-expected-rate-dialog.html',
    styles: [
        ''
    ]
})
export class ChangeExpectedRateDialogComponent {
    horizontalStepperForm: FormGroup;
    public dataStr;

    constructor(
        public dialogRef: MatDialogRef<ChangeExpectedRateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        const date = new Date();
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + '';
        const newHour = date.getHours() + 1;
        const h = (newHour < 10 ? '0' + newHour : newHour) + ':';
        const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        const dataStr = Y + M + D + 'T' + h + m + '00';
        this.dataStr = dataStr;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
