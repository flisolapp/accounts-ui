import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ScrollService} from '../../services/scroll/scroll.service';
import {Platform} from '@angular/cdk/platform';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CustomErrorStateMatcher} from '../../forms/custom-error-state-matcher';
import {SignInService} from '../../services/sign-in/sign-in.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = new FormGroup({});
  emailFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(6)]);
  matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();

  passwordVisibility: boolean = false;
  private snackBarRef: MatSnackBarRef<TextOnlySnackBar> | null = null;
  processing: boolean = false;

  private subscriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public platform: Platform,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private signIn: SignInService
  ) {
  }

  public ngOnInit(): void {
    ScrollService.toTop();

    this.formGroup.addControl('email', this.emailFormControl);
    this.formGroup.addControl('password', this.passwordFormControl);

    this.setFocusOnEmailInputField();
  }

  public ngOnDestroy(): void {
    this.disposeSubscriptions();
  }

  private disposeSubscriptions(): void {
    this.subscriptions.forEach((item: number, index: number, array: any[]) => //
      array.shift().unsubscribe());
  }

  private setFocusOnEmailInputField(): void {
    setTimeout(() => document.getElementById('email')?.focus(), 200);
  }

  public togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  public doLogIn(): void {
    ScrollService.toTop();

    if (!this.formValid()) //
      return;

    if (this.snackBarRef !== null) //
      this.snackBarRef.dismiss();

    this.processing = true;
    setTimeout(() => this.processing = false, 3000);
  }

  public formValid(): boolean {
    return this.emailFormControl.valid && this.passwordFormControl.valid;
  }

}
