import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../forms/custom-error-state-matcher';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {ScrollService} from '../../services/scroll/scroll.service';
import {CustomValidators} from '../../forms/custom-validators';
import {SignUpService} from '../../services/sign-up/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = new FormGroup({});
  emailFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);
  confirmEmailFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);
  chooseAPasswordFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPasswordFormControl: FormControl<string | null> = new FormControl('', [Validators.required, Validators.minLength(6)]);
  matcher: CustomErrorStateMatcher = new CustomErrorStateMatcher();

  chooseAPasswordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;
  private snackBarRef: MatSnackBarRef<TextOnlySnackBar> | null = null;
  processing: boolean = false;

  private subscriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public platform: Platform,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private signUp: SignUpService
  ) {
  }

  public ngOnInit(): void {
    ScrollService.toTop();

    this.formGroup.addControl('email', this.emailFormControl);
    this.formGroup.addControl('emailConfirm', this.confirmEmailFormControl);
    this.formGroup.addControl('password', this.chooseAPasswordFormControl);
    this.formGroup.addControl('passwordConfirm', this.confirmPasswordFormControl);
    this.formGroup.addValidators([
      CustomValidators.mustMatch('email', 'emailConfirm'),
      CustomValidators.mustMatch('password', 'passwordConfirm')
    ]);

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

  public toggleChooseAPasswordVisibility(): void {
    this.chooseAPasswordVisibility = !this.chooseAPasswordVisibility;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }

  public doSignUp(): void {
    ScrollService.toTop();

    if (!this.formValid()) //
      return;

    if (this.snackBarRef !== null) //
      this.snackBarRef.dismiss();

    this.processing = true;
    setTimeout(() => this.processing = false, 3000);
  }

  public formValid(): boolean {
    return this.formGroup.valid;
  }

}
