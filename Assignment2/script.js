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

const drawCube = (height, params) =>
{
    //create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    })

    //Create cube
    const cube = new THREE.Mesh(boxGeometry, material)

    //position cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height - 10

    //scale cube

    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    //random cube rotation
    if(params.randomized){
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    }
    //add cube to group
    params.group.add(cube)
    
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

let preset = {}

//Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
    sourceText: "the quick brown fox jumped over the lazy dog",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'fox',
        color: '#aa00ff',
        group: group1,
        diameter: 10,
        scale: 1,
        ncubes: 100,
        randomized: true, 
        
    },
    term2: {
        term: 'dog',
        color: '#00ffaa',
        diameter: 10,
        group: group2,
        scale: 1,
        ncubes: 100,
        randomized: true, 
    },
    term3: {
        term: '',
        color: '',
        diameter: 10,
        group: group3,
        scale: 1,
        ncubes: 100,
        randomized: true, 
    },

    saveTerms() {
        saveTerms()
    },
    rotateCamera:false
}

//UI Functions
const saveSourceText = () =>
{
    //UI
    preset = ui.save()
    textFoldder.hide()
    termsFolder.show()
    visualizeFolder.show()
    
    //Text analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
}
const saveTerms = () => 
{
    //UI
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()

    //testing
    //console.log(uiObj.term1)
    //console.log(uiObj.color1)
    //console.log(uiObj.term2)
    //console.log(uiObj.color2)
    //console.log(uiObj.term3)
    //console.log(uiObj.color3)

    //text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}

//Text Folder
const textFoldder = ui.addFolder("Source Text")

textFoldder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFoldder
    .add(uiObj, 'saveSourceText')
    .name("Save")

//Terms, Camera and Visualize fodlers
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

    termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

    termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name('Turntable')

//Terms and Visualize folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()


/*******************
** Text Analysis **
*******************/


//variables
let parsedText, tokenizedText

//Parse and Tokenize SourceText
const tokenizeSourceText = (sourceText) =>
{
    //strip periods and downcase source text
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    //tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    
}

//find seatchedTerm in tokenizedText
const findSearchTermInTokenizedText = (perams) => 
{
    for(let i = 0; i < tokenizedText.length; i++)
    {
        //if tokenized text matches our search term
        if(tokenizedText[i] === perams.term){
            //convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
            
            //call drawCuube function 100 times using converted height value
            for(let a = 0; a < perams.ncubes; a++)
            drawCube(height, perams)
        }
    }
}


//findSearchTermInTokenizedText('mushroom', 'red')
//findSearchTermInTokenizedText('village', 'white')
//findSearchTermInTokenizedText("dragon", "black")
//findSearchTermInTokenizedText("carl", "green")


/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

const animation = () => {
    // return elapsed time
    const elapsedTime = clock.getElapsedTime()



    // Update Orbit Controls
    controls.update()

    //rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 12
        camera.lookAt(0, 0, 0)
        
    }

    // renderer
    renderer.render(scene,camera)

    // request next frame
    window.requestAnimationFrame(animation)
}

animation()