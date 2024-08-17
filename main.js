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

function flower(pos_x, pos_y, pos_z, theta, dtheta){
	const sphereGeometry = new THREE.SphereGeometry( 0.3, 32, 16 ); 
	const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xD0C350, wireframe: false } ); 
	const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
	sphere.position.x = pos_x
	sphere.position.z = pos_z
	scene.add( sphere );

	const petals = {
		r: 1.25,
		segments: 0.45,
		theta: 0,
		dTheta: 2 * Math.PI/100,
	}
	for(let i = 0; i < 10; i++){
		const petalGeometry = new THREE.RingGeometry( 0.1, 0.9, 32, 1, 0.3, Math.random() * 0.75 ); 
		const petalMaterial = new THREE.MeshBasicMaterial( { color: 0xFEFEFE, wireframe: true } ); 
		const petal = new THREE.Mesh( petalGeometry, petalMaterial );
		//petal.rotation.x += Math.cos(Math.PI) - 0.7
		scene.add( petal );
		petals.theta += petals.dTheta;
		petal.rotation.z = -petals.r *  Math.cos(petals.theta) * i ;
		petal.position.x = pos_x;
		petal.position.z = pos_z;
	}

	const stemGeometry = new THREE.CapsuleGeometry( 0.3, 6, 10, 10 );
	const stemMaterial = new THREE.MeshBasicMaterial( { color: 0x274F29, wireframe: false } );
	const stem = new THREE.Mesh( stemGeometry, stemMaterial );
	stem.position.y = -3
	stem.position.x = pos_x;
	stem.position.z = pos_z;
	scene.add( stem );

}
const flower1 = flower(0);
const flower2 = flower(2, 0, 0);
const flower3 = flower(-2, 0, 0);
const flower4 = flower(0, 0, 2);
const flower5 = flower(0, -2, 0);
const flower6 = flower(1, 1, 1);
const flower7 = flower(-1, 1, 1);
const flower8 = flower(0, 0, -2);
const flower9 = flower(-1, 0, -1);
const flower10 = flower(1, 0, -1);
const flower11 = flower(0, 0, -1);


camera.position.z = 12;
function animate() {

  	//stem.rotation.x += 0.01;

	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );