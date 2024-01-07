//#region OPTIONS
// Variables that will be used by the controls to change the scene
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
var loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();

var loaderElement = document.getElementById('loader');

loadingManager.onProgress = function (item, loaded, total) {
    showLoader()
};

loadingManager.onLoad = function () {
    hideLoader()
};

loadingManager.onError = function (url) {
    console.error('Error loading ' + url);
};

//#region STARS TEXTURE 2D
const stars_texture = '../practica3/img/stars_texture.jpg'

const stars = cubeTextureLoader.load([
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture,
    stars_texture
]);
//#endregion

//#region METAL 006 TEXTURE 2D
const metal_006_roughnessTexture = '../practica3/img/Metal_006_SD/Metal_006_roughness.jpg';

const metal_006 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(metal_006_roughnessTexture),
    metalness: 0.5,
    roughness: 0.2,
});
//#endregion

//#region METAL RUSTED TEXTURE 2D
const metal_rusted_basecolor = '../practica3/img/Metal_Rusted_010_SD/Metal_Rusted_010_basecolor.jpg';

const metal_rusted = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(metal_rusted_basecolor),
    metalness: 0.5,
    roughness: 0.2,
    side: THREE.DoubleSide
});
//#endregion

//#region METAL 004 TEXTURE 2D
const metal_004_basecolor = '../practica3/img/Sci_fi_Metal_Panel_004_SD/Sci_fi_Metal_Panel_004_basecolor.jpg';

const metal_004 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(metal_004_basecolor),
    metalness: 0.5,
    roughness: 0.2
});
//#endregion

//#region METAL 002 TEXTURE 3D
const metal_002_aoTexture = '../practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_ambientOcclusion.jpg';
const metal_002_basecolor = '../practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_basecolor.jpg';
const metal_002_metalnessTexture = '../practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_metallic.jpg';
const metal_002_normalTexture = '../practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_normal.jpg';
const metal_002_roughnessTexture = '../practica3/img/Sci-fi_Hose_002_SD/Sci-fi_Hose_002_roughness.jpg';

const metal_002 = new THREE.MeshPhysicalMaterial({
    aoMap: textureLoader.load(metal_002_aoTexture),
    map: textureLoader.load(metal_002_basecolor),
    metalnessMap: textureLoader.load(metal_002_metalnessTexture),
    normalMap: textureLoader.load(metal_002_normalTexture),
    roughnessMap: textureLoader.load(metal_002_roughnessTexture),
});

//#endregion

//#region GLASS TEXTURE 2D
const glass_basecolor = '../practica3/img/Glass_Vintage_001_basecolor.jpg';

const green_glass = new THREE.MeshPhongMaterial({
    map: textureLoader.load(glass_basecolor),
    color: 0x00FF00,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
});

const red_glass = new THREE.MeshPhongMaterial({
    map: textureLoader.load(glass_basecolor),
    color: 0xFF0000,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
});

//#endregion

//#region MOON TEXTURE 2D
const moon_texture = '../practica3/img/moon_texture.jpg';
const moon = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon_texture),
    side: THREE.DoubleSide
});
//#endregion

//#region RUBBER TEXTURE 2D
const rubber_texture = '../practica3/img/rubber_texture.avif';
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

//#region Body Group
let bodyGroup = new THREE.Group();

//#region Body
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
//#endregion

//#region Neck
var neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3);
var neck = new THREE.Mesh(neckGeometry, metal_002);
neck.position.y = 0.6;
//neck.position.x = 0.2;
neck.receiveShadow = true;
neck.castShadow = true;
//#endregion

//#region Right Leg Group
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

//#region Left Leg Group
let leftLeg = new THREE.Group();

//#region Left Tight
var leftTightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
var leftTight = new THREE.Mesh(leftTightGeometry, metal_002);
leftTight.position.y = -0.65;
leftTight.position.x = -0.2;
leftTight.receiveShadow = true;
leftTight.castShadow = true;

//#endregion

//#region Left Foot
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

//#region Head Group

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
//#endregion

//#region Left Eye Group
let leftEyeGroup = new THREE.Group();

const leftOuterEyeGeometry = new THREE.SphereGeometry(5, 32, 32, Math.PI, Math.PI, 0, Math.PI);
const leftOuterEye = new THREE.Mesh(
    leftOuterEyeGeometry,
    red_glass
);
leftEyeGroup.add(leftOuterEye);
leftOuterEye.rotation.x = Math.PI / 2;
leftOuterEye.receiveShadow = true;
leftOuterEye.castShadow = true;

const leftInnerEyeGeometry = new THREE.SphereGeometry(4, 32, 32, Math.PI, Math.PI, 0, Math.PI);
const leftInnerEyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x3A3B3C,
});
const leftInnerEye = new THREE.Mesh(
    leftInnerEyeGeometry,
    leftInnerEyeMaterial
);
leftEyeGroup.add(leftInnerEye);
leftInnerEye.rotation.x = Math.PI / 2;
leftInnerEye.receiveShadow = true;

const leftPupilGeometry = new THREE.SphereGeometry(1.5, 16, 16, Math.PI, Math.PI, 0, Math.PI);
const leftPupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
});
const leftPupil = new THREE.Mesh(
    leftPupilGeometry,
    leftPupilMaterial
);
leftEyeGroup.add(leftPupil);
leftPupil.rotation.x = Math.PI / 2;
leftPupil.position.y = leftPupil.position.z + Math.PI;
leftPupil.receiveShadow = true;

