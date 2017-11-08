import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';

import { ProfileService } from '../../services/profile.service';
import {config} from '../../config/profileConfig';
import swal from 'sweetalert2';
import { errorConfig } from '../../config/error.config';

@Component({
 selector: 'app-profile',
 templateUrl: './profile.component.html',
 styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
 personalInfo:FormGroup;
 currentUser:any;
 imgPath:string='';
 formData: FormData;
 options: RequestOptions;
 config=config;
 errorConfig= errorConfig;
 data:any={};
 gender:any;

constructor(@Inject(FormBuilder) private fb: FormBuilder,private profileService:ProfileService) {
  
   // initialising personal details to be displayed
   this.personalInfo = fb.group({
     firstName: [''],
     lastName: [''],
     email: [''],
     company: [''],
     website: [''],
     bio: [''],
     gender: ['']
   });

}
 // method to be called when the component loads
 ngOnInit() {
   this.currentUser= JSON.parse(localStorage.getItem('currentUser'))
   this.profileService.getDataFromDB(this.currentUser.userId)
   .subscribe((res)=>{
     this.data={
       userid:res.data.userId,
       public_repos:res.data.publicRepos,
       avatar_url:res.data.avatarUrl,
       name:this.currentUser.userName,
       firstName:res.data.firstName,
       lastName:res.data.lastName,
       email:res.data.email,
       company:res.data.company,
       website:res.data.website,
       bio:res.data.bio,
       gender:res.data.gender
     }
     this.imgPath=this.data.avatar_url;
     this.displayData(this.data);
   })
 }
 // method to display data when the component loads---method called in ngOnInit()
 displayData(data:any){
   this.personalInfo=this.fb.group({
     firstName:[data.firstName],
     lastName:[data.lastName],
     email:[data.email],
     company:[data.company],
     website:[data.website],
     bio:[data.bio],
     gender:[data.gender],
   })
 }
 // method to be called when file upload button is clicked
   fileChange(event) {
     this.formData= new FormData();
  let fileList: FileList = event.target.files;
  if(fileList.length > 0) {
   let file: File = fileList[0];
   this.formData.append('uploadFile', file, file.name);
   let headers = new Headers();
   headers.append('enctype', 'multipart/form-data');
   headers.append('Accept', 'application/json');
   this.options = new RequestOptions({ headers: headers });
  
  }
}

// method to be called when Upload button is clicked
uploadFile(){
 this.profileService.uploadFile(this.currentUser.userId,this.formData,this.options)
 .subscribe(
   res=>{
     this.imgPath=res.data.avatarUrl;
   },error=> {{errorConfig.UPLOAD}}
   )
}

updatePersonalInfo(personalInfo){
 let dataObj= personalInfo.value;
 this.profileService.updatePersonalInfo(this.data.userid,dataObj)
 .subscribe(res=>{
    if (res) {
         swal({
     timer: 2500,
     title: "Profile Updated",
     text:  "",
     type:  'success',
     showConfirmButton: false,
   })
       }

else {
         swal({
     timer: 2500,
     title: "Profile not updated",
     text:  "declined",
     type: 'error',
     showConfirmButton: false,
   })
       }
 })

}
}