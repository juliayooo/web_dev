addEventListener("DOMContentLoaded", () => {

    const paperop1 = document.getElementById("papericon");
    const paperop2 = document.getElementById("paper2icon");
    const reset = document.getElementById("reset");
    const canvas = document.getElementById("canvas");
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
        paper.src = "paper.jpg";
        currPaper = "paper.jpg";
    });
    paperop2.addEventListener("click", () => {
        paper.src = "paper2.jpg";
        currPaper = "paper2.jpg";

    });

    reset.addEventListener("click", () => {
        canvas.innerHTML = "<img src='" + currPaper + "' class='paper' id='paper'>";
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
