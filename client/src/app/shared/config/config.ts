export const config: any = {

  language: [
    "JAVASCRIPT",
    "HTML/CSS"
  ],



/*  connect: {
       "url": "https://192.168.252.152:",
       "port": "8080"
   }*/

  connect:
  {
    apiURL : "https://192.168.252.178:8080",
    vmURL : "https://192.168.252.178:3030",
    peerjsURL : "https://192.168.252.178:8081"
  },

  giturls: {
    HOSTURL: "https://api.github.com/repos/",
    SUBURL: "/git/refs/heads/master",
    COMMITFILEURL: "/git/commits/",
    TREECOMMITURL: "/git/trees",
    NEWCOMMITURL: "/git/commits",
    CONTENTURL: "/contents/",
    CREATEREPOS: "https://api.github.com/user/repos",
    HOSTURLUSERS: "https://api.github.com/users/"
  },

  editor: {
    JAVASCRIPTNAME: "Javascript File",
    REPONAME: "Your current repository is:",
    FILENAME: "enter your file name",
    COMMIT: "enter your commit message",
    UPDATE: "Do you want to update the file ",
    DELETE: "Do you want to delete the file",
    EXECUTEBTN: "Execute",
    CREATEBTN: "Create",
    UPDATEBTN: "Update",
    DELETEBTN: "Delete"
  }

  

  
  
};
