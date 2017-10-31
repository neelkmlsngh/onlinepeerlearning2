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
  img;

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
    console.log(this.currentUser+"first")
    this.profileService.getDataFromDB(this.currentUser.userId)
    .subscribe((res)=>{
      console.log(JSON.stringify(res)+"service")
      let data={
        userid:res.userId,
        public_repos:res.publicRepos,
        avatar_url:res.avatarUrl,
        name:res.name
      }
      this.imgPath=data.avatar_url;
      console.log(this.imgPath+"img path")
      this.displayData(data);
    })
  }

  upload(){
    
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
}


  
