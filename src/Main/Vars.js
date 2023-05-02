import * as THREE from 'three';

export default class Vars {
	static aspect = window.innerWidth/window.innerHeight;
	static frustum = 5;
	static backGroundColor = new THREE.Color(0xffffff);
	static allowRender = true;

	static lerp = {
		current: 0,
		target: 0,
		ease: 0.1,
	};
}