class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
      }

    add(another) {
        return new Point(this.x + another.x, this.y + another.y);
    }

    multiply(scaler) {
        return new Point(this.x*scaler, this.y*scaler);
    }
}

export { Point }