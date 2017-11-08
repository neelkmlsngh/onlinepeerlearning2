export const config: any = {

 language: [
   "Javascript",
   "Html",
   "CSS"
 ],
 con: {
   title: "Add Snippet",
   DROP: "Select Language to Add Snippet",
   button: "Add Snippet",
   CKEDITOR:{
    "REMOVED_BUTTONS":"Link,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript,addFile,Image,Table,Styles,Format,Maximize,HorizontalRule,Unlink,Blockquote,Indent,Outdent,RemoveFormat,Spell",
    "REMOVED_PLUGINS":"list,basicstyles,wsc,scayt,about,specialchar,scayt,spellchecker,elementspath,resize"
           }
 },
  connect:
  {
    apiURL : "https://192.168.252.209:8080",
    vmURL : "https://192.168.252.209:3930",
    CALLBACK_URL:"https://192.168.252.209:8080/api/login/auth/github",
    CLIENT_ID : '0c5e4d981e5db1ee5bb4',
    CLIENT_SECRET : '50d37ae458e50eb456de66aea66573c80869ea0d'
  },

  giturls: {
    HOSTURL: "https://api.github.com/repos/",
    SUBURL: "/git/refs/heads/master",
    COMMITFILEURL: "/git/commits/",
    TREECOMMITURL: "/git/trees",
    NEWCOMMITURL: "/git/commits",
    CONTENTURL: "/contents/",
    CREATEREPOS: "https://api.github.com/user/repos",
    HOSTURLUSERS: "https://api.github.com/users/",
    AUTHORIZATION: "Basic YWFzdGhhd2FkaHdhMDFAZ21haWwuY29tOmM0NDBhNTgxZGYwOTQzYjY0ODcxZDZiM2FjZjE4ZTI2ZjE5YTFkMWM="
  },

  forumConnect: {
    "APIURL": 'api/forums/',
    "SEARCHAPIURL": 'api/forums/term/'
  },
  peerserver: {
    "host": "192.168.252.209",
    "port": "8081",
    "path": "/peerjs"
  }
}
