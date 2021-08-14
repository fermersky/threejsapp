import '../styles/style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import '../fonts/typeface.json'

let light = false;

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg')
})

renderer.setSize(window.innerWidth, window.innerHeight)

const blueMaterial = new THREE.MeshStandardMaterial( { color: 0x2196F3 } );
const greenMaterial = new THREE.MeshStandardMaterial( { color: 0x76FF03 } );
const pinkMaterial = new THREE.MeshStandardMaterial( { color: 0xE91E63 } );
const orangeMaterial = new THREE.MeshStandardMaterial( { color: 0xFF9800 } );
const redMaterial = new THREE.MeshStandardMaterial( { color: 0xf44336 } );
const indigoMaterial = new THREE.MeshStandardMaterial( { color: 0x03A9F4 } );
const yellowMaterial = new THREE.MeshStandardMaterial( { color: 0xFFEB3B } );

const colorizedMaterial = {
  'blue': blueMaterial,
  'green': greenMaterial,
  'pink': pinkMaterial,
  'orange': orangeMaterial,
  'red': redMaterial,
  'indigo': indigoMaterial,
  'yellow': yellowMaterial,
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

camera.position.z = 40;


const pointLight = new THREE.PointLight( 0xFFFDD0, 2, 20 );
pointLight.position.set(45, 0, 10);

const fontLoader = new THREE.FontLoader()

function renderText(font, text, color, size, {x, y, z}) {
  const config = {
		font,
		size,
		height: 0.1,
		curveSegments: 40,
		bevelEnabled: true,
		bevelThickness: 0.2,
		bevelSize: 0.2,
		bevelOffset: 0,
		bevelSegments: 20,
  }

  const geometry = new THREE.TextGeometry(text, config);
  const mesh = new THREE.Mesh(geometry, colorizedMaterial[color])

  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;

  mesh.rotateY(25)

  scene.add(mesh)
}

fontLoader.load('./fonts/typeface.json', function (font) {
  renderText(font, 'Docker', 'blue', 4, {x: 1, y: 1, z: 1})
  renderText(font, 'Nginx', 'green', 6, {x: -30, y: 3, z: 2})
  renderText(font, 'Angular', 'red', 3, {x: -50, y: -10, z: 1})
  renderText(font, 'Linux', 'orange', 4, {x: 30, y: -10, z: 1})
  renderText(font, 'Node.Js', 'green', 4, {x: 25, y: 15, z: 2})
  renderText(font, 'Bash', 'pink', 3, {x: 5, y: 20, z: 2})
  renderText(font, 'Nest.Js', 'indigo', 4, {x: -35, y: 20, z: 2})
  renderText(font, 'JavaScript', 'yellow', 3, {x: -5, y: -15, z: 2})
})


// const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)

    // controls.update();

    renderer.render(scene, camera)
}

window.onmousemove = (e) => {
  pointLight.position.x = (e.clientX / (window.innerWidth / 2 / 64)) - 64;
  pointLight.position.y = ~((e.clientY / (window.innerHeight / 2 / 32)) - 32);

  document.getElementById('flashlight').style.top = e.clientY + 100 + 'px';
  document.getElementById('flashlight').style.left = e.clientX + 0 + 'px';
}

window.onclick = (e) => {
  if (light) {
    scene.remove(pointLight)
    document.getElementById('flashlight').classList.remove('on')
    document.getElementById('flashlight').classList.add('off')
  } else {
    scene.add(pointLight)
    document.getElementById('flashlight').classList.remove('off')
    document.getElementById('flashlight').classList.add('on')
  }

  light = !light;
}

animate()