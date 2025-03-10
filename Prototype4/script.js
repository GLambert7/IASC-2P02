import * as THREE from 'three';
import { OrbitControls } from "OrbitControls";
import * as dat from "lil-gui";

/**********
** SETUP **
**********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

//resizing
window.addEventListener('resize', () => 
{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**********
** SCENE **
**********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#0A0A0A')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set (0, 12, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** Lights **
***********/
//directional light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
***********/

// Cube Geometry
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    //create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    //Create cube
    const cube = new THREE.Mesh(boxGeometry, material)

    //position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    //random cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    //add cube to scene
    scene.add(cube)
}

//drawCube(0, 'red')
//drawCube(1, 'green')
//drawCube(2, 'yellow')
//drawCube(3, 'blue')

/*******
** UI **
*******/
// Ui
const ui = new dat.GUI()

/*******************
** Text Analysis **
*******************/
//SourceText
const sourceText = "In a mushroom village lived a wizard hedgehog named Carl. Carl lived peacfully in his village, he loved selling potions, and helping people out with any magical problems. One fatefull day the village was under attack by a gnome army who brought their dragon! Being a peacfull mushroom civilization, they had no wariors to defend themselves and it looked as if the village was going to be destroyed. From within the ruins Carl emerged, having trained under a saint class mage Carl knew enough defensive and offensive spells to save the village. After defeating the dragon Carl was regarded as a hero and the village prospered hapily ever after."

//variables
let parsedText, tokenizedText

//Parse and Tokenize SourceText
const tokenizeSourceText = () =>
{
    //strip periods and downcase source text
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    //tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    
}

//find seatchedTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) => 
{
    for(let i = 0; i < tokenizedText.length; i++)
    {
        //if tokenized text matches our search term
        if(tokenizedText[i] === term){
            //convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
            
            //call drawCuube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            drawCube(height, color)
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText('mushroom', 'red')
findSearchTermInTokenizedText('village', 'white')
findSearchTermInTokenizedText("dragon", "black")
findSearchTermInTokenizedText("carl", "green")


/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

const animation = () => {
    // return elapsed time
    const elapsedTime = clock.getElapsedTime()



    // Update Orbit Controls
    controls.update()

    // renderer
    renderer.render(scene,camera)

    // request next frame
    window.requestAnimationFrame(animation)
}

animation()