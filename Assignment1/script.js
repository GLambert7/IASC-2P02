import * as THREE from 'three';
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
/***********
 ** SETUP **
 ***********/
//Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight ,
    aspectRatio:window.innerWidth *0.4/ window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector(".webgl")

// Sceene
const scene = new THREE.Scene()
//scene.background = new THREE.Color("black")

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
    antialias: true,
    alpha: true
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
    color: new THREE.Color('grey'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)


//candle
const candleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3,)
const candleMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
    
})
const candle = new THREE.Mesh(candleGeometry, candleMaterial)
candle.position.set(6, 0, 1)
candle.castShadow = true
candle.openEnded = false
scene.add(candle)



//sun
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity:200
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add (sun)



/************
 *** FIRE ***
 ************/

// Fire particle setup System
const particleCount = 40;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);
const lifetimes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = Math.random() * 0.05 + 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

    lifetimes[i] = Math.random();
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
particles.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

const textureLoader = new THREE.TextureLoader();
const fireTexture = textureLoader.load('./fire.png');

const particleMaterial = new THREE.PointsMaterial({
    map: fireTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    size: 1,
    depthWrite: false,
    opacity: 1
});

const fireParticles = new THREE.Points(particles, particleMaterial);
scene.add(fireParticles);
fireParticles.position.set(6, 2.4, 1)

//animate the fire particles so its not just a png pnging
function animate() {
    requestAnimationFrame(animate);

const positions = particles.attributes.position.array;
const velocities = particles.attributes.velocity.array;
 const lifetimes = particles.attributes.lifetime.array;

    for (let i = 2; i < particleCount; i++) {
    positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        lifetimes[i] -= 0.01;
        if (lifetimes[i] <= 0) {
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

            lifetimes[i] = Math.random();
        }
    }

    particles.attributes.position.needsUpdate = true;
    particles.attributes.lifetime.needsUpdate = true;

 
}

animate();




/************
 ** Lights **
 ************/

const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    3.14
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

const areaLight = new THREE.AmbientLight(
    new THREE.Color('white'),
    0.5
)
scene.add(areaLight)

//directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/**********************
 ** DOM INTERACTIONS **
 **********************/
const domObject = {
    part: 1,
    firstChange:false,
    secondChange:false,
    thirdChange:false,
    fourthChange:false,
}
//part 1
document.querySelector('#part-one').onclick = function(){
    domObject.part = 1
}

//part 2
document.querySelector('#part-two').onclick = function(){
    domObject.part = 2
}

//first-change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

//second-change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}

//third-change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

//fourth-change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}


/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()

const animation = () => 
{
    
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
   

    //part-one
   // if(domObject.part === 1)
    {
       // camera.position.set(6, 0, 0)
        camera.lookAt(0,0,0)
    }

    //part-two
   //if(domObject.part === 2)
    {
        //camera.position.set(25, 1, 0)
        camera.lookAt(0,0,0)
    }

    //FIRST-CHANGE
    if(domObject.firstChange === true)
    {
        face.rotation.x = elapsedTime
    }
    
    //SECOND-CHANGE
    if(domObject.secondChange === true)
    {
        face.position.y = Math.sin(elapsedTime)
    }
    //THIRD-CHANGE
    if(domObject.thirdChange === true)
        {
            face.position.z = Math.sin(elapsedTime)
        }
    //FOURTH-CHANGE
    if(domObject.fourthChange === true)
        {
            face.rotation.z = elapsedTime
        }
    //update directionalLightHelper
    directionalLightHelper.update()

    //Update OrbitControls
    controls.update

    //part 
    //update sun pos to copy light pos
    sun.position.copy(directionalLight.position)

    //move light
    //directionalLight.position.z = Math.sin(elapsedTime - 0.5) * 3
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()


