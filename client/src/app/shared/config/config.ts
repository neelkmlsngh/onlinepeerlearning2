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
    apiURL : "https://192.168.252.207:8080",
    vmURL : "https://192.168.252.207:3030",
    CALLBACK_URL:"https://192.168.252.207:8080/api/login/auth/github",
    CLIENT_ID : 'ff1442095291468e2b88',
    CLIENT_SECRET : '008206b51cc54644f7cb921bf8623fe595c1b597'
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
    AUTHORIZATION: "Basic 450b330333db090ea1ff44a0c5ea2467524b652b"
  },

  forumConnect: {
    "APIURL": 'api/forums/',
    "SEARCHAPIURL": 'api/forums/term/'
  },
  peerserver: {
    "host": "192.168.252.152",
    "port": "8081",
    "path": "/peerjs"
  }
}
