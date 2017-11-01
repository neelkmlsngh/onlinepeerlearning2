import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Headers, RequestOptions, Http } from '@angular/http';
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
  public formData: FormData;
  public options: RequestOptions;

  constructor(@Inject(FormBuilder) private fb: FormBuilder,private profileService:ProfileService, private http: Http) {
    // initialising user details to be displayed
    this.formData= new FormData();
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

  displayData(data:any){
    console.log(data)
    this.userInfo=this.fb.group({
      userid:[data.userid],
      name:[data.name],
      repos_url:[data.repos_url],
      public_repos:[data.public_repos]
    })
  }

    fileChange(event) {
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

uploadFile(){
  this.http.post('https://localhost:8080/api/profile/image/'+1234, this.formData, this.options)
           .subscribe(
               data => {
               // swal('File','File successfully uploaded','success')
               },
               error => console.log(error)
           )
}
}


  
