import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseFindByKeyPipeModule} from '@fuse/pipes/find-by-key';
import {SharedModule} from 'app/shared/shared.module';
import {academyRoutes} from 'app/paotui/component/search-task/browse-task.routing';
import {
    DialogComponent,
    TaskListComponent
} from 'app/paotui/component/search-task/list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FuseCardModule} from '@fuse/components/card';
import {MatDialogModule} from '@angular/material/dialog';
import {PaotuiCommonModule} from '../../paotui.module';

@NgModule({
    declarations: [
        TaskListComponent,
        DialogComponent,
    ],
    imports: [
        RouterModule.forChild(academyRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatTabsModule,
        // add on
        MatPaginatorModule,
        FuseCardModule,
        MatDialogModule,
        PaotuiCommonModule,
    ]
})
export class BrowseTaskModule {
}
