// import * as THREE from "three";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

const nose = document.getElementById('g3');
const rcbox = document.getElementById('g6');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.5, 1000);

// intialize a renderer and make the background clear 
const renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize( window.innerWidth * 0.4, window.innerHeight * 0.5, false);

nose.appendChild( renderer.domElement );

const rcscene = new THREE.Scene();
const rccamera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// intialize a renderer and make the background clear 
const rcrenderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
rcrenderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent

if(window.innerWidth < 800){
    rcrenderer.setSize( window.innerWidth * 0.3, window.innerHeight * 0.5, false);

}
else{
    rcrenderer.setSize( window.innerWidth * 0.5, window.innerHeight * 0.7, false);

}

rcbox.appendChild( rcrenderer.domElement );



const light = new THREE.DirectionalLight(0xffffff, 1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
const light4 = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(20, 20, 20).normalize();
light2.position.set(-20, 0, 20).normalize();
light3.position.set(20, 20, 20).normalize();
light4.position.set(-20, 0, 20).normalize();
scene.add(light);
scene.add(light2);
rcscene.add(light3);
rcscene.add(light4);


    // raycaster and mouse for hover effect
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // hover state for hover effect
    let isHovered = false;
    let mousex = 0;
    let mousey = 0;


// Allowing user to use orbit control 
const controls = new OrbitControls( camera, renderer.domElement );
const rccontrols = new OrbitControls( rccamera, renderer.domElement );

camera.position.set( 0, 0, 5 );
rccamera.position.set( 0, 0, 5 );

// send the update to cam position 
controls.update();
rccontrols.update();


// create loader and the model variable 
const loader = new GLTFLoader();
const loader2 = new GLTFLoader();

// create models 
let model;
let rc;

// load the nose model 
loader.load( 'assets/noserev2.glb', function ( gltf ) {
console.log("loaded");

model = gltf.scene;

// Scale 
model.scale.set(9, 9, 9);  
model.position.set(0, 0, 0);
model.rotation.y= -1.6;
model.rotation.z= 0;
scene.add(model);
console.log("added");


}, undefined, function ( error ) {

	console.error( error );

} );
loader2.load( 'assets/revisedrc.glb', function ( gltf ) {
    console.log("loaded");
        
    rc = gltf.scene;

    if(window.innerWidth < 1200){
        rc.scale.set(10, 10, 10); 
        rc.position.set(-0.4, 0.6, 2.9);
        console.log("mobile");
    }
    else{
        // Scale 
        rc.scale.set(15, 15, 15); 
        rc.position.set(-0.4, 0.2, 2.9);
 
    }
    rc.rotation.y= -45;
    rc.rotation.x= 0.2;
    rc.rotation.z= 0.3;



    rcscene.add(rc);
    console.log("added");

    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );

    // MOUSE CLICK FOR RIGHT CHEEK 
    let rotate = false;
         
         document.addEventListener('click', (event) => {

            const rect = rcrenderer.domElement.getBoundingClientRect(); // Get the canvas position and size
           
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, rccamera);
            const intersects = raycaster.intersectObject(rc, true);
          
            if (intersects.length > 0) {
                rotate = true;
                console.log('RC model clicked!');
    
            }
    
        });
    

        const project_container = document.querySelector('.project_container');
        const RCproj = document.querySelector('.RCproj');
        
    // MOUSE MOVE FOR NOSE 
    document.addEventListener('mousemove', (event) => {

      
        const rect = rcrenderer.domElement.getBoundingClientRect(); // Get the canvas position and size
        // get mouse position in regards to canvas size 
        mousex = ((event.clientX - rect.left) / rect.width );
        mousey = ((event.clientY - rect.top) / rect.height);
 

    });
     // MOUSE LEAVE FOR RC
     project_container.addEventListener('mouseleave', (event) => {
        rotate = false;
        project_container.style.display = "none";
        RCproj.style.display = "none";
        rcbox.style.transform= "translateX(0vw)";
            rc.rotation.y= -45;
            rccamera.position.set( 0, 0, 5 );
            console.log("mouseleave");

    });
    
    animate();

    function animate() {
        requestAnimationFrame(animate);


        if(model){
           

            //rotation limits
            const maxzRotation = THREE.MathUtils.degToRad(-90); 
            const minzRotation = THREE.MathUtils.degToRad(0); 
            const maxxRotation = THREE.MathUtils.degToRad(180); 
            const minxRotation = THREE.MathUtils.degToRad(-630); 
        
            // Map normalized mousey (0-1) to rotation range
            const mappedzRotation = THREE.MathUtils.lerp(minzRotation,maxzRotation, mousey);
            const mappedxRotation = THREE.MathUtils.lerp(minxRotation,maxxRotation, mousex);

            model.rotation.z = THREE.MathUtils.lerp(model.rotation.z, mappedzRotation, 0.1);
            model.rotation.y = THREE.MathUtils.lerp(model.rotation.x, mappedxRotation, 0.1);
        }
    

   
   

    if(rc){
        if (rotate) {
            console.log('RC model rotating!');
            const Yrotation = -45 + THREE.MathUtils.degToRad(25); 
            rc.rotation.y = THREE.MathUtils.lerp(rc.rotation.y, Yrotation, 0.01);
            rccamera.position.set( -2, 0, 5 );
            project_container.style.display = "flex"; 
            rcbox.style.transform= "translateX(15vw)";
            RCproj.style.display = "flex";
        }
  
    }
   

     // Update controls
     controls.update();
     rccontrols.update();

     // Render scenes
     renderer.render(scene, camera);
     rcrenderer.render(rcscene, rccamera);
    }
    
