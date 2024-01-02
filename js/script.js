//#region OPTIONS

const options = {
    spotLight: true,
    spotLightAngle: 0.8,
    spotLightPenumbra: 0,
    spotLightIntensity: 1,
    pointLight: true,
    directionalLight: true,
    ambientLight: true,
    camera: "A"
};

//#endregion

//#region IMPORT AND DEFINE TEXTURES 

//const texture_url = "http://virtual.lab.inf.uva.es:23172";
const texture_url = "../";

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

//#region STARS TEXTURE 2D
const stars_texture = texture_url + 'practica3/img/stars_texture.jpg'

const ceiling = cubeTextureLoader.load([
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture
]);
//#endregion

//#region METAL 006 TEXTURE 2D
const metal_006_roughnessTexture = texture_url + 'practica3/img/Metal_006_SD/Metal_006_roughness.jpg';

const metal_006 = new THREE.MeshStandardMaterial({
    map: textureLoader.load(metal_006_roughnessTexture),
});
//#endregion

//#region METAL RUSTED TEXTURE 2D
const metal_rusted_basecolor = texture_url + 'practica3/img/Metal_Rusted_010_SD/Metal_Rusted_010_basecolor.jpg';

const metal_rusted = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load(metal_rusted_basecolor),
});
//#endregion

//#region METAL 004 TEXTURE 3D
const metal_004_aoTexture = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_ambientOcclusion.jpg';
const metal_004_basecolor = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_basecolor.jpg';
const metal_004_metalnessTexture = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_metallic.jpg';
const metal_004_normalTexture = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_normal.jpg';
const metal_004_roughnessTexture = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_roughness.jpg';
const metal_004_emissiveTexture = texture_url + 'practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_emissive.jpg';

const metal_004 = new THREE.MeshStandardMaterial({
    aoMap: textureLoader.load(metal_004_aoTexture),
    map: textureLoader.load(metal_004_basecolor),
    metalnessMap: textureLoader.load(metal_004_metalnessTexture),
    normalMap: textureLoader.load(metal_004_normalTexture),
    roughnessMap: textureLoader.load(metal_004_roughnessTexture),
    emissiveMap: textureLoader.load(metal_004_emissiveTexture)
});
//#endregion

//#region METAL 002 TEXTURE 3D
const metal_002_aoTexture = texture_url + 'practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_ambientOcclusion.jpg';
const metal_002_basecolor = texture_url + 'practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_basecolor.jpg';
const metal_002_metalnessTexture = texture_url + 'practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_metallic.jpg';
const metal_002_normalTexture = texture_url + 'practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_normal.jpg';
const metal_002_roughnessTexture = texture_url + 'practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_roughness.jpg';

const metal_002 = new THREE.MeshStandardMaterial({
    aoMap: textureLoader.load(metal_002_aoTexture),
    map: textureLoader.load(metal_002_basecolor),
    metalnessMap: textureLoader.load(metal_002_metalnessTexture),
    normalMap: textureLoader.load(metal_002_normalTexture),
    roughnessMap: textureLoader.load(metal_002_roughnessTexture),
});

//#endregion

//#region GLASS TEXTURE 2D
const glass_basecolor = texture_url + 'practica3/img/Glass_Window_001_SD/Glass_Window_001_basecolor.jpg';

const green_glass = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(glass_basecolor),
    color: 0x00FF00,
    metalness: 0.3,
    roughness: 0.5,
    transparent: true,
    opacity: 1
});

const red_glass = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(glass_basecolor),
    color: 0xFF0000,
    metalness: 0.3,
    roughness: 0.5,
    transparent: true,
    opacity: 1
});

//#endregion

//#region MOON TEXTURE 2D
const moon_texture = texture_url + 'practica3/img/moon_texture.jpg';
const moon = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon_texture),
    side: THREE.DoubleSide
});
//#endregion

//#region RUBBER TEXTURE 2D
const rubber_texture = texture_url + 'practica3/img/rubber_texture.avif';
const rubber = new THREE.MeshStandardMaterial({
    map: textureLoader.load(rubber_texture),
    side: THREE.DoubleSide
});
//#endregion

//#endregion

//#region CREATE RENDERER AND SCENE
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//#endregion

//#region ROBOT

//#region Body
let bodyGroup = new THREE.Group();

const bodyGeometry = new THREE.BoxGeometry(1, 1, 0.5);


const bodyMaterial = [
    metal_006,
    metal_006,
    metal_006,
    metal_006,
    metal_004,
    metal_006
];
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.receiveShadow = true;
body.castShadow = true;

//#region Neck
var neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3);
var neck = new THREE.Mesh(neckGeometry, metal_002);
neck.position.y = 0.6;
//neck.position.x = 0.2;
neck.receiveShadow = true;
neck.castShadow = true;
//#endregion

