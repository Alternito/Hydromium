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
import zucchini from "../../../resources/res/textures/zucchini.jpg"

export default class Home {
	constructor() {
		this.container = document.querySelectorAll(".item-wrapper")
		this.images = [];
		this.initArray();
		this.randomizeImg();
	}

	randomizeImg() {
		for (let i = 0; i < this.container.length; i++) {
			const src = this.images[Math.floor(Math.random() * this.images.length)];

			const img = document.createElement('img');
			img.src = src.source;
			img.width = img.height = 220;

			const name = document.createElement('p');
			name.innerText = src.label;
			
			const price = document.createElement('h3');
			price.innerText = src.price;

			this.container[i].appendChild(img)
			this.container[i].appendChild(name)
			this.container[i].appendChild(price)
		}
	}

	initArray() {
		this.images.push(
		{
			source: asparagus,
			price: "Rp 10.000",
			label: "Asparagus 250gr"
		},
		
		{
			source: bayamhijau,
			price: "Rp 5.500",
			label: "Daun Bayam 1 ikat"
		},

		{
			source: bayammerah,
			price: "Rp 11.900",
			label: "Daun Bayam Merah 1 ikat"
		},

		{
			source: broccoli,
			price: "Rp 11.500",
			label: "Brokoli 250gr"
		},

		{
			source: buncis,
			price: "Rp 8.500",
			label: "Sayur Buncis 250gr"
		},

		{
			source: carrot,
			price: "Rp 6.500",
			label: "Wortel 250gr"
		},

		{
			source: cucumber,
			price: "Rp 6.000",
			label: "Timun Segar 500gr"
		},

		{
			source: daunsingkong,
			price: "Rp 4.500",
			label: "Daun Singkong per ikat Fresh"
		},

		{
			source: kacangpanjang,
			price: "Rp 8.500",
			label: "Kacang Panjang 500gr"
		},

		{
			source: kangkung,
			price: "Rp 4.700",
			label: "Kangkung 1 ikat"
		},

		{
			source: kemangi,
			price: "Rp 2.000",
			label: "DAUN KEMANGI / SEGAR"
		},

		{
			source: kembangkol,
			price: "Rp 18.000",
			label: "Kembang Kol 500gr"
		},

		{
			source: labusiam,
			price: "Rp 6.500",
			label: "Sayur Labu Siam 500gr"
		},

		{
			source: leunca,
			price: "Rp 5.000",
			label: "Leunca 250gr"
		},

		{
			source: pakcoi,
			price: "Rp 9.000",
			label: "Pak coi / pakcoy 500gr"
		},

		{
			source: pare,
			price: "Rp 9.000",
			label: "Pare 500gr"
		},

		{
			source: sawi,
			price: "Rp 4.500",
			label: "Sayur Sawi Hijau 250gr"
		},

		{
			source: selada,
			price: "Rp 10.000",
			label: "Selada FRESH 150gr"
		},

		{
			source: seledri,
			price: "Rp 3.000",
			label: "Daun Seledri"
		},

		{
			source: tauge,
			price: "Rp 7.500",
			label: "Toge / Tauge 500gr"
		},

		{
			source: terong,
			price: "Rp 6.500",
			label: "Terong Ungu 500gr"
		},

		{
			source: ubiungu,
			price: "Rp 8.200",
			label: "Ubi Ungu 1kg"
		},

		{
			source: zucchini,
			price: "Rp 10.000",
			label: "Zucchini 500gr"
		})
	}
}