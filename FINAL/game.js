import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCpFPBlNwtARb-H9FG1rv6WABFCb1hLg0",
    authDomain: "portfolio-site-196ba.firebaseapp.com",
    projectId: "portfolio-site-196ba",
    storageBucket: "portfolio-site-196ba.firebasestorage.app",
    messagingSenderId: "848012280700",
    appId: "1:848012280700:web:62b4384cab6f33b8af1af9",
    measurementId: "G-SJKBNX9JFP"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

addEventListener("DOMContentLoaded", () => {

    const paperop1 = document.getElementById("papericon");
    const paperop2 = document.getElementById("paper2icon");
    const reset = document.getElementById("reset");
    const canvas = document.getElementById("canvas");
    const paper = document.getElementById("paper");
    const mouthSticker = document.getElementById("mouthsticker");
    const fireSticker = document.getElementById("firesticker");
    const girlSticker = document.getElementById("girlsticker");
    const monsterSticker = document.getElementById("monstersticker");
    const blushSticker = document.getElementById("blushsticker");
    const stickerOptions = document.getElementById("stickeroptions");
    let currSticker = document.getElementById("mouthsticker");
    let currPaper = "paper.jpg";

    // select paper option
    paperop1.addEventListener("click", () => {
        currPaper = 'paper.jpg';
        canvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
        paper = document.getElementById("paper");


    });
    paperop2.addEventListener("click", () => {
        currPaper = 'paper2.jpg';
        canvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
        paper = document.getElementById("paper");


    });

    reset.addEventListener("click", () => {

        canvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
        paper = document.getElementById("paper");

    });
    // select sticker option
    stickerOptions.addEventListener("click", (e) => {

        if(e.target.id === "mouthsticker"){
            currSticker = mouthSticker;
        }
        else if(e.target.id === "firesticker"){
            currSticker = fireSticker;
        }
        else if(e.target.id === "girlsticker"){
            currSticker = girlSticker;
        }
        else if(e.target.id === "monstersticker"){
            currSticker = monsterSticker;
        }
        else if(e.target.id === "blushsticker"){
            currSticker = blushSticker;
        }
        console.log(currSticker);

    });

    // paste sticker
    canvas.addEventListener("click", (e) => {
        let sticker = document.createElement("img");
        sticker.src = currSticker.src;
        sticker.style.position = "absolute";
        sticker.style.top = e.clientY + "px";
        sticker.style.left = e.clientX + "px";
        sticker.style.width = "8vw";
        canvas.appendChild(sticker);
        console.log(e.clientX, e.clientY);

    });

});

function pasteSticker(stickerName){

}
