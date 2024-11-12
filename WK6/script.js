import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// intialize a renderer and make the background clear 
const renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize( window.innerWidth, window.innerHeight, false);

document.body.appendChild( renderer.domElement );

// Light so object is visible 
const light = new THREE.DirectionalLight(0xffffff, 1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 20, 20).normalize();
light2.position.set(-20, 0, 20).normalize();
scene.add(light);
scene.add(light2);


// Allowing user to use orbit control 
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, -50 );
// send the update to cam position 
controls.update();

// create loader and the model variable 
const loader = new GLTFLoader();
let model;

loader.load( 'fullscane.glb', function ( gltf ) {
console.log("loaded");
	
model = gltf.scene;

// Scale 
model.scale.set(50, 50, 50);  
model.position.set(0, 70, 50);
scene.add(model);
console.log("added");


}, undefined, function ( error ) {

	console.error( error );

} );

const slidersize = document.getElementById('size_slider');
slidersize.addEventListener('input', function() {
    let size = slidersize.value;
    model.scale.set(size, size, size);
    controls.update();
});
    // let size = slidersize.value;
    // model.scale.set(size, size, size);
    // camera.position.set( 0, 0, size );
    // controls.update();


function animate() {

	requestAnimationFrame( animate );
    
	// required if controls.enableDamping or controls.autoRotate are set to true
	
    if (model) {
    
    // continuous rotation
       model.rotation.y += 0.001;
    }



    controls.update();
	renderer.render( scene, camera );

}

animate();