// let data = 
// fetch("https://dog.ceo/api/breed/affenpinscher/images")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
    
//     .then((data) => {data.message.forEach((image) => {
//         let img = document.createElement("img");
//         img.src = image;
//         document.body.appendChild(img);
//     })});

async function getData(breed) {
    try {
    const x = "https://dog.ceo/api/${breed}/images";
    let response = await fetch(x);
    let data = await response.json();
    console.log(data);
    data.message.forEach((filepath) => {
        let img = document.createElement("img");
        img.src = filepath;
        document.body.appendChild(img);
    });
    } catch (error) {
    console.error("Error:", error);
    }
   };

var select = document.querySelector("#breeds");

select.addEventListener("change", function(e){
    let breed = e.target.value;
    getData(breed);
});


    
