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
<<<<<<< HEAD
    apiURL : "https://192.168.253.1:8080",
    vmURL : "https://192.168.253.1:3030",
    CALLBACK_URL:"https://192.168.253.1:8080/api/login/auth/github",
    CLIENT_ID : 'f9ea78d1f4ead499cd22',
    CLIENT_SECRET : '5a9f55cb5eaa65140a5949fb6595e0283c667c72'
=======
    apiURL : "https://192.168.252.204:8080",
    vmURL : "https://192.168.252.204:3030",
    CALLBACK_URL:"https://192.168.252.204:8080/api/login/auth/github",
    CLIENT_ID : 'eda558d85f4b8157078f',
    CLIENT_SECRET : '2456afab849c7fd43d4977de7f1187b8d5e74329'

>>>>>>> 98f40f61265aa4de07bec3078657ee066f09c2e7
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
<<<<<<< HEAD
    "host": "192.168.253.1",
=======
    "host": "192.168.252.158",
>>>>>>> 98f40f61265aa4de07bec3078657ee066f09c2e7
    "port": "8081",
    "path": "/peerjs"

  }
}

