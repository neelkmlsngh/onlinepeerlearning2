export const config: any = {

  

  language: [
    "JAVASCRIPT",
    "HTML/CSS"
  ],

  con: {
    title:"Add Snippet",
    button:"Add Snippet"
    },



/*  connect: {
       "url": "https://192.168.252.152:",
       "port": "8080"
   }*/

  connect:
  {
    apiURL : "https://192.168.252.57:8080",
    vmURL : "https://192.168.252.57:3030",
    peerjsURL : "https://192.168.252.57:8081"
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
  },

  footer: {
    "title": "About Us",
    "about": "We're immensely proud of the unique products that our developers have created to help coders practice coding and easily pushing on git on a single click.",
    "Copyright": "© 2017 Copyright:",
    "website": "codeEditor.com",
    "navigation": "Navigation",
    "home": "Home",
    "services": "Services",
    "link": "Link",
    "contact": "Contact",
    "features": "Features",
    "editor": "Code Editor",
    "terminal": "Terminal",
    "forums": "Forums",
    "connections": "Connections",
    "developers": "Developers",
    "environment": "Environment",
    "faq": "FAQ",
    "signup": "SignUp",
    "schools": "For Schools"
  },

  repoSidebar: {
    "repos": "Repos",
    "entercode":"enter code here"
  },

  navbar: {
    "logo": "Logo",
    "profile": "Profile",
    "forums": "Forums",
    "logout": "Logout"
  },
  
};
