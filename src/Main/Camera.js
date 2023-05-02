import * as THREE from 'three';
import Hydromium from './Hydromium.js';
import Vars from './Vars.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
	constructor() {
		this.Hydromium = new Hydromium();
		this.scene = this.Hydromium.scene;
		this.canvas = this.Hydromium.canvas;

		this.setOrthographic();
		this.setPerspective();
	}

	setPerspective() {	
		this.perspectiveCamera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 500);

		this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;

		const light2  = new THREE.DirectionalLight(0xffffff, 1.85);
		light2.position.set(0.5, 0.2, 0.5);
    	this.scene.add( light2 );

		light2.castShadow = true;
		light2.shadow.mapSize.width = 2048;
		light2.shadow.mapSize.height = 2048;

		const d = 20;

		light2.shadow.camera.left = - d;
		light2.shadow.camera.right = d;
		light2.shadow.camera.top = d;
		light2.shadow.camera.bottom = - d;

		light2.shadow.camera.far = 3500;
		light2.shadow.bias = - 0.0001;

		const hemiLight = new THREE.HemisphereLight();
		this.scene.add(hemiLight); 
	}

	setOrthographic() {
		this.orthographicCamera = new THREE.OrthographicCamera(-Vars.frustum * Vars.aspect / 2,
		 											Vars.frustum * Vars.aspect / 2,
												    Vars.frustum / 2,
												   -Vars.frustum / 2, -50, 50);
		this.orthographicCamera.rotation.x = -Math.PI / 4;
		this.orthographicCamera.position.y = 3;

		this.orthographicCamera.layers.disable(1);
		// this.cameraHelper = new THREE.CameraHelper(this.orthographicCamera);
		// this.scene.add(this.cameraHelper)

		// const size = 10;
		// const divisions = 10;

		// this.gridHelper = new THREE.GridHelper( size, divisions );
		// this.scene.add( this.gridHelper );

		// this.axesHelper = new THREE.AxesHelper(10);
		// this.scene.add(this.axesHelper);
	}

	setOrbit() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.orthographicCamera.left = -Vars.frustum * Vars.aspect / 2
		this.orthographicCamera.right = Vars.frustum * Vars.aspect / 2															
		this.orthographicCamera.top = Vars.frustum / 2
		this.orthographicCamera.bottom = -Vars.frustum / 2

		this.orthographicCamera.updateProjectionMatrix();
	}

	update() {
		this.controls.update();

		this.camHelper.matrixWorldNeedsUpdate = true;
		this.camHelper.update();
		this.camHelper.position.copy(this.orthographicCamera.position)
		this.camHelper.rotation.copy(this.orthographicCamera.rotation)
		this.camHelper.visible = true;	
	}
} 