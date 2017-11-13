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
    TEXTAREA: "Enter your code Snippet here",
    ADDSNIPP: "Add Title for Snippet",
    CKEDITOR: {
      "REMOVED_BUTTONS": "Link,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript,addFile,Image,Table,Styles,Format,Maximize,HorizontalRule,Unlink,Blockquote,Indent,Outdent,RemoveFormat,Spell",
      "REMOVED_PLUGINS": "list,basicstyles,wsc,scayt,about,specialchar,scayt,spellchecker,elementspath,resize"
    }
  },
  connect: {
    apiURL: "https://localhost:8080",
    vmURL: "https://192.168.252.152:3030",
    CALLBACK_URL: "https://localhost:8080/api/login/auth/github",
    CLIENT_ID: 'd800be26e1dd031f7308',
    CLIENT_SECRET: '4f34a102e4b2d71b77246520afee60d692da9b5a'
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
    "APIURL": '/api/forums/',
    "SEARCHAPIURL": '/api/forums/term/',
    "LIKEURL": '/api/forums/like/',
    "DISLIKEURL": '/api/forums/dislike/',
  },
  peerserver: {
    "host": "192.168.252.152",
    "port": "8081",
    "path": "/peerjs"
  }
}