//#region Right Leg
let rightLeg = new THREE.Group();

//#region Right Tight
var rightTightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
var rightTight = new THREE.Mesh(rightTightGeometry, metal_002);
rightTight.position.y = -0.65;
rightTight.position.x = 0.2;
rightTight.receiveShadow = true;
rightTight.castShadow = true;

//#endregion

//#region Right Foot
var rightFootGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.09);
var rightFoot = new THREE.Mesh(rightFootGeometry, rubber);
rightFoot.position.y = -0.94;
rightFoot.position.x = 0.2;
rightFoot.receiveShadow = true;
rightFoot.castShadow = true;
//#endregion

rightLeg.add(rightTight);
rightLeg.add(rightFoot);

//#endregion

//#region Left Leg
let leftLeg = new THREE.Group();

//#region Left Tight
var leftTightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
var leftTight = new THREE.Mesh(leftTightGeometry, metal_002);
leftTight.position.y = -0.65;
leftTight.position.x = -0.2;
leftTight.receiveShadow = true;
leftTight.castShadow = true;

//#endregion

//#region Right Foot
var leftFootGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.09);
var leftFoot = new THREE.Mesh(leftFootGeometry, rubber);
leftFoot.position.y = -0.94;
leftFoot.position.x = -0.2;
leftFoot.receiveShadow = true;
leftFoot.castShadow = true;
//#endregion

leftLeg.add(leftTight);
leftLeg.add(leftFoot);

//#endregion

//#region Left Arm
var leftArmGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
var leftArm = new THREE.Mesh(leftArmGeometry, metal_002);
leftArm.position.x = -0.60;
leftArm.position.y = 0.25;
leftArm.receiveShadow = true;
leftArm.castShadow = true;
//#endregion

//#region Left Forearm
var leftForearmGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2);
var leftForearm = new THREE.Mesh(leftForearmGeometry, metal_006);
leftForearm.rotation.z = -Math.PI / 20
leftForearm.position.x = -0.60;
leftForearm.position.y = -0.05;
leftForearm.receiveShadow = true;
leftForearm.castShadow = true;
//#endregion

//#region Left Hand
const leftHandGeometry = new THREE.TorusGeometry(0.09, 0.04, 6, 5);
const leftHand = new THREE.Mesh(leftHandGeometry, metal_rusted)
leftHand.rotation.z = -Math.PI / 7
leftHand.position.x = -0.63;
leftHand.position.y = -0.25;
leftHand.receiveShadow = true;
leftHand.castShadow = true;
//#endregion

//#region Rigth Arm
var rightArmGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
var rightArm = new THREE.Mesh(rightArmGeometry, metal_002);
rightArm.position.x = 0.60;
rightArm.position.y = 0.25;
rightArm.castShadow = true;
rightArm.receiveShadow = true;
//#endregion

//#region Rigth Forearm
var rightForearmGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2);
var rightForearm = new THREE.Mesh(rightForearmGeometry, metal_006);
rightForearm.rotation.z = Math.PI / 20
rightForearm.position.x = 0.60;
rightForearm.position.y = -0.05;
rightForearm.receiveShadow = true;
rightForearm.castShadow = true;

//#endregion

//#region Right Hand
const rightHandGeometry = new THREE.TorusGeometry(0.09, 0.04, 6, 5);
const rightHand = new THREE.Mesh(rightHandGeometry, metal_rusted)
rightHand.rotation.z = -Math.PI / 14
rightHand.position.x = +0.63;
rightHand.position.y = -0.25;
rightHand.receiveShadow = true;
rightHand.castShadow = true;
//#endregion

bodyGroup.add(body);
bodyGroup.add(rightLeg);
bodyGroup.add(leftLeg);
bodyGroup.add(rightArm);
bodyGroup.add(rightForearm);
bodyGroup.add(rightHand);
bodyGroup.add(leftArm);
bodyGroup.add(leftForearm);
bodyGroup.add(leftHand);
bodyGroup.add(neck);

scene.add(bodyGroup);

//#endregion

//#region Head

let headGroup = new THREE.Group();

const headGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const headMaterial = [
    metal_006,
    metal_006,
    metal_006,
    metal_006,
    metal_004,
    metal_006
]
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1;
head.receiveShadow = true;
head.castShadow = true;

//#region Left Eye
var leftEyeGeometry = new THREE.SphereGeometry(0.15, 32, 16, 0, Math.PI);
var leftEye = new THREE.Mesh(leftEyeGeometry, red_glass);
leftEye.position.x = 0.25;
leftEye.position.y = 1;
leftEye.position.z = 0.25;
leftEye.receiveShadow = true;
leftEye.castShadow = true;

const leftRingGeometry = new THREE.RingGeometry(0.2, 0.15, 32);
var leftRing = new THREE.Mesh(leftRingGeometry, metal_rusted);
leftRing.position.x = 0.25;
leftRing.position.y = 1;
leftRing.position.z = 0.255;
leftRing.receiveShadow = true;
leftRing.castShadow = true;
//#endregion

//#region Rigth Eye
var rightEyeGeometry = new THREE.SphereGeometry(0.15, 32, 16, 0, Math.PI);
var rightEye = new THREE.Mesh(rightEyeGeometry, green_glass);
rightEye.position.x = -0.25;
rightEye.position.y = 1;
rightEye.position.z = 0.25;
rightEye.receiveShadow = true;
rightEye.castShadow = true;

const rightRingGeometry = new THREE.RingGeometry(0.2, 0.15, 32);
var rightRing = new THREE.Mesh(rightRingGeometry, metal_rusted);
rightRing.position.x = -0.25;
rightRing.position.y = 1;
rightRing.position.z = 0.255;
rightRing.receiveShadow = true;
rightRing.castShadow = true;

//#endregion

//#region Left Ear
var leftEarGeometry = new THREE.SphereGeometry(0.05, 32, 32, 0, Math.PI);
var leftEar = new THREE.Mesh(leftEarGeometry, metal_rusted);
leftEar.position.x = -0.5;
leftEar.position.y = 1;
leftEar.rotation.y = - Math.PI / 2;
leftEar.receiveShadow = true;
leftEar.castShadow = true;
//#endregion

//#region Right Ear
var rigthEarGeometry = new THREE.SphereGeometry(0.05, 32, 32, 0, Math.PI);
var rigthEar = new THREE.Mesh(rigthEarGeometry, metal_rusted);
rigthEar.position.x = 0.5;
rigthEar.position.y = 1;
rigthEar.rotation.y = Math.PI / 2;
rigthEar.receiveShadow = true;
rigthEar.castShadow = true;

//#endregion

//#region Antenna
var antennaGeometry = new THREE.CylinderGeometry(0, 0.01, 0.5);
var antenna = new THREE.Mesh(antennaGeometry, metal_006);
antenna.position.y = 1.5;
//antenna.position.x = 0.2;
antenna.receiveShadow = true;
antenna.castShadow = true;
//#endregion

headGroup.add(head);
headGroup.add(leftEye);
headGroup.add(leftRing);
headGroup.add(rightEye);
headGroup.add(rightRing);
headGroup.add(leftEar);
headGroup.add(rigthEar);
headGroup.add(antenna);

scene.add(headGroup);

//#endregion

//#endregion

//#region CREATE CAMERAS
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = 2;
camera.position.z = 6;
camera.position.y = 3;

const cameraB = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraB.position.set(
    (leftEye.position.x + rightEye.position.x) / 2,
    leftEye.position.y + 0.1,
    leftEye.position.z - 0.1);

headGroup.add(cameraB);

let activeCamera = camera;
//#endregion

//#region BACKGROUND
scene.background = ceiling;

// add plane 
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, moon);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -1;
plane.receiveShadow = true;

//#endregion

//#region LIGHTS
// ambient light
const ambientLight = new THREE.AmbientLight(0x333333);
ambientLight.intensity = 1
scene.add(ambientLight);

// spot light
const spotLight = new THREE.SpotLight(0xFFFFED);
scene.add(spotLight);
spotLight.position.set(head.position.x, head.position.y + 1, head.position.z);
spotLight.intensity = options.spotLightIntensity;
spotLight.angle = options.spotLightAngle;
spotLight.castShadow = true;
spotLight.penumbra = options.spotLightPenumbra;
spotLight.target = headGroup;

// directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(0, 2, 2);
directionalLight.intensity = 1;
directionalLight.castShadow = true;

createEyeLights();

// point lights
function createEyeLights() {
    rightEyeLight = new THREE.PointLight(0xFFFFFF, 5, 0.2);
    scene.add(rightEyeLight);
    rightEyeLight.castShadow = false
    rightEyeLight.position.set(rightEye.position.x, rightEye.position.y, rightEye.position.z + 0.2);
    leftEyeLight = new THREE.PointLight(0xFFFFFF, 5, 0.2);
    scene.add(leftEyeLight);
    leftEyeLight.castShadow = false
    leftEyeLight.position.set(leftEye.position.x, leftEye.position.y, leftEye.position.z + 0.2);

    headGroup.add(leftEyeLight);
    headGroup.add(rightEyeLight);
}
//#endregion

//#region ANIMATIONS

function animate() {
    // spotlight changes
    spotLight.angle = options.spotLightAngle;
    spotLight.penumbra = options.spotLightPenumbra;
    spotLight.intensity = options.spotLightIntensity;

    renderer.render(scene, activeCamera);
}

let maxRotationMembers = Math.PI / 9;
let moveMembers = true;

function walk() {
    for (i = 0; i < 15; i++) {
        if (Math.abs(leftLeg.rotation.x).toFixed(1) == Math.abs(maxRotationMembers).toFixed(1)) {
            moveMembers = !moveMembers;
        }

        if (moveMembers) {
            leftLeg.rotation.x += 0.02;
            rightLeg.rotation.x -= 0.02;
        }
        else {
            leftLeg.rotation.x -= 0.02;
            rightLeg.rotation.x += 0.02;
        }
    }
}

renderer.setAnimationLoop(animate)
//#endregion

//#region EVENTS

// Add mouse move event
const orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.update();

//Add change window size event
window.addEventListener("resize", function () {
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();

    cameraB.aspect = this.window.innerWidth / this.window.innerHeight;
    cameraB.updateProjectionMatrix();

    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
})

// Add key pressed event
document.addEventListener("keydown", function (event) {
    moveRobot(event.keyCode);
});

function moveRobot(number) {
    switch (number) {
        case 73:
            resetRotationRobot();
            translateRobot(0, 0.1);
            walk();
            break;
        case 75:
            rotateRobot(1)
            translateRobot(0, -0.1)
            walk();
            break;
        case 74:
            rotateRobot(-2)
            translateRobot(-0.1)
            walk();
            break;
        case 76:
            rotateRobot(2)
            translateRobot(0.1)
            walk();
            break;
        case 65:
            rotateRobotBody(0.1)
            break;
        case 68:
            rotateRobotBody(-0.1)
            break;
        case 83:
            rotateRobotHead(0.1)
            break;
        case 87:
            rotateRobotHead(-0.1)
            break;
    }
}

// Define limits to the robot movement
const limiteXMin = -3.5;
const limiteXMax = 3.5;
const limiteZMin = -3.5;
const limiteZMax = 3.5;

// translate robot
function translateRobot(x = 0, z = 0) {
    // Calculate new positions
    const novaPosX = bodyGroup.position.x + x;
    const novaPosZ = bodyGroup.position.z + z;

    // Verify new positions agains limit
    if (novaPosX >= limiteXMin && novaPosX <= limiteXMax) {
        bodyGroup.position.x = novaPosX;
        headGroup.position.x = novaPosX;
        spotLight.position.x = -novaPosX;
    }

    if (novaPosZ >= limiteZMin && novaPosZ <= limiteZMax) {
        bodyGroup.position.z = novaPosZ;
        headGroup.position.z = novaPosZ;
        spotLight.position.z = -novaPosZ;
    }
}

function resetRotationRobot() {
    bodyGroup.rotation.y = 0;
    headGroup.rotation.y = 0;
}

function rotateRobot(number) {
    bodyGroup.rotation.y = Math.PI / number;
    headGroup.rotation.y = Math.PI / number;
}

// rotate robot body
function rotateRobotBody(y) {
    bodyGroup.rotation.y += y;
}

//rotate robot head
function rotateRobotHead(y) {
    headGroup.rotation.y += y;
}

//#endregion

//#region CONTROLS

const gui = new dat.GUI();
var camerasFolder = gui.addFolder("Cameras");

camerasFolder.add(options, 'camera', { A: 'A', B: 'B' }).onChange(function (e) {
    console.log(e);
    //switch between cameras
    if (e == "A") {
        activeCamera = camera;
    } else {
        activeCamera = cameraB;
    }
});

var lightsFolder = gui.addFolder('Lights');

lightsFolder.add(options, "spotLight").onChange(function (e) {
    if (e) {
        scene.add(spotLight);
    }
    else {
        scene.remove(spotLight);
    }
})
lightsFolder.add(options, "spotLightAngle", 0, 1);
lightsFolder.add(options, "spotLightPenumbra", 0, 1);
lightsFolder.add(options, "spotLightIntensity", 0, 1);

lightsFolder.add(options, "pointLight").onChange(function (e) {
    if (e) {
        createEyeLights();
    }
    else {
        headGroup.remove(rightEyeLight);
        headGroup.remove(leftEyeLight)
        scene.remove(rightEyeLight);
        scene.remove(leftEyeLight);
    }
})

lightsFolder.add(options, "directionalLight").onChange(function (e) {
    if (e) {
        scene.add(directionalLight);
    }
    else {
        scene.remove(directionalLight);
    }
})

lightsFolder.add(options, "ambientLight").onChange(function (e) {
    if (e) {
        scene.add(ambientLight);
    }
    else {
        scene.remove(ambientLight);
    }
})

//#endregion