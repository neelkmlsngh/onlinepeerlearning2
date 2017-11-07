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
    apiURL : "https://192.168.252.158:8080",
    vmURL : "https://192.168.252.158:3030",
    CALLBACK_URL:"https://192.168.252.158:8080/api/login/auth/github",
    CLIENT_ID : 'f230cfd88e5af5364aec',
    CLIENT_SECRET : '1f4a8fabe84ab13fda5144d959b40faca03e43d6'

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
    "host": "192.168.252.158",
    "port": "8081",
    "path": "/peerjs"

  }
}

