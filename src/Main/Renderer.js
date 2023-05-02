import * as THREE from 'three';
import Hydromium from './Hydromium.js';

import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default class Renderer {
	constructor() {
		this.Hydromium = new Hydromium();
		this.scene = this.Hydromium.scene;
		this.camera = this.Hydromium.camera.orthographicCamera;

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.Hydromium.canvas,
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.pixelRatio);
		
		this.setColorCorrection();
	}

	setColorCorrection() {
		this.renderer.useLegacyLights = false;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.toneMapping = THREE.LinearToneMapping;
		this.renderer.toneMappingExposure = 0.3
		this.renderer.shadowMap.enabled = true;
		this.renderer.setClearColor( 0xcccccc );

		this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
   		this.pmremGenerator.compileEquirectangularShader();

		this.environment = this.pmremGenerator.fromScene(new RoomEnvironment()).texture;
		this.scene.environment = this.environment
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	update(scene = this.scene, camera = this.camera) {
		// this.renderer.setViewport(0,0, window.innerWidth, window.innerHeight)
		this.renderer.render(scene, camera);

		// this.renderer.setScissorTest(true);
		// this.renderer.setViewport(
		// 	window.innerWidth - window.innerWidth / 3,
		// 	window.innerHeight - window.innerHeight / 3,
		// 	window.innerWidth / 3,
		// 	window.innerHeight / 3
		// );

		// this.renderer.setScissor(
		// 	window.innerWidth - window.innerWidth / 3,
		// 	window.innerHeight - window.innerHeight / 3,
		// 	window.innerWidth / 3,
		// 	window.innerHeight / 3
		// );

		// this.renderer.render(scene, this.camera);
		// this.renderer.setScissorTest(false);
	}
}