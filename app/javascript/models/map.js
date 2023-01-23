import { Hexagon } from "./hexagon";
import { Point } from "./point";

class Map {
    constructor(center, hexagonRadius, size) {
        this.center = center;
        this.hexagonRadius = hexagonRadius;
        this.size = size;
        this.#generateUnitVectors(hexagonRadius);
        this.#generateHexagons();
    }

    update(status) {
        status.kindoms.forEach(k => {
            const color = k.color;
            const homeTownKey = [k.home_town.q, k.home_town.r];
            this.hexagons[homeTownKey].color = color;
            this.hexagons[homeTownKey].soldierNum = k.home_town.soldiers.length;
            this.hexagons[homeTownKey].type = 'HomeTown';
            k.battle_fields.forEach(bf => {
                const battleFieldKey = [bf.q, bf.r];
                this.hexagons[battleFieldKey].color = color;
                this.hexagons[battleFieldKey].soldierNum = bf.soldiers.length;
                this.hexagons[battleFieldKey].type = 'BattleField';
            })
        });
    }

    #generateUnitVectors(hexagonRadius) {
        const angle = 2 * Math.PI / 6;
        const unit = hexagonRadius * Math.sin(angle) * 2;
        this.vectorQ = new Point(1, 0).multiply(unit);
        this.vectorR = new Point(Math.cos(angle), Math.sin(angle)).multiply(unit);
    }

    #generateHexagons() {
        this.hexagons = {};
        for (let r = -this.size; r <= this.size; r++) {
            for (let q = -this.size; q <= this.size; q++) {
                const s = 0 - r - q;
                if (Math.abs(r) + Math.abs(q) + Math.abs(s) > 2*this.size) continue;
                const offsetVector = this.vectorR.multiply(r).add(this.vectorQ.multiply(q))
                const hexagon = new Hexagon(r, q, this.center.add(offsetVector), this.hexagonRadius);
                const key = [q, r]
                this.hexagons[key] = hexagon;
            }
        }
    }
}

export { Map }