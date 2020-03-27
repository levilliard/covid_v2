import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    firstFormGroup: FormGroup;
    
    constructor(private _formBuilder: FormBuilder, private router: Router) {}
    

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        let username: string = this.firstFormGroup.value["username"]
        let password: string = this.firstFormGroup.value["password"]
        
        if(username == "admin" && password == "Covid19"){
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);
        }else{
            alert("Hey ! Informations incorrestes !");
            this.router.navigate(['/login']);
        }
 
    }
}
