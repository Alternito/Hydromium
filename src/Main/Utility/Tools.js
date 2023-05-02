import { EventEmitter } from 'eventemitter3/umd/eventemitter3.js';
import Vars from '../Vars.js';

export default class Tools extends EventEmitter {
	constructor() {
		super();
		this.aspect = window.innerWidth/window.innerHeight;
		this.then = Date.now();

		this.count();
		this.resize();
	}

	count() {
		this.now = Date.now();
		this.deltaTime = this.now - this.then;
		this.then = this.now;

		if (Vars.allowRender) this.emit("Update");
		window.requestAnimationFrame(() => this.count());
	}

	resize() {
		window.addEventListener("resize", () => {
			Vars.aspect = window.innerWidth/window.innerHeight;
			this.emit("Resize");
		})
	}
}