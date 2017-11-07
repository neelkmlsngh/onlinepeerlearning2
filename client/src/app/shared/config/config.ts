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
    apiURL : "https://192.168.253.4:8080",
    vmURL : "https://192.168.253.4:3030",
    CALLBACK_URL:"https://192.168.253.4:8080/api/login/auth/github",
    CLIENT_ID : '96cb5f2d1d9fdce76884',
    CLIENT_SECRET : '41aab272f81b7a881635739e1c0d27335b753d00'
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
    "host": "192.168.253.1",
    "port": "8081",
    "path": "/peerjs"

  }
}
