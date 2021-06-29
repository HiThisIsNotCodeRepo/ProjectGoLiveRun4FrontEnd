import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExpectedRateDialogData} from './list.component';

@Component({
    selector: 'expected-rate-dialog',
    templateUrl: './expected-rate-dialog.html',
    styles: [
        ''
    ]
})
export class ExpectedRateDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ExpectedRateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ExpectedRateDialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
