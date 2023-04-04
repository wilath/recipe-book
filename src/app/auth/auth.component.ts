
import { Component, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthServcie } from "./auth.servcie";



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private aService: AuthServcie,
        private router:Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm){  
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        let auth$: Observable<AuthResponseData>;
        
        if(this.isLoginMode){
            auth$ = this.aService.logIn(email, password);
        } else { 
            auth$ = this.aService.signUp(email, password)  
        }

        auth$.subscribe(
        resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, 
        errorMsg =>{
            console.log(errorMsg);
            this.error = errorMsg;
            this.isLoading = false
        })

        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

}