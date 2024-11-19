addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    console.log("hi");
    // set right style if not already
    if (!title.style.right) {
        title.style.right = "0px";
        title.style.left = "auto";
    }
    // get window width
    const width = window.innerWidth;
    console.log("width: " + width);
    setInterval(move, 25);

    function move(){
        
        const currentRight = parseInt(title.style.right);
        const currentLeft = parseInt(title.style.left);
        title.style.right = (currentRight - 10) + "px";
        console.log("pos: " + currentRight);

        if(currentRight < -900){
            console.log("pos: " + currentRight);
            title.style.right = width +100 + "px";
        }

        // title.style.right = (parseInt(title.style.right) - 10) + 'px';
        
    }
        
        
    });
