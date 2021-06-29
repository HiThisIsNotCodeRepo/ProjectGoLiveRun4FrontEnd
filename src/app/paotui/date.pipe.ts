import {Pipe, PipeTransform} from '@angular/core';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name: 'convFormat',
    pure: false
})
export class ConvFormatPipe implements PipeTransform {

    constructor() {
    }

    transform(value: string): any {
        if (value === null) {
            return '';
        }
        const splitArr = value.split('T');
        const date = splitArr[0];
        const subSplitArr = splitArr[1].split('+');
        const time = subSplitArr[0];
        return date + ' ' + time;
    }
}
