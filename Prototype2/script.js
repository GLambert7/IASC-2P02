import * as THREE from 'three';
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
/***********
 ** SETUP **
 ***********/
//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio:window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector(".webgl")

// Sceene
const scene = new THREE.Scene()
scene.background = new THREE.Color("gray")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** Meshes **
 ************/
// TorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.1, 12, 12, 8, 7)
const torusKnotMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('green')})
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

scene.add(torusKnot)

//Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)



/********
 ** UI **
 ********/
//UI
const ui = new dat.GUI()

//UI object
const uiObject = {
    speed:1,
    distance: 1,
    rotationX: 5,
    rotationY: 5,
   
}

//testSphere UI
const torusKnotFolder = ui.addFolder( 'Torus Knot' );

torusKnotFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('speed')

    torusKnotFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('distance')

    torusKnotFolder
    .add(uiObject, 'rotationX')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Rotation X')

    torusKnotFolder
    .add(uiObject, 'rotationY')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Rotation Y')

   


    
    //Plane UI
const planeFolder = ui.addFolder( 'Plane' );

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()

const animation = () => 
{
    
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //Animate Sphere
    torusKnot.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    torusKnot.rotation.x = (elapsedTime * uiObject.rotationX) 
    torusKnot.rotation.y = (elapsedTime * uiObject.rotationY)
    
   
    //Update OrbitControls
    controls.update
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()


