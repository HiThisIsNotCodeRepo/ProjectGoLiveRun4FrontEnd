import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from 'app/paotui/component/user/user.component';
import { SharedModule } from 'app/shared/shared.module';
import {PaotuiCommonModule} from '../../paotui.module';
import {ImageUploadModule} from 'angular2-image-upload';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        PaotuiCommonModule,
        ImageUploadModule
    ],
    exports     : [
        UserComponent
    ]
})
export class UserModule
{
}
