// https://www.redblobgames.com/grids/hexagons/
import { Point } from "./point";

class Hexagon {
    constructor(r, q, center, radius) {
        this.r = r;
        this.q = q;
        this.s = -q - r;
        this.center = center;
        this.radius = radius;
        this.#generateVertexes();
        this.color = 'WHITE';
        this.soldierNum = 0;
        this.type = 'BattleField';
      }

    #generateVertexes() {
        const angle = 2 * Math.PI / 6;
        this.vertexes = [...Array(6).keys()].map( i => {
            const vertexX = this.center.x + this.radius * Math.cos(angle * i + 2 * Math.PI / 4);
            const vertexY = this.center.y + this.radius * Math.sin(angle * i + 2 * Math.PI / 4);
            return new Point(vertexX, vertexY);
        });
    }
}


export { Hexagon }