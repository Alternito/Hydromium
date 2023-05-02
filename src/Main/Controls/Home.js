import asparagus from "../../../resources/res/textures/asparagus.jpg";
import bayamhijau from "../../../resources/res/textures/bayamhijau.jpg";
import bayammerah from "../../../resources/res/textures/bayammerah.jpg";
import broccoli from "../../../resources/res/textures/broccoli.jpg";
import buncis from "../../../resources/res/textures/buncis.jpg";
import carrot from "../../../resources/res/textures/carrot.jpg";
import cucumber from "../../../resources/res/textures/cucumber.jpg";
import daunsingkong from "../../../resources/res/textures/daunsingkong.jpg";
import kacangpanjang from "../../../resources/res/textures/kacangpanjang.jpg"
import kangkung from "../../../resources/res/textures/kangkung.jpg"
import kemangi from "../../../resources/res/textures/kemangi.jpg"
import kembangkol from "../../../resources/res/textures/kembangkol.jpg"
import labusiam from "../../../resources/res/textures/labusiam.jpg"
import leunca from "../../../resources/res/textures/leunca.jpg"
import pakcoi from "../../../resources/res/textures/pakcoi.jpg"
import pare from "../../../resources/res/textures/pare.jpg"
import sawi from "../../../resources/res/textures/sawi.jpg"
import selada from "../../../resources/res/textures/selada.jpg"
import seledri from "../../../resources/res/textures/seledri.jpg"
import tauge from "../../../resources/res/textures/tauge.jpg"
import terong from "../../../resources/res/textures/terong.jpg"
import ubiungu from "../../../resources/res/textures/ubiungu.jpg"

let active = false;
let total = 0;
let images = [];
let cart = [];

export default class Home {
	constructor() {
		this.container = document.querySelectorAll(".item-wrapper");
		this.container2 = document.querySelectorAll(".bottom-wrapper");
		this.initArray();
		this.randomizeImg();
		
		document.addEventListener('click', function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement,
				text = target.textContent || target.innerText

			if ((target.id === "button-span" || target.id === "paybutton") && total > 0) {
				var blur = document.getElementById("blur");
				blur.classList.add("appear");

				var payment = document.getElementById("payment");
				payment.classList.add("appear");

				var banner = document.getElementById("banner-content")
				banner.innerHTML = "PAYMENT"
			}

			if (target.id === "blur" || target.id === "cancel") {
				var blur = document.getElementById("blur");
				blur.classList.remove("appear");

				var payment = document.getElementById("payment");
				payment.classList.remove("appear");

				var banner = document.getElementById("banner-content")
				banner.innerHTML = "PAYMENT"
			}

			if (target.id === "pay") {
				var banner = document.getElementById("banner-content")
				banner.innerHTML = "TERIMA KASIH"
			}

			if (target.id === "base") {
				var base = document.getElementById("base")
				active = !active;
				if (active) {
					base.classList.add("uncover")
				} else {
					base.classList.remove("uncover")
				}
			}
		}, false)
	}

	randomizeImg() {
		for (let i = 0; i < images.length; i++) {
			var src = images[Math.floor(Math.random() * images.length)];

			while (src.checked) {
				src = images[Math.floor(Math.random() * images.length)];
			}

			const img = document.createElement('img');
			img.src = src.source;
			img.width = img.height = 220;

			const name = document.createElement('p');
			name.innerHTML = src.label;
			
			const price = document.createElement('h3');
			price.innerHTML = "Rp " + src.price

			const button = document.createElement('button');
			button.innerHTML = "Add to Cart";
			button.id = src.source;
			button.onclick = function() {
				const src = images.find(t => t.source === button.id)
				const base = document.querySelector("#base");

				const div = document.createElement('div');
				div.id = "cart-wrap"

				const name = document.createElement('p');
				name.innerHTML = src.label;
				
				const price = document.createElement('h3');
				price.innerHTML = "Rp " + src.price

				cart.push(src)
				base.appendChild(div)
				div.appendChild(img.cloneNode(true))
				div.appendChild(name)
				div.appendChild(price)

				console.log(cart)
				total += src.price
				document.querySelector(".qtt").innerHTML = cart.length
				document.querySelector(".ttl").innerHTML = total
			}

			images.find(t => t === src).checked = true;

			if (i < 7) {
				this.container[i].appendChild(img)
				this.container[i].appendChild(name)
				this.container[i].appendChild(price)
				this.container[i].appendChild(button)
			} 
			else {
				this.container2[i - 7].appendChild(img)
				this.container2[i - 7].appendChild(name)
				this.container2[i - 7].appendChild(price)
				this.container2[i - 7].appendChild(button)
			}
		}
	}

	initArray() {
		images.push(
		{
			source: asparagus,
			checked: false,
			price: 10000,
			label: "Asparagus 250gr"
		},
		
		{
			source: bayamhijau,
			checked: false,
			price: 5500,
			label: "Daun Bayam 1 ikat"
		},

		{
			source: bayammerah,
			checked: false,
			price: 11900,
			label: "Daun Bayam Merah 1 ikat"
		},

		{
			source: broccoli,
			checked: false,
			price: 11500,
			label: "Brokoli 250gr"
		},

		{
			source: buncis,
			checked: false,
			price: 8500,
			label: "Sayur Buncis 250gr"
		},

		{
			source: carrot,
			checked: false,
			price: 6500,
			label: "Wortel 250gr"
		},

		{
			source: cucumber,
			checked: false,
			price: 6000,
			label: "Timun Segar 500gr"
		},

		{
			source: daunsingkong,
			checked: false,
			price: 4500,
			label: "Daun Singkong per ikat Fresh"
		},

		{
			source: kacangpanjang,
			checked: false,
			price: 8500,
			label: "Kacang Panjang 500gr"
		},

		{
			source: kangkung,
			checked: false,
			price: 4700,
			label: "Kangkung 1 ikat"
		},

		{
			source: kemangi,
			checked: false,
			price: 2000,
			label: "DAUN KEMANGI / SEGAR"
		},

		{
			source: kembangkol,
			checked: false,
			price: 18000,
			label: "Kembang Kol 500gr"
		},

		{
			source: labusiam,
			checked: false,
			price: 6500,
			label: "Sayur Labu Siam 500gr"
		},

		{
			source: leunca,
			checked: false,
			price: 5000,
			label: "Leunca 250gr"
		},

		{
			source: pakcoi,
			checked: false,
			price: 9000,
			label: "Pak coi / pakcoy 500gr"
		},

		{
			source: pare,
			checked: false,
			price: 9000,
			label: "Pare 500gr"
		},

		{
			source: sawi,
			checked: false,
			price: 4500,
			label: "Sayur Sawi Hijau 250gr"
		},

		{
			source: selada,
			checked: false,
			price: 10000,
			label: "Selada FRESH 150gr"
		},

		{
			source: seledri,
			checked: false,
			price: 3000,
			label: "Daun Seledri"
		},

		{
			source: tauge,
			checked: false,
			price: 7500,
			label: "Toge / Tauge 500gr"
		},

		{
			source: terong,
			checked: false,
			price: 6500,
			label: "Terong Ungu 500gr"
		},

		{
			source: ubiungu,
			checked: false,
			price: 8200,
			label: "Ubi Ungu 1kg"
		})
	}
}