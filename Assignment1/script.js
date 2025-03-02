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
candle.position.set(6, 0, 0)
candle.castShadow = true
candle.openEnded = false

//candle2
const candleGeometry2 = new THREE.CylinderGeometry(0.7, 0.5, 3,)
const candleMaterial2 = new THREE.MeshLambertMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
    
})
const candle2 = new THREE.Mesh(candleGeometry2, candleMaterial2)
candle2.position.set(6, 0, -1.5)
candle2.castShadow = true
candle2.openEnded = false

//wick
const wickGeometry = new THREE.CapsuleGeometry(0.09, 0.25, 4)
const wickMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('grey'),
})
const wick = new THREE.Mesh(wickGeometry, wickMaterial)
wick.position.set(6, 1.5, 0)
wick.castShadow = true
scene.add(wick)

//wick2
const wickGeometry2 = new THREE.CapsuleGeometry(0.09, 0.5, 4)
const wickMaterial2 = new THREE.MeshLambertMaterial({
    color: new THREE.Color('grey'),
})
const wick2 = new THREE.Mesh(wickGeometry2, wickMaterial2)
wick2.position.set(6, 1.5, -1.5)
wick2.castShadow = true


//Lantern
const lanternGeometry = new THREE.BoxGeometry()
const lanternMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity:200
})
const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial)
scene.add (lantern)

//table
const tableGeometry = new THREE.BoxGeometry(4, 0.3, 5)
const tableMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('#61443a')
})
const table = new THREE.Mesh(tableGeometry, tableMaterial)
table.position.set(6, -1.5, 0)
table.castShadow = true
scene.add(table)

//table leg
const tableLegGeometry = new THREE.BoxGeometry(0.3, 4, 0.3)
const tableLegMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color('#61443a')
})
const tableLeg = new THREE.Mesh(tableLegGeometry, tableLegMaterial)
tableLeg.position.set(4, -3.5, 2.34)
tableLeg.castShadow = true
scene.add(tableLeg)

//table leg 2
const tableLeg2 = new THREE.Mesh(tableLegGeometry, tableLegMaterial)
tableLeg2.position.set(7.8, -3.5, 2.34)
tableLeg2.castShadow = true
scene.add(tableLeg2)

//table leg 3
const tableLeg3 = new THREE.Mesh(tableLegGeometry, tableLegMaterial)
tableLeg3.position.set(7.8, -3.5, -2.34)
tableLeg3.castShadow = true
scene.add(tableLeg3)

//table leg 4
const tableLeg4 = new THREE.Mesh(tableLegGeometry, tableLegMaterial)
tableLeg4.position.set(4, -3.5, -2.34)
tableLeg4.castShadow = true
scene.add(tableLeg4)

/************
 *** FIRE ***
 ************/

// Fire particle setup System
const particleCount = 10;
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
fireParticles.position.set(6, 2, 0)
const fireParticles2 = new THREE.Points(particles, particleMaterial);
fireParticles2.position.set(6, 2, -1.5)

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

//candle group
const candleGroup = new THREE.Group()
candleGroup.add(candle)
candleGroup.add(wick)

scene.add(candleGroup)

//second candle group
const candleGroup2 = new THREE.Group();
candleGroup2.add(candle2);
candleGroup2.add(wick2);



/************
 ** Lights **
 ************/

const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    2.14
)
scene.add(directionalLight)
directionalLight.position.set(20, 0, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

const directionalLight2 = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.6
)

directionalLight2.position.set(20, 0, 20)
directionalLight2.target = cave
directionalLight2.castShadow = true
directionalLight2.shadow.mapSize.width = 1024
directionalLight2.shadow.mapSize.height = 1024

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

//second-change2
document.querySelector('#second-change2').onclick = function(){
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
var timeoutId = 0
function resetCandle() {
    clearTimeout(timeoutId);
    timeoutId = null;
    domObject.firstChange = false;
    domObject.secondChange = false;

    candle.scale.set(1, 1, 1);
    candle.position.set(6, 0, 0);
    wick.position.set(6, 1.5, 0);
    fireParticles.position.set(6, 2, 0);

    candle2.scale.set(1, 1, 1);
    candle2.position.set(6, 0, -1.5);
    wick2.position.set(6, 1.5, -1.5);
    fireParticles2.position.set(6, 2, -1.5);

    scene.remove(fireParticles); 
    scene.remove(fireParticles2);
}

/********************
 ** ANIMATION LOOP **
 ********************/
 //frame counter
 let frameCount = 0

const clock = new THREE.Clock()



const animation = () => 
{
     

    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
   

    //part-one
   if(domObject.part === 1)
    {
        camera.position.set(5.6, 0, 0)
        camera.lookAt(0,0,0)
    }

    //part-two
   if(domObject.part === 2)
    {
        camera.position.set(20, 0, 6)
        camera.lookAt(0,0,0)
    }

    //FIRST-CHANGE
    if (domObject.firstChange) {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                resetCandle();
                domObject.firstChange = false;
            }, 8000);
        }
        scene.add(fireParticles);
        scene.add(fireParticles2);
        if(fireParticles2.position.y != -1.5){
            scene.remove(fireParticles2)
        }
        
        if (frameCount % 4 === 0) {
            if (candle.scale.y > 0.005) {
                candle.position.y -= 0.0056;
                wick.position.y -= 0.0120;
                fireParticles.position.y -= 0.0120;

                candle2.position.y -= 0.0056;
                wick2.position.y -= 0.0120;
                fireParticles2.position.y -= 0.0120;
            } else {
                scene.remove(fireParticles);
                scene.remove(fireParticles2);
                wick.position.set(100, 100, 100);
                wick2.position.set(100, 100, 100);
            }
        }

        if (frameCount % 2 === 0) {
            if (candle.scale.y > 0.005) {
                candle.scale.y -= 0.004;
                candle2.scale.y -= 0.004;
            }
        }
    }
     
    //SECOND-CHANGE
    if (domObject.secondChange === true) {
        
    

        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                resetCandle();
                domObject.secondChange = false; // Ensure instant reset
            }, 5000);
        }

        scene.remove(fireParticles)
        scene.remove(fireParticles2)
        candle.position.y = candle.position.y;
        wick.position.y = wick.position.y;
    
        candle.scale.y = candle.scale.y;
    
        if (fireParticles.parent) {
            fireParticles.parent.remove(fireParticles);
            fireParticles.parent.remove(fireParticles2);
        }
    
        domObject.firstChange = false;
        
    }

    //SECOND-CHANGE2
    if (domObject.secondChange2 === true) {
        
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                resetCandle();
                domObject.secondChange = false; // Ensure instant reset
            }, 5000);
        }

        scene.remove(fireParticles)
        scene.remove(fireParticles2)
        candle.position.y = candle.position.y;
        wick.position.y = wick.position.y;
    
        
        candle.scale.y = candle.scale.y;
    
        
        if (fireParticles.parent) {
            fireParticles.parent.remove(fireParticles);
            fireParticles.parent.remove(fireParticles2);
        }
    
        domObject.firstChange = false;
        
    }

    //third-CHANGE
    if(domObject.thirdChange === true)
        {
            scene.add(candleGroup2);
           
        }

    //FOURTH-CHANGE
    if(domObject.fourthChange === true)
        {
            scene.add(directionalLight2)
            directionalLight2.position.z = Math.sin(elapsedTime / 2)* 20
            
        }

        if(directionalLight2.position.z >= 10){
            scene.remove(directionalLight2)
        }

        if(directionalLight2.position.z <= -10){
            scene.remove(directionalLight2)
        }

    //update directionalLightHelper
    directionalLightHelper.update()

    //Update OrbitControls
    controls.update

    //part 
    //update sun pos to copy light pos
    lantern.position.copy(directionalLight.position)

    //move light
    //directionalLight.position.z = Math.sin(elapsedTime - 0.5) * 3
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()

//Too much code
