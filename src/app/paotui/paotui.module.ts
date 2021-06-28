import {NgModule} from '@angular/core';
import {ConvFormatPipe} from './date.pipe';

@NgModule({
    imports: [
        // dep modules
    ],
    declarations: [
        ConvFormatPipe
    ],
    exports: [
        ConvFormatPipe
    ]
})
export class PaotuiCommonModule {}
