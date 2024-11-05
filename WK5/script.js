// Background is dependent on time of day local 

// Include Matter.js library
// On click, using matter, a sun or a moon will fall from cursor


document.addEventListener("DOMContentLoaded", function() {
    var daytime = "";
    setBackground();
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        
    
    setInterval(setBackground, 6000);



function setBackground(){
    var date_now = new Date();
    var hour = date_now.getHours();
    var min = date_now.getMinutes(); 
    
    var declaration = document.querySelector(".declaration");
    console.log(hour, min, date_now);

    if (hour >= 6 && hour < 16) {
        daytime = "day";
        declaration.textContent += " Daytime!";

    }
    else {
        daytime = "night";
        declaration.textContent += " Nightime!";

    }
    console.log("hi");

    if (daytime == "day") {
        document.body.style.backgroundColor = "lightblue";
    }
    else if (daytime == "night") {
        document.body.style.backgroundColor = "darkblue";
    }
};

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    fillStyle: 'transparent',
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false // <-- important
      }
});
var counter = 0;
document.addEventListener("click", function(event) {

if (daytime == "day") {
    // every other clicl add a fire
    if (counter % 2 == 1){
    var fire = Bodies.circle(event.clientX, event.clientY, 80, {
        render: {
            sprite: {
                texture: 'fireSmall.png',
                xScale: 0.2,
                yScale: 0.2
            }
        }
    });
    Composite.add(engine.world, [fire]);

    }
    else{

        // every other click, add a sun 
        var sun = Bodies.circle(event.clientX, event.clientY, 80, {
            render: {
                sprite: {
                    texture: 'sun.png',
                    xScale: 0.1,
                    yScale: 0.1
                }
            }
        });
        Composite.add(engine.world, [sun]);

    }
    counter++;
}
// if its night, 
else {

    if (counter % 2 == 1){
    // add cursed moon emoji every other click 
        var moon = Bodies.circle(event.clientX, event.clientY, 80, {
            render: {
                sprite: {
                    texture: 'moon.png',
                    xScale: 0.2,
                    yScale: 0.2
                }
            }
        });
        Composite.add(engine.world, [moon]);
    }
    else {
        var face = Bodies.circle(event.clientX, event.clientY, 80, {
            render: {
                sprite: {
                    texture: 'face.png',
                    xScale: 0.2,
                    yScale: 0.2
                }
            }
        });
        Composite.add(engine.world, [face]);
    }

}
counter ++;
});

// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(0, vh, vw, 1, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
});