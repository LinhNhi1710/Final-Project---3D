/*
	Install Node.js.
	npm install --save three
	npm install --save-dev vite
	Run server local : npx vite : http://localhost:5173
*/


import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
	30,
    window.innerWidth / window.innerHeight,
    1,
    10000
	);
camera.position.z = 5;

// Must have light, without scene is black
const light = new THREE.AmbientLight(0xffffff, 9);
scene.add(light);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x1100);
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const fbxLoader = new FBXLoader();

// scene.background = textureLoader.load( 'img/bg.jpg' );

var room

const roomDiffuse = textureLoader.load( "/textures/diffuse.png");
const roomMetal = textureLoader.load( "/textures/metal.png");
const roomRough = textureLoader.load( "/textures/roughness.png");
const roomNormal = textureLoader.load( "/textures/normal.png");

fbxLoader.load(
    'models/room.FBX',
    (object) => {
    	room = object;
    	object.traverse( function ( child ) 
    	{
			if ( child.isMesh ) 
			{
				child.material.map = roomDiffuse;
		//		child.material.bumpMap = roomNormal;
		//		child.material.metal = roomMetal;
		//		child.material.roughness = roomRough;
			}
		});
		object.scale.set(0.01,0.01,0.01);
	    object.position.set( -1,  -0.7, -1 );
	    object.rotation.y = 120;
		scene.add( object );
	  
    },
)


function animate() {
//	if (tree) tree.rotation.y = Date.now()*.0003;
//	if (ngtuyet) ngtuyet.rotation.y = Date.now()*.0003;

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
