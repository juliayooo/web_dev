
     
    getData();


async function getData() {
    try {
        // Fetch data from Google Sheets
        const x = "https://opensheet.elk.sh/1v-hTX1tX15527Q1AqSBpcpnqoMv7pg9mI87SCj7VYwU/1";
        let response = await fetch(x);
        let data = await response.json();
        console.log(data);
        // add each route to map from home folder 
        const page = document.getElementById("textcontainer");
        page.innerHTML = "<br>";
        data.forEach((line) => {
            
            if(line.text !== "" && line.text !== "/"){
                page.innerHTML += line.text;
                page.innerHTML += "<br>";
            }
            else if(line.text === "/"){
                page.innerHTML += "<br>";
            }
        }
    
    );
    page.innerHTML += "<br><br><br>";
    } catch (error) {
    console.error("Error:", error);
    }
   };
