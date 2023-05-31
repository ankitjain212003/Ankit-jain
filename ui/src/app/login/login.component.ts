import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  invalid: boolean = false
  ngOnInit() {}

  constructor(private router:Router){ }

  login() {
    if (this.username !="admin" || this.password !="admin") {
      this.invalid = true
      setTimeout(()=>{this.invalid = false},10000)
    } else {
      document.cookie = "login=true"
      this.router.navigate(['/'])
    }
  }
}
