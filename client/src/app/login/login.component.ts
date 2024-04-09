import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../models/user.module';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const user: UserModule = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    }
    console.log("user", user);
    this._userService.login(user).subscribe({
      next: (res) => {
        console.log(res);
        const token = res.token;
        localStorage.setItem('token', token);
        this.router.navigate(['addPosition'])
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
