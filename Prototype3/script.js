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
scene.background = new THREE.Color("black")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/************
 ** Meshes **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

//Objects
//Head
const torusGeometry = new THREE.TorusGeometry(3, 0.2)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(6, 1, 0)
torus.rotation.y = Math.PI * 0.5
torus.castShadow = true
scene.add(torus)

//mouth
const geometry = new THREE.TorusGeometry( 1, 0.2, 12, 48, Math.PI); 
const material = new THREE.MeshNormalMaterial( ); 
const torus1 = new THREE.Mesh( geometry, material );
torus1.position.set(6, 0, 0) 
torus1.castShadow = true
torus1.rotation.y = Math.PI * 0.5
torus1.rotation.x = Math.PI * 1
scene.add( torus1 );
//Eye 1
const circlegeometry = new THREE.CircleGeometry( 0.5 )
const circlematerial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}) 
const circle = new THREE.Mesh( circlegeometry, circlematerial ) 
circle.position.set(6, 1.8, 1.3)
circle.rotation.y = Math.PI * 0.5
circle.castShadow = true
scene.add( circle)

//Eye 2
const circlegeometry1 = new THREE.CircleGeometry( 0.5 )
const circlematerial1 = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}) 
const circle1 = new THREE.Mesh( circlegeometry1, circlematerial1 ) 
circle1.position.set(6, 1.8, -1.3)
circle1.rotation.y = Math.PI * 0.5
circle1.castShadow = true
scene.add( circle1)

//nose
const capsulegeometry3 = new THREE.CapsuleGeometry( 0.2, 0.2, 4, 8 ) 
const capsulematerial3 = new THREE.MeshNormalMaterial( )
const capsule3 = new THREE.Mesh( capsulegeometry3, capsulematerial3 )
capsule3.position.set(6, 0.6, )
capsule3.rotation.x = Math.PI * 0
capsule3.castShadow = true
scene.add( capsule3 )

//Eyebrow 1
const capsulegeometry6 = new THREE.CapsuleGeometry( 0.2, 0.9, 4, 8 ) 
const capsulematerial6 = new THREE.MeshNormalMaterial( )
const capsule6 = new THREE.Mesh( capsulegeometry6, capsulematerial6 )
capsule6.position.set(6, 2.4, 1)
capsule6.rotation.x = Math.PI * 0.3
capsule6.castShadow = true
scene.add( capsule6 )

//Eyebrow 2
const capsulegeometry7 = new THREE.CapsuleGeometry( 0.2, 0.9, 4, 8 ) 
const capsulematerial7 = new THREE.MeshNormalMaterial( )
const capsule7 = new THREE.Mesh( capsulegeometry7, capsulematerial7 )
capsule7.position.set(6, 2.4, -1)
capsule7.rotation.x = Math.PI * -0.3
capsule7.castShadow = true
scene.add( capsule7 )
/************
 ** Lights **
 ************/
//Ampient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
 //   new THREE.Color('white')
//)
//scene.add(ambientLigh

//directional light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024


//directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)


/********
 ** UI **
 ********/
//UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')
    
lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')



    

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()

const animation = () => 
{
    
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //animate objects
 
   
    //update directionalLightHelper
    //directionalLightHelper.update()
//Update OrbitControls
controls.update
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()


