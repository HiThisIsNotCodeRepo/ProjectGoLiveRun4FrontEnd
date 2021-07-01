import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BASE_URL} from '../../app.const';
import {HttpClient} from '@angular/common/http';

interface RegisterResponse {
    status: string;
    msg: string;
}

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _httpClient: HttpClient,
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
        this.signUpForm = this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        // this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;
        console.log(`sign-up name:${this.signUpForm.get('name').value}, sign-up email:${this.signUpForm.get('email').value}
        sign-up password:${this.signUpForm.get('password').value}`);
        // register
        this._httpClient.post<RegisterResponse>(`${BASE_URL}/users/user`, {
            name: this.signUpForm.get('name').value,
            email: this.signUpForm.get('email').value,
            password: this.signUpForm.get('password').value
        }).subscribe((data) => {
            console.log(data);
            if (data.status === 'error') {
                this.openSnackBar('User Register Failed');
            } else {
                this.openSnackBar('User Register Success');
                this._router.navigate(['/sign-in']);
            }

        });
    }

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'close', {
            duration: 2000,
            panelClass: ['my-snack-bar']
        });
    }
}
