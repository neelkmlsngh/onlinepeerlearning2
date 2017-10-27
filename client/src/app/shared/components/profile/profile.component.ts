import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo:FormGroup;
  currentUser:any;
  imgPath:string='';

  constructor(@Inject(FormBuilder) private fb: FormBuilder,private profileService:ProfileService) {
    // initialising user details to be displayed
    this.userInfo = fb.group({
      userid: ['', [Validators.required]],
      repos_url: ['', [Validators.required]],
     public_repos: ['', [Validators.required]],
      avatar_url: ['', [Validators.required]],
      name: ['', [Validators.required]]
    }); 

  }

  ngOnInit() {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)
    this.profileService.getDataFromDB(this.currentUser.userId)
    .subscribe((res)=>{
      console.log(JSON.stringify(res)+"service")
      let data={
        userid:res.userid,
        repos_url:res.repos_url,
        public_repos:res.public_repos,
        avatar_url:res.avatar_url,
        name:res.name
      }
      this.imgPath=data.avatar_url;
      this.displayData(data);
    })
  }

  displayData(data:any){
    console.log(data)
    this.userInfo=this.fb.group({
      userid:[data.userid],
      name:[data.name],
      repos_url:[data.repos_url],
      public_repos:[data.public_repos]
    })
  }

  upload(){
  	
  }
}