leftEyeGroup.scale.set(0.03, 0.03, 0.03);
leftEyeGroup.rotation.x = + Math.PI / 2;
leftEyeGroup.position.x = 0.25;
leftEyeGroup.position.y = 1;
leftEyeGroup.position.z = 0.25;

const leftRingGeometry = new THREE.RingGeometry(0.2, 0.1, 32);
var leftRing = new THREE.Mesh(leftRingGeometry, metal_rusted);
leftRing.position.x = 0.25;
leftRing.position.y = 1;
leftRing.position.z = 0.255;
leftRing.receiveShadow = true;
leftRing.castShadow = true;
//#endregion

//#region Rigth Eye Group
let rightEyeGroup = new THREE.Group();

const rightOuterEyeGeometry = new THREE.SphereGeometry(5, 32, 32, Math.PI, Math.PI, 0, Math.PI);
const rightOuterEye = new THREE.Mesh(
    rightOuterEyeGeometry,
    green_glass
);
rightEyeGroup.add(rightOuterEye);
rightOuterEye.rotation.x = Math.PI / 2;
rightOuterEye.receiveShadow = true;
rightOuterEye.castShadow = true;

const rightInnerEyeGeometry = new THREE.SphereGeometry(4, 32, 32, Math.PI, Math.PI, 0, Math.PI);
const rightInnerEyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x3A3B3C,
});
const rightInnerEye = new THREE.Mesh(
    rightInnerEyeGeometry,
    rightInnerEyeMaterial
);
rightEyeGroup.add(rightInnerEye);
rightInnerEye.rotation.x = Math.PI / 2;
rightInnerEye.receiveShadow = true;

const rightPupilGeometry = new THREE.SphereGeometry(1.5, 16, 16, Math.PI, Math.PI, 0, Math.PI);
const rightPupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
});
const rightPupil = new THREE.Mesh(
    rightPupilGeometry,
    rightPupilMaterial
);
rightEyeGroup.add(rightPupil);
rightPupil.rotation.x = Math.PI / 2;
rightPupil.position.y = rightPupil.position.z + Math.PI;
rightPupil.receiveShadow = true;

rightEyeGroup.scale.set(0.03, 0.03, 0.03);
rightEyeGroup.rotation.x = + Math.PI / 2;
rightEyeGroup.position.x = -0.25;
rightEyeGroup.position.y = 1;
rightEyeGroup.position.z = 0.25;

const rightRingGeometry = new THREE.RingGeometry(0.2, 0.1, 32);
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
antenna.receiveShadow = true;
antenna.castShadow = true;
//#endregion

headGroup.add(head);
headGroup.add(leftEyeGroup);
headGroup.add(leftRing);
headGroup.add(rightEyeGroup);
headGroup.add(rightRing);
headGroup.add(leftEar);
headGroup.add(rigthEar);
headGroup.add(antenna);

scene.add(headGroup);

//#endregion

//#endregion

//#region CREATE CAMERAS
// Main camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = 2;
camera.position.z = 6;
camera.position.y = 3;

// Second camera - First Person Camera
const cameraB = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraB.position.set(
    (leftEyeGroup.position.x + rightEyeGroup.position.x) / 2,
    leftEyeGroup.position.y + 0.1,
    leftEyeGroup.position.z - 0.1);

// Add camera to the head group so it moves around
headGroup.add(cameraB);

let activeCamera = camera;
//#endregion

//#region BACKGROUND
scene.background = stars;

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
    rightEyeLight.position.set(rightEyeGroup.position.x, rightEyeGroup.position.y, rightEyeGroup.position.z + 0.2);
    leftEyeLight = new THREE.PointLight(0xFFFFFF, 5, 0.2);
    scene.add(leftEyeLight);
    leftEyeLight.castShadow = false
    leftEyeLight.position.set(leftEyeGroup.position.x, leftEyeGroup.position.y, leftEyeGroup.position.z + 0.2);

    // Add lights to the head group so they move around
    headGroup.add(leftEyeLight);
    headGroup.add(rightEyeLight);
}
//#endregion

//#region ANIMATIONS

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

function animate() {
    // spotlight changes
    spotLight.angle = options.spotLightAngle;
    spotLight.penumbra = options.spotLightPenumbra;
    spotLight.intensity = options.spotLightIntensity;

    renderer.render(scene, activeCamera);
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
    processRobotMovements(event.keyCode);
});

function processRobotMovements(number) {
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

function translateRobot(x = 0, z = 0) {
    const novaPosX = bodyGroup.position.x + x;
    const novaPosZ = bodyGroup.position.z + z;

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

function rotateRobotBody(y) {
    bodyGroup.rotation.y += y;
}

function rotateRobotHead(y) {
    headGroup.rotation.y += y;
}

function showLoader() {
    document.getElementById('loaderContainer').classList.remove('hidden');
}

function hideLoader() {
    document.getElementById('loaderContainer').classList.add('hidden');
}

//#endregion

//#region CONTROLS

const gui = new dat.GUI();
var camerasFolder = gui.addFolder("Cameras");

camerasFolder.add(options, 'camera', { Main: 'A', FirstPerson: 'B' }).onChange(function (e) {
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