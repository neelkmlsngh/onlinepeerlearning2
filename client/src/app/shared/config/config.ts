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
    apiURL : "https://192.168.252.178:8080",
    vmURL : "https://192.168.252.178:3030",
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

  
  navbar: {
    "logo": "Logo",
    "profile": "Profile",
    "forums": "Forums",
    "logout": "Logout"
  },
  forumConnect: {
    "APIURL": 'api/forums/',
    "SEARCHAPIURL": 'api/forums/term/'
  },
  peerserver: {
    "host": "192.168.252.190",
    "port": "8081",
    "path": "/peerjs"

  }
};
