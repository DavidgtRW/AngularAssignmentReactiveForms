import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  signupForm: FormGroup;
  projecStatus = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectName = "Test";

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectname': new FormControl(null, Validators.required, this.forbiddenProjectNameControlAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Critical')
    });
  }

  forbiddenProjectNameControl(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectName === control.value) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenProjectNameControlAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectName === control.value) {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset({
      'status': 'Critical'
    });
  }
}
