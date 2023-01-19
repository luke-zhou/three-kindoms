import { Controller } from "@hotwired/stimulus"
import { Point } from "../models/point.js"
import { Hexagon } from "../models/hexagon.js"
import { Map } from "../models/map.js";


export default class extends Controller {
    #ctx;
    #mapSize = 3;

    connect() {
        const canvas = this.element
        this.#ctx = canvas.getContext("2d");
        const r = this.#calcR(canvas);
        const p = new Point(canvas.width / 2, canvas.height / 2);
        const map = new Map(p, r, this.#mapSize);
        console.log(map.hexagons);
        this.#drawMap(map);
    }

    #calcR(canvas) {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        return Math.floor(Math.min(x, y) / (this.#mapSize*2 + 1) / 10) * 10;
    }

    #drawMap(map) {
        map.hexagons.forEach(h => this.#drawHexagon(h));
    }

    #drawHexagon(hexagon) {
        const hexagonPath = new Path2D();
        hexagon.vertexes.forEach(v => hexagonPath.lineTo(v.x, v.y));
        hexagonPath.closePath();
        this.#ctx.stroke(hexagonPath);
        this.#ctx.fillStyle = hexagon.color;
        this.#ctx.fill(hexagonPath);

        //display q,r
        // this.#ctx.fillText(`${hexagon.q}`, hexagon.center.x-hexagon.radius/2, hexagon.center.y-hexagon.radius/2);
        // this.#ctx.fillText(`${hexagon.r}`, hexagon.center.x+hexagon.radius/2, hexagon.center.y);
    }
}

