export const config: any = {

  language: [
    "javascript",
    "html",
    "css"
  ],
  con: {
    title: "Add Snippet",
    button: "Add Snippet"
  },
  connect:
  {
    apiURL : "https://192.168.252.204:8080",
    vmURL : "https://192.168.252.204:3030",
    CALLBACK_URL:"https://192.168.252.204:8080/api/login/auth/github",
    CLIENT_ID : 'eda558d85f4b8157078f',
    CLIENT_SERVICE : '2456afab849c7fd43d4977de7f1187b8d5e74329'
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

  forumConnect: {
    "APIURL": 'api/forums/',
    "SEARCHAPIURL": 'api/forums/term/'
  },
  peerserver: {
    "host": "192.168.252.204",
    "port": "8081",
    "path": "/peerjs"

  }
}
