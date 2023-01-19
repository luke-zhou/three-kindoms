import { Hexagon } from "./hexagon";
import { Point } from "./point";

class Map {
    vectorR = new Point(1, 0);
    constructor(center, hexagonRadius, size) {
        this.center = center;
        this.hexagonRadius = hexagonRadius;
        this.size = size;
        this.#generateUnitVectors(hexagonRadius);
        this.#generateHexagons();
        this.#setupHomeCells(size, this.hexagons);
    }

    #setupHomeCells(size, hexagons) {
        this.homeA = hexagons.find(h => h.r == 0 && h.q == -size);
        this.homeA.color = '#FF0000';
        this.homeB = hexagons.find(h => h.r == -size && h.q == size);
        this.homeB.color = '#FFFF00';
        this.homeC = hexagons.find(h => h.r == size && h.q == 0);
        this.homeC.color = '#0000FF';
    }

    #generateUnitVectors(hexagonRadius) {
        const angle = 2 * Math.PI / 6;
        const unit = hexagonRadius * Math.sin(angle) * 2;
        this.vectorQ = new Point(1, 0).multiply(unit);
        this.vectorR = new Point(Math.cos(angle), Math.sin(angle)).multiply(unit);
    }

    #generateHexagons() {
        this.hexagons = [];
        for (let r = -this.size; r <= this.size; r++) {
            for (let q = -this.size; q <= this.size; q++) {
                const s = 0 - r - q;
                if (Math.abs(r) + Math.abs(q) + Math.abs(s) > 2*this.size) continue;
                const offsetVector = this.vectorR.multiply(r).add(this.vectorQ.multiply(q))
                const hexagon = new Hexagon(r, q, this.center.add(offsetVector), this.hexagonRadius);
                this.hexagons.push(hexagon);
            }
        }
    }
}

export { Map }