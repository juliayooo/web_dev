// import { initializeApp } from "firebase/app";
// import html2canvas from 'html2canvas'; 
// import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
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
  const storage = getStorage(app);

  addEventListener("DOMContentLoaded", () => {

    const paperop1 = document.getElementById("papericon");
    const paperop2 = document.getElementById("paper2icon");
    const reset = document.getElementById("reset");
    const mycanvas = document.getElementById("screenshotdiv");
    const saveLib = document.getElementById("saveLib");
    let paper = document.getElementById("paper");
    const mouthSticker = document.getElementById("mouthsticker");
    const fireSticker = document.getElementById("firesticker");
    const girlSticker = document.getElementById("girlsticker");
    const monsterSticker = document.getElementById("monstersticker");
    const blushSticker = document.getElementById("blushsticker");
    const stickerOptions = document.getElementById("stickeroptions");
    let currSticker = document.getElementById("mouthsticker");
    let currPaper = "assets/paper.jpg";

    // select paper option
    paperop1.addEventListener("click", () => {
        currPaper = 'assets/paper.jpg';
        mycanvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
        paper = document.getElementById("paper");


    });
    paperop2.addEventListener("click", () => {
        currPaper = 'assets/paper2.jpg';
        mycanvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
        paper = document.getElementById("paper");


    });

    // reset button 
    reset.addEventListener("click", () => {

        mycanvas.innerHTML = "<p>click a sticker to pick it up, and click to place on paper... </p>" + "<img src='" + currPaper + "' class='paper' id='paper'>";
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
    mycanvas.addEventListener("click", (e) => {
        let sticker = document.createElement("img");
        sticker.src = currSticker.src;
        const rect = mycanvas.getBoundingClientRect();
        const x = e.clientX - 15 + window.scrollX;
        const y = e.clientY - 15 + window.scrollY; ;
        // account for scroll offset, specifically on mobile screen 
        sticker.style.position = "absolute";
        sticker.style.top = y + "px";
        sticker.style.left = x + "px";
        sticker.style.width = "8vw";
        mycanvas.appendChild(sticker);
        console.log(e.clientX, e.clientY);

    });

    // save to library
    saveLib.addEventListener("click", () => {
        html2canvas(mycanvas).then(canvas => {
    
             // convert canvas 
        const imageData = canvas.toDataURL("image/png");

        // upload to firebase 
        const imageRef = ref(storage, `screenshots/screenshot-${Date.now()}.png`);
        uploadString(imageRef, imageData, 'data_url')
            .then(() => {
                // Fetch the URL of the uploaded image
                return getDownloadURL(imageRef);
            })
            .then(url => {
                console.log("Image uploaded and available at:", url);
            })
            .then(() => {
                window.location.href = "gallery.html";
            })
            .catch(error => {
                console.error("Error uploading image:", error);
            });


        });
    });

});

