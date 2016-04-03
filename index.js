function createCapsule(radius, height, N) {
    if (radius === undefined) radius = 1.0;
    if (height === undefined) height = radius/0.5;
    if (N === undefined) N = 32;

    var positions = [];
    var normals = [];
    var uvs = [];
    var cells = [];

    var i, j;
    var i1, i2, i3, i4;
    var theta, phi;
    var x, y, z, nx, ny, nz, u, v;

    var PI    = Math.PI;
    var TWOPI = Math.PI * 2;
    var PID2  = Math.PI / 2;

	for (j=0; j<=N/4; j++) { // top cap
		for (i=0; i<=N; i++) {
			theta = i * TWOPI / N;
			phi = -PID2 + PI * j / (N/2);
			x = radius * Math.cos(phi) * Math.cos(theta);
			y = radius * Math.cos(phi) * Math.sin(theta);
			z = radius * Math.sin(phi);
			nx = x;
   	        ny = y;
   	        nz = z;
			z -= height/2;
			positions.push([x, z, y]);
            normals.push([nx, ny, nz]);
		}
	}
    for (j=N/4; j<=N/2; j++) { // bottom cap
        for (i=0; i<=N; i++) {
            theta = i * TWOPI / N;
            phi = -PID2 + PI * j / (N/2);
            x = radius * Math.cos(phi) * Math.cos(theta);
            y = radius * Math.cos(phi) * Math.sin(theta);
            z = radius * Math.sin(phi);
            nx = x;
            ny = y;
            nz = z;
            z += height/2;
            positions.push([x, z, y]);
            normals.push([nx, ny, nz]);
        }
    }

    // Calculate texture coordinates
    for (i=0; i<positions.length; i++) {
        u = Math.atan2(positions[i][2], positions[i][0]) / TWOPI;
        if (u < 0)
            u = 1 + u;
        v = 0.5 + Math.atan2(positions[i][1], Math.sqrt(positions[i][0] * positions[i][0] + positions[i][2] * positions[i][2])) / PI;
        uvs.push([u, v]);
    }

    console.log(uvs)

    for (j=0; j<=N/2; j++) {
        for (i=0; i<=N; i++) {
            i1 =  j    * (N+1) + i       + 1;
            i2 =  j    * (N+1) + (i + 1) + 1;
            i3 = (j+1) * (N+1) + (i + 1) + 1;
            i4 = (j+1) * (N+1) + i       + 1;
            cells.push([i1, i2, i3])
            cells.push([i1, i3, i4])
        }
    }

    return {
        positions: positions,
        normals: normals,
        uvs: uvs,
        cells: cells
    }
}

module.exports = createCapsule;
