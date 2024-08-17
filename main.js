import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

new OrbitControls( camera, renderer.domElement );

const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );

const sphereGeometry = new THREE.SphereGeometry( 0.3, 32, 16 ); 
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xD0C350, wireframe: false } ); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
scene.add( sphere );

const petals = {
	r: 1.25,
	segments: 0.4,
	theta: 0,
	dTheta: 2 * Math.PI/100,
}
for(let i = 0; i < 10; i++){
	const petalGeometry = new THREE.CircleGeometry( petals.r, 100, 3, petals.segments ); 
	const petalMaterial = new THREE.MeshBasicMaterial( { color: 0xFEFEFE, wireframe: true } ); 
	const petal = new THREE.Mesh( petalGeometry, petalMaterial );
	//petal.rotation.x += Math.cos(Math.PI) - 0.7
	scene.add( petal );

	petals.theta += petals.dTheta;
	petal.rotation.z = -petals.r *  Math.cos(petals.theta) * i ;
}



const stemGeometry = new THREE.CapsuleGeometry( 0.3, 6, 10, 10 );
const stemMaterial = new THREE.MeshBasicMaterial( { color: 0x274F29, wireframe: false } );
const stem = new THREE.Mesh( stemGeometry, stemMaterial );
stem.position.y = -3
scene.add( stem );



camera.position.z = 12;

function animate() {

  	//stem.rotation.x += 0.01;

	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );