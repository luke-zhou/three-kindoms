import { Controller } from "@hotwired/stimulus"
import { Point } from "../models/point.js"
import { Hexagon } from "../models/hexagon.js"
import { Map } from "../models/map.js";
import Rails from 'rails-ujs'


export default class extends Controller {
    #ctx;
    #map;
    #mapSize = 3;

    static targets = ["worldID", "canvas"];

    #colors = {
        'RED': '#FF0000',
        'YELLOW': '#FFFF00',
        'BLUE': '#0000FF',
        'WHITE': '#FFFFFF'
    }

    connect() {
        console.log('connect');
        const canvas = this.canvasTarget
        this.#ctx = canvas.getContext("2d");
        const hexagonRadius = this.#calcR(canvas);
        const center = new Point(canvas.width / 2, canvas.height / 2);
        this.#map = new Map(center, hexagonRadius, this.#mapSize);
        this.#updateMap(this.worldIDTarget.value, this.#map);
        // console.log(result);
        // this.#drawMap(map);
    }

    move() {
        fetch(`/worlds/${this.worldIDTarget.value}`, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": Rails.csrfToken()
              }
        })
        .then(response => response.json())
        // .then(r => console.log(r))
        .then(r => this.#map.update(r))
        .then(_ => this.#drawMap(this.#map));
    }

    #updateMap(worldID, map) {
        fetch(`/worlds/${worldID}`)
        .then(response => response.json())
        // .then(r => console.log(r))
        .then(r => map.update(r))
        .then(_ => this.#drawMap(map));
    }

    #calcR(canvas) {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        return Math.floor(Math.min(x, y) / (this.#mapSize * 2 + 1) / 10) * 10;
    }

    #drawMap(map) {
        this.#ctx.clearRect(0, 0, this.#ctx.width, this.#ctx.height);
        console.log(map);
        for (const [_, hexagon] of Object.entries(map.hexagons)) {
            this.#drawHexagon(hexagon);
          }
    }

    #drawHexagon(hexagon) {
        const hexagonPath = new Path2D();
        hexagon.vertexes.forEach(v => hexagonPath.lineTo(v.x, v.y));
        hexagonPath.closePath();
        this.#ctx.stroke(hexagonPath);
        const text = hexagon.type =='HomeTown' ? `H:${hexagon.soldierNum}` : (hexagon.soldierNum > 0 ? hexagon.soldierNum : '');
        this.#ctx.fillStyle = this.#colors[hexagon.color];
        this.#ctx.fill(hexagonPath);

        this.#ctx.font = "20px Arial";
        const measure = this.#ctx.measureText(text);
        this.#ctx.fillStyle = "black";
        const textX = hexagon.center.x-measure.width/2;
        const textY = hexagon.center.y+measure.actualBoundingBoxAscent/2;
        this.#ctx.fillText(text, textX, textY);
        //display q,r
        // this.#ctx.fillText(`${hexagon.q}`, hexagon.center.x-hexagon.radius/2, hexagon.center.y-hexagon.radius/2);
        // this.#ctx.fillText(`${hexagon.r}`, hexagon.center.x+hexagon.radius/2, hexagon.center.y);
    }
}

