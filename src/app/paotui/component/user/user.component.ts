import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {BooleanInput} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';
import {UserService} from 'app/core/user/user.service';
import {PaoTuiAuthService} from '../../paotui-auth.service';
import {BASE_URL} from '../../app.const';
import {HttpClient} from '@angular/common/http';

interface AvatarResponse {
    status: string;
    msg: string;
    avatarUrl: string;
}

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    public id: string;
    public email: string;
    public lastLogin: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _patotuiAuthService: PaoTuiAuthService,
        private cd: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.id = this._patotuiAuthService.myId;
        this.email = this._patotuiAuthService.email;
        this.lastLogin = this._patotuiAuthService.lastLogin;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    /**
     * Sign out
     */
    signOut(): void {
        this._patotuiAuthService.clearAll();
        this._router.navigate(['/sign-in']);
    }

    upload(file: FileList): void {
        const formData: FormData = new FormData();
        formData.append('avatar', file.item(0), file.item(0).name);
        this._httpClient.post<AvatarResponse>(`${BASE_URL}/avatar?userID=${this._patotuiAuthService.myId}`, formData).subscribe((data) => {
            console.log(data);
            if (data.status === 'success') {
                this._patotuiAuthService.avatarUrl = data.avatarUrl;
                this.cd.markForCheck();
            }
        });
        console.log(file.item(0));
    }
}
