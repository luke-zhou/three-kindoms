import { Controller } from "@hotwired/stimulus"
import { Point } from "../models/point.js"
import { Hexagon } from "../models/hexagon.js"


export default class extends Controller {
    #ctx;
    #mapSize = 7;

    connect() {
        const canvas = this.element
        this.#ctx = canvas.getContext("2d");
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const r = this.#calcR(x, y);
        const p = new Point(150, 150);
        const hexagon = new Hexagon(0,0, p, 50);
        this.#drawHexagon(hexagon)
        // this.#drawMap(x, y, r);
    }

    #calcR(x, y) {
        return Math.floor(Math.min(x, y) / this.#mapSize / 10) * 10;
    }

    #drawMap(x, y, r) {
        const angle = 2 * Math.PI / 6;
        this.#drawHexagon(x, y, r);
        const unit = 2 * r * Math.sin(angle);
        const vectorI = [unit, 0];
        const vectorJ = [unit * Math.cos(angle), unit * Math.sin(angle)];
        const vectorK = [-unit * Math.cos(angle), unit * Math.sin(angle)];
        // for (let i = -1; i <= 1; i++) {
        //     for (let j = -1; j <= 1; j ++){
        //         const k = 0 - i - j;
        //         if (Math.abs(k) > 1) {
        //             continue;
        //         }
        //         console.log(i,j,k);
        //         const pX = vectorI[0]*i + vectorJ[0] * j + vectorK[0] * k + x;
        //         const pY = vectorI[1]*i + vectorJ[1] * j + vectorK[1] * k + y;
        //         this.#drawHexagon(pX, pY, r);
        //     }
        //     // break;
        // }
        console.log(vectorI,vectorJ,vectorK);
        const i = 0;
        const j = 1;
        const k = 1;
        console.log(i,j,k);
        const pX = vectorI[0]*i + vectorJ[0] * j + vectorK[0] * k + x;
        const pY = vectorI[1]*i + vectorJ[1] * j + vectorK[1] * k + y;
        console.log(pX, pY);
        this.#drawHexagon(pX, pY, r);
    }

    // #drawHexagon(x, y, r) {
    //     const num = 6;
    //     const angle = 2 * Math.PI / num;
    //     this.#ctx.beginPath();
    //     for (let i = 0; i < num; i++) {
    //         const vertexX = x + r * Math.cos(angle * i + 2 * Math.PI / 4);
    //         const vertexY = y + r * Math.sin(angle * i + 2 * Math.PI / 4);
    //         this.#ctx.lineTo(vertexX, vertexY);
    //     }
    //     this.#ctx.closePath();
    //     this.#ctx.stroke();
    // }

    #drawHexagon(hexagon) {
        this.#ctx.beginPath();
        hexagon.vertexes.forEach(v => this.#ctx.lineTo(v.x, v.y));
        this.#ctx.closePath();
        this.#ctx.stroke();
    }
}

