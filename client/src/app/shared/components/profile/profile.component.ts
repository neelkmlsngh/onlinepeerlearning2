import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo:FormGroup;
  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    // initialising user details to be displayed
    this.userInfo = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      github: ['', [Validators.required]],
      username: ['', [Validators.required]]
    }); 
  }

  ngOnInit() {
  }

  upload(){
  	
  }
}
