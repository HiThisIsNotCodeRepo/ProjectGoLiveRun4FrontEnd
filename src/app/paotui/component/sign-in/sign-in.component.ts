import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {HttpClient} from '@angular/common/http';
import {PaoTuiAuthService} from '../../paotui-auth.service';
import {BASE_URL} from '../../app.const';
import {MatSnackBar} from '@angular/material/snack-bar';


interface LoginResponse {
    status: string;
    msg: string;
    token: string;
    userId: string;
    lastLogin: string;
    email: string;
    avatarUrl: string;
}

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _patotuiAuthService: PaoTuiAuthService,
        private _snackBar: MatSnackBar
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            name: ['user1', Validators.required],
            password: ['user1', Validators.required],
            rememberMe: ['']
        });
        console.log(`sign-in init authservice data: ${this._patotuiAuthService.myId} ${this._patotuiAuthService.myToken}`);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        // this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;
        console.log('login');
        // Sign in
        this._httpClient.post<LoginResponse>(`${BASE_URL}/auth?option=login`, {
            name: this.signInForm.get('name').value,
            password: this.signInForm.get('password').value
        }).subscribe((data) => {
            console.log(data);
            if (data.status === 'error') {
                this.openSnackBar('User name or password incorrect');
            } else {
                this._patotuiAuthService.myToken = data.token;
                this._patotuiAuthService.myId = data.userId;
                this._patotuiAuthService.email = data.email;
                this._patotuiAuthService.lastLogin = data.lastLogin;
                this._patotuiAuthService.avatarUrl = data.avatarUrl;
                this._router.navigate(['/search-task']);
            }

        });
    }

    search(): void {
        this._router.navigate(['/search-task']);
    }

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'close', {
            duration: 2000,
            panelClass: ['my-snack-bar']
        });
    }
}
