import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'tasks',
    templateUrl    : './post-task.component.html',
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
