// import * as THREE from "three";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js';

const nose = document.getElementById('g3');
const rcbox = document.getElementById('g6');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);
// intialize a renderer and make the background clear 
const renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize( window.innerWidth * 0.2, window.innerHeight * 0.3, false);

nose.appendChild( renderer.domElement );

const rcscene = new THREE.Scene();
const rccamera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);
// intialize a renderer and make the background clear 
const rcrenderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
rcrenderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
rcrenderer.setSize( window.innerWidth * 0.4, window.innerHeight * 0.6, false);

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
// rcscene.add(light);
// rcscene.add(light2);


// Allowing user to use orbit control 
const controls = new OrbitControls( camera, renderer.domElement );
const rccontrols = new OrbitControls( rccamera, renderer.domElement );

camera.position.set( 0, 0, 6 );
rccamera.position.set( 0, 0, 5 );

// send the update to cam position 
controls.update();
rccontrols.update();


// create loader and the model variable 
const loader = new GLTFLoader();
const loader2 = new GLTFLoader();

let model;
let rc;

loader.load( 'assets/revisednose.glb', function ( gltf ) {
console.log("loaded");
	
model = gltf.scene;

// Scale 
model.scale.set(8, 8, 8);  
model.position.set(0.1, -0.3, 0.3);
model.rotation.x= 20.3;
model.rotation.y= -14.5;
scene.add(model);
console.log("added");


}, undefined, function ( error ) {

	console.error( error );

} );
loader2.load( 'assets/revisedrc.glb', function ( gltf ) {
    console.log("loaded");
        
    rc = gltf.scene;
    
    // Scale 
    rc.scale.set(20, 20, 20);  
    rc.position.set(-0.5, -0.3, 2.9);
    rc.rotation.y= -45;
    rc.rotation.x= 0.2;
    rc.rotation.z= 0.3;



    rcscene.add(rc);
    console.log("added");
    
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );

    function animate() {
        requestAnimationFrame(animate);
    
        // Continuous rotation for model
        if (model) {
            model.rotation.y += 0.00001;
        }
    
        // Continuous rotation for rc
        if (rc) {
            rc.rotation.y += 0.00001; // Optional rotation for `rc`
        }
    
        // Update controls
        controls.update();
        rccontrols.update();
    
        // Render scenes
        renderer.render(scene, camera);
        rcrenderer.render(rcscene, rccamera);
    }
    
    animate();
