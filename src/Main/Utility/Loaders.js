import * as THREE from 'three';
import Hydromium from '../Hydromium.js';

import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

import firstPot from '../../../resources/res/models/firstPotPreview.glb';
import firstRoot from '../../../resources/res/models/firstRoot.glb';
import second from '../../../resources/res/models/secondPotPreview.glb';
import module from '../../../resources/res/models/modulePreview.glb';

import firstText from '../../../resources/res/models/text1.glb';
import secondText from '../../../resources/res/models/text2.glb';
import thirdText from '../../../resources/res/models/text3.glb';
import fourthText from '../../../resources/res/models/text4.glb';
import fifthText from '../../../resources/res/models/text5.glb';

export default class Loader extends EventEmitter {
	constructor() {
		super();
		this.Hydromium = new Hydromium();
		this.scene = this.Hydromium.scene;
		this.assets = [];
		this.loaded = [];
		this.loaders = [];
		this.tracked = 0;
		this.track = 0;

		this.setLoaders();
		this.pushLoaders();
		this.setAssets();
		this.load(this.assets);
	}

	setLoaders() {
		this.loaders.TextureLoader = new THREE.TextureLoader();		

		this.loaders.DRACOLoader = new DRACOLoader();
		this.loaders.DRACOLoader.setDecoderPath('./draco/');
		this.loaders.DRACOLoader.setDecoderConfig({type: "js"});

		this.loaders.GLTFLoader = new GLTFLoader();
		this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
	}

	pushLoaders() {
		this.loaders.push({
			ext: ['glb', 'gltf'],
			add: (src) => {
				this.loaders.GLTFLoader.load(src.path, (gltf) => {
					gltf.scene.traverse((children) => {
						children.castShadow = true;
						children.receiveShadow = true;
					})
					gltf.scene.scale.set(1,1,1);

					this.scene.add(gltf.scene)
					this.save(gltf, src)
				})
			}
		});

		this.loaders.push({
			ext: ['png', 'jpg'],
			add: (src) => {	
				this.loaders.TextureLoader.load(src.path, (result) => this.save(result, src))
			}
		})
	}

	load(assets) {
		for (const asset of assets) {
			let extension = asset.ext;
			let loader = this.loaders.find(_extension => _extension.ext.find((ext) => ext === extension))
			if (loader) {
				loader.add(asset);
			}
		}
	}

	save(result, resource) {
		this.tracked++;
		this.loaded[resource.name] = result.scene;
		if (resource.name == "module") result.scene.layers.set(2);

		if (this.tracked == this.track) {
			this.emit("Loaded")
		}
    }

	setAssets() {
		this.assets.push({
			name: 'firstPot',
			path: firstPot,
			ext: 'glb'
			},

			{
			name: 'firstRoot',
			path: firstRoot,
			ext: 'glb'
			},

			{
			name: 'firstText',
			path: firstText,
			ext: 'glb'
			},

			{
			name: 'secondText',
			path: secondText,
			ext: 'glb'
			},

			{
			name: 'secondPot',
			path: second,
			ext: 'glb'
			},

			{
			name: 'thirdText',
			path: thirdText,
			ext: 'glb'
			},

			{
			name: 'fourthText',
			path: fourthText,
			ext: 'glb'
			},

			{
			name: 'module',
			path: module,
			ext: 'glb'
			},

			{
			name: 'fifthText',
			path: fifthText,
			ext: 'glb'
			})

		this.track = this.assets.length
	}
}