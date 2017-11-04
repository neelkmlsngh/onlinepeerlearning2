import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/*import third party libraries*/
import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service';
import { config } from './../../config/config';

@Component({
  selector: 'app-repo-sidebar',
  templateUrl: './repo-sidebar.component.html',
  styleUrls: ['./repo-sidebar.component.css']
})

export class RepoSidebarComponent implements OnInit {

  /*declaring all the required variables*/
  githubUser: any;
  selectedValue: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = config.repoSidebar.entercode;

  @Output() content = new EventEmitter < any > ();

  constructor(private editorService: EditorService, private gitService: GitService) {}

  ngOnInit() {
    this.gitService.getRepos()
      .subscribe(repos => {
        this.githubUser = repos;
      })
  }

  /*calling method to search repositery*/
  reposearch() {
    this.gitService.getTree(this.selectedValue)
      .subscribe(data => this.data = data)
  }

  /*method used to show repositery name and file name*/
  showFile(reponame, filename) {
    this.gitService.openFolder(reponame, filename)
      .subscribe(
        data => {
          this.data = data
          this.url = this.url + filename + "/"
        }, err => {
          this.show(reponame, this.url + filename)
          this.url = "";
        })
  }

  //method used to show content of file present in repository
  show(reponame, filename) {
    this.gitService.getFile(reponame, filename)
      .subscribe(data => {
        this.fileData = data;
        this.text = this.fileData._body;
        this.content.emit(this.text);
      })
  }
}
