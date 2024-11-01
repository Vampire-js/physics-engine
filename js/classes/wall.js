class Wall {
    constructor(sx, sy, ex, ey, angle = 0) {
        this.start = new Vector(sx, sy);
        this.end = new Vector(ex, ey);
        this.angle = angle;
        this.pivot = new Vector((sx + ex) / 2, (sy + ey) / 2);
        this.omega = 0; // Initial angular velocity
        this.mass = 1; // Mass of the wall

        this.updateAngle(angle); // Initialize position based on angle
    }

    updateAngle(a) {
        let rotationMatrix = new Matrix(2, 2);
        rotationMatrix.data[0][0] = Math.cos(a);
        rotationMatrix.data[0][1] = Math.sin(a);
        rotationMatrix.data[1][0] = -Math.sin(a);
        rotationMatrix.data[1][1] = Math.cos(a);

        // Rotate start and end points around the pivot
        this.start = rotationMatrix.multiplyVec(this.start.sub(this.pivot)).add(this.pivot);
        this.end = rotationMatrix.multiplyVec(this.end.sub(this.pivot)).add(this.pivot);
    }

    getEdge() {
        return this.end.sub(this.start); // Vector representing the wall
    }

    getNormals() {
        const edge = this.getEdge();
        return new Vector(-edge.y, edge.x); // Normal vector
    }

    projectOnAxis(axis) {
        const points = [this.start, this.end];
        let min = Infinity;
        let max = -Infinity;

        points.forEach(point => {
            const projection = point.dot(axis);
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        });

        return { min, max };
    }

    overlaps(proj1, proj2) {
        return proj1.max >= proj2.min && proj2.max >= proj1.min;
    }

    calculateMomentOfInertia() {
        const length = this.start.sub(this.end).mag();
        return (this.mass * Math.pow(length, 2)) / 12; // Moment of inertia for a rod
    }
    getEquation(line) {
        let e = line.end;
        let s = line.start;
        let m = (e.y - s.y) / (e.x - s.x);
        let c = e.y - m * e.x;
        return { m: m, c: c };
    }

    calculateCollisionPoint(line) {
        const eq1 = this.getEquation(this);
        const eq2 = this.getEquation(line);
        
        const x = (eq1.c - eq2.c) / (eq2.m - eq1.m);
        const y = x * eq1.m + eq1.c;

        return new Vector(x, y);
    }

    collides(line) {
        const axes = [...this.getNormals(), ...line.getNormals()];

        for (const axis of axes) {
            const proj1 = this.projectOnAxis(axis);
            const proj2 = line.projectOnAxis(axis);

            if (!this.overlaps(proj1, proj2)) {
                return false; // No collision if projections do not overlap
            }
        }

        console.log("Collision Detected");

        // Calculate new angular velocities based on conservation of angular momentum
        const i1 = this.calculateMomentOfInertia();
        const i2 = line.calculateMomentOfInertia();

        const collisionPoint = this.calculateCollisionPoint(line);
        const r1 = collisionPoint.sub(this.pivot); // Distance from pivot to collision point
        const r2 = collisionPoint.sub(line.pivot); // Distance from pivot to collision point of the other wall

        const newOmega1 = ((i1 - i2) * this.omega + 2 * i2 * line.omega) / (i1 + i2);
        const newOmega2 = ((i2 - i1) * line.omega + 2 * i1 * this.omega) / (i1 + i2);

        // Assign updated angular velocities
        this.omega = newOmega1;
        line.omega = newOmega2;

        // Prevent lines from passing through each other
        const correction = this.getEdge().unit().mult(0.1); // Adjust distance as necessary
        this.start = this.start.add(correction);
        this.end = this.end.add(correction);

        const lineCorrection = line.getEdge().unit().mult(0.1); // Adjust distance as necessary
        line.start = line.start.add(lineCorrection);
        line.end = line.end.add(lineCorrection);

        return true; // Collision occurred
    }

    draw() {
        c.beginPath();
        c.moveTo(this.start.x, this.start.y);
        c.lineTo(this.end.x, this.end.y);
        c.strokeStyle = "black";
        c.stroke();
        
        this.showPivot();
        this.showEndPoints();
    }

    update(deltaTime) {
        // Update the angle cumulatively based on angular velocity and deltaTime
        this.angle = this.omega;
        this.updateAngle(this.angle);
        this.draw();
    }

    showPivot() {
        c.beginPath();
        c.arc(this.pivot.x, this.pivot.y, 3, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
    }

    showEndPoints() {
        c.beginPath();
        c.arc(this.start.x, this.start.y, 3, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();

        c.beginPath();
        c.arc(this.end.x, this.end.y, 3, 0, 2 * Math.PI);
        c.fillStyle = "black";
        c.fill();
    }
}
