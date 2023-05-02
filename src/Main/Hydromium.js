import * as THREE from 'three';

import Vars from './Vars.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';

import Tools from './Utility/Tools.js';
import Loaders from './Utility/Loaders.js';

import Timeline from './Controls/Timeline.js';
import Home from './Controls/Home.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Hydromium {
	static instance;
	constructor(canvas) {
		if (Hydromium.instance) {
			return Hydromium.instance;
		}
		Hydromium.instance = this;

		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.loader = new Loaders();
		this.tools = new Tools();
		this.home = new Home();

		this.scene.background = Vars.backGroundColor;

		this.tools.on("Update", () => this.render());
		this.loader.on("Loaded", () => {
			this.timeline = new Timeline()
		});


		const home = document.getElementById("home");

		home.addEventListener("click", () => this.timeline.remove())
	}

	render() {
		this.renderer.update(this.scene, this.camera.orthographicCamera);
		// this.camera.update();
		
		if (this.timeline) {
			this.timeline.update();
		}
	}
}
