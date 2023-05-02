import * as THREE from 'three';
import GSAP from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import Hydromium from '../Hydromium.js';
import Vars from '../Vars.js';

export default class Timeline {
	constructor() {
		this.Hydromium = new Hydromium();
		this.scene = this.Hydromium.scene;
		this.loaded = this.Hydromium.loader.loaded;
		this.camera = this.Hydromium.camera;
		console.log(this.Hydromium.canvas)
		this.timeline = document.querySelector("#timeline");
		this.lerp = [];
		this.timelines = [];

		GSAP.registerPlugin(ScrollTrigger);

		this.mouseMove();

		this.setDecorations();
		this.playIntro();
	}

	mouseMove() {
		window.addEventListener("mousemove", (e) => {
			this.rotation =
				((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
			Vars.lerp.target = this.rotation * 0.05;
		});
	}

	update() {
		Vars.lerp.current = GSAP.utils.interpolate(
			Vars.lerp.current,
			Vars.lerp.target,
			Vars.lerp.ease
		);

		this.lerp.forEach((val) => {
			val.rotation.y = Vars.lerp.current;
		})
	}

	setDecorations() {
		const geometry = new THREE.CircleGeometry(5, 64);
		const material1 = new THREE.MeshStandardMaterial({ color: 0xbfe3dd });
		const material2 = new THREE.MeshStandardMaterial({ color: 0xe3e3e3 });
		const material3 = new THREE.MeshStandardMaterial({ color: 0x000000 });

		this.circle1 = new THREE.Mesh(geometry, material1);
		this.circle2 = new THREE.Mesh(geometry, material2);
		this.hide = new THREE.Mesh(geometry, material3);

		this.circle1.scale.set(0, 0, 0);
		this.circle2.scale.set(0, 0, 0);
		this.hide.scale.set(5, 5, 5);
		this.hide.scale.set(5, 5, 5);

		this.circle1.rotation.x = this.circle2.rotation.x = this.hide.rotation.x = -Math.PI/2;
		this.circle1.receiveShadow = this.circle2.receiveShadow = true;

		this.scene.add(this.circle1, this.circle2, this.hide)
		console.log(this.hide)
	}

	async playIntro() {
		await this.firstIntroduction();
	}

	firstIntroduction() {
		return new Promise((resolve) => {
				this.lerp.push(this.loaded.firstPot);
				this.camera.orthographicCamera.position.set(0, 10, 0);
				this.camera.orthographicCamera.layers.toggle(2);

				this.loaded.firstText.position.set(0, 0.03, 0);
				this.loaded.secondText.position.set(0, 0.02, 0);

				this.loaded.firstText.children[0].material.transparent = this.loaded.secondText.children[0].material.transparent = this.loaded.fourthText.children[0].material.transparent = this.hide.material.transparent = true
				this.loaded.firstText.children[0].material.opacity = this.loaded.secondText.children[0].material.opacity = this.loaded.fourthText.children[0].material.opacity = this.hide.material.opacity = 0
				
				this.hide.position.set(0, 5.5, 0);

				this.loaded.fourthText.position.set(0, 6, 0);
				this.loaded.firstPot.position.set(0, 8, 0);
				this.loaded.secondPot.position.set(0, 0, -2);

				this.circle1.position.set(0, 0, -2.5);
				this.circle2.position.set(5, 0.01, -5);

				this.firstMove = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".firstMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 4,
						invalidateOnRefresh: true,
					}
				})
					.to(this.loaded.firstPot.position,
						{
							y: 0,
							ease: "power1.inout"
						}
					)
					.to(this.camera.orthographicCamera.position,
						{
							y: 3 
						},
						"<"
					)
					.to(this.loaded.firstPot.scale,
						{
							x: 0.5,
							y: 0.5,
							z: 0.5,
						}
					)
					.to(this.loaded.firstRoot.scale,
						{
							x: 0.5,
							y: 0.5,
							z: 0.5,
						},
						"<"
					)
					.to(this.loaded.firstPot.position,
						{
							z: -2.5,
						},
						"<"
					)
					.to(this.loaded.firstRoot.position,
						{
							z: -2.5,
						},
						"<"
					)
					.to(this.camera.orthographicCamera.rotation,
						{
							x: -Math.PI / 5
						},
						"<"
					)
				this.timelines.push(this.firstMove)
				this.lerp.push(this.loaded.firstRoot)

				this.firstText = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".firstMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					}
				})
					.to(this.loaded.firstText.children[0].material,
						{
							opacity: 1
						}
					)
				this.timelines.push(this.firstText)

				this.secondText = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".firstText",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					}
				})					
					.to(this.loaded.firstText.children[0].material,
						{
							opacity: 0
						}
					)
					.to(this.loaded.secondText.children[0].material,
						{
							opacity: 1,
							ease: "power1.in"
						}
					)
				this.timelines.push(this.secondText)

				this.firstCircle = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".firstMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 5,
						invalidateOnRefresh: true,
					}
				})
					.to(this.circle1.scale,
						{
							x: 2,
							y: 2,
							z: 2,
							ease: "power1.inout",
						},
						"<0.3"
					)
				this.timelines.push(this.firstCircle)

				this.secondMove = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".secondMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 4,
						invalidateOnRefresh: true,
					}
				})
					.to(this.camera.orthographicCamera.position,
						{
							x: 5,
							z: -5,
							ease: "power1.out"
						}
					)
				this.timelines.push(this.secondMove)

				this.secondCircle = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".secondMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 5,
						invalidateOnRefresh: true,
					}
				})
					.to(this.circle2.scale,
						{
							x: 2,
							y: 2,
							z: 2,
							ease: "power1.out",
						},
						"<0.5"
					)
				this.timelines.push(this.secondCircle)

				this.ide = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".thirdMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.5,
						invalidateOnRefresh: true,
					}
				})
					.to(this.hide.material,
						{
							opacity: 1,
							ease: "power1.in"
						}
					)
				this.timelines.push(this.ide)

				this.unhide = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".fourthMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 2,
						invalidateOnRefresh: true,
					}
				})
					.to(this.camera.orthographicCamera.position,
						{
							x: 13,
							z: -13,
							y: 2.3,
							ease: "power1.out"
						},
						"<4.5"
					)
					.to(this.camera.orthographicCamera.rotation,
						{
							x: -Math.PI / 8
						},
						"<"
					)
				this.timelines.push(this.unhide)

				this.last = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".fifthMove",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.4,
						invalidateOnRefresh: true,
					}
				})
					.to(this.hide.material,
						{
							opacity: 0,
							ease: "power1.in"
						}
					)
					.to(".navigation-bar",
						{
							opacity: 1,
							ease: "power1.in",
						}
					)
				this.timelines.push(this.last)
		})
	}

	remove() {
		this.timelines.forEach(function (item) {
			item.set(".timeline", {
				opacity: 0,
			})
		})
		this.timeline.setAttribute("hidden", "hidden")
		this.Hydromium.canvas.setAttribute("hidden", "hidden");
		document.querySelector(".main").setAttribute("hidden", "hidden")
		Vars.allowRender = false;
	} 
}