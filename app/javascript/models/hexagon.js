import { Point } from "./point";

class Hexagon {
    constructor(r, q, center, radius) {
        this.r = r;
        this.q = q;
        this.s = -q - r;
        this.center = center;
        this.radius = radius;
        this.vertexes = this.#calcVertexes(center, radius);
      }

    #calcVertexes(center, radius) {
        const angle = 2 * Math.PI / 6;
        return [...Array(6).keys()].map( i => {
            const vertexX = center.x + radius * Math.cos(angle * i + 2 * Math.PI / 4);
            const vertexY = center.y + radius * Math.sin(angle * i + 2 * Math.PI / 4);
            return new Point(vertexX, vertexY);
        });
    }
}


export { Hexagon }