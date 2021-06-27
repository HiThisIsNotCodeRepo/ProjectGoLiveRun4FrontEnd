import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'academy',
    templateUrl    : './browse-task.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseTaskComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
