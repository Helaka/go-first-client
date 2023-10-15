import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ToastrService } from "ngx-toastr";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  errorMessage = "";
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error("Please enter valid email/password");
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        if (this.authService.isClient()) {
          this.toastr.success("Success");
          this.router.navigate(["/availability"]);
        } else {
          this.toastr.error("Email or Password is incorrect");
          this.router.navigate(["/login"]);
        }
      },
      (error) => {
        this.toastr.error(error);
        console.log(error);
        this.errorMessage = error;
        this.loginForm.reset();
      }
    );
  }
}
