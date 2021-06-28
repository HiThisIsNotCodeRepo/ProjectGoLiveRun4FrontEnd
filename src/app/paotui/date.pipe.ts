import {Pipe, PipeTransform} from '@angular/core';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name: 'convFormat',
    pure: false
})
export class ConvFormatPipe implements PipeTransform {
    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Transform
     *
     * @param value A string or an array of strings to find from source
     * @param key Key of the object property to look for
     * @param source Array of objects to find from
     */
    transform(value: string): any {
        const splitArr = value.split('T');
        const date = splitArr[0];
        const subSplitArr = splitArr[1].split('+');
        const time = subSplitArr[0];
        return date + ' ' + time;
    }
}
