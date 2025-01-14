import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log("JS is working!");

// Canvas
const canvas = document.querySelector("#bg");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;
scene.add(camera);

// Textures
// - Texture Loader
const loader = new THREE.TextureLoader();

// - Load Textures
// - - Space
const spaceTexture = loader.load("textures/space2.jpeg");
// - - Dirt
const dirtTexture = loader.load("textures/dirt.webp");

// - Assign Textures
scene.background = spaceTexture;
const dirtMaterial = new THREE.MeshStandardMaterial({
  map: dirtTexture,
});

// Objects
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);

const orangeMaterial = new THREE.MeshStandardMaterial({
  color: 0xff7f50,
});
const cube = new THREE.Mesh(cubeGeometry, dirtMaterial);
const torus = new THREE.Mesh(torusGeometry, orangeMaterial);

scene.add(cube);
scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1000);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
pointLight.position.set(10, 5, 10);
scene.add(pointLight);
scene.add(ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Control the camera with the mouse
const controls = new OrbitControls(camera, renderer.domElement);

// Functions

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
