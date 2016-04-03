function createCapsule(radius, height, subdivisionsHeight, numSegments) {
    if (radius === undefined) radius = 0.5;
    if (height === undefined) height = radius * 2;
    if (subdivisionsHeight === undefined) subdivisionsHeight = 12;
    if (numSegments === undefined) numSegments = 12;

    var positions = [];
    var normals = [];
    var uvs = [];
    var cells = [];

    function calculateRing(segments, r, y, dy) {
    	var segIncr = 1.0 / ( segments - 1 );

    	for( var s = 0; s < segments; s++ ) {
    		var x = Math.cos( (Math.PI * 2) * s * segIncr ) * r;
    		var z = Math.sin( (Math.PI * 2) * s * segIncr ) * r;

            positions.push([radius * x, radius * y + height * dy, radius * z])
            normals.push([x, y, z])

			var u = 1.0 - (s * segIncr);
			var v = 0.5 - ((radius * y + height * dy) / (2.0 * radius + height));
			uvs.push([u, v]);
    	}
    }

	var ringsBody = subdivisionsHeight + 1;
	var ringsTotal = subdivisionsHeight + ringsBody;


	var bodyIncr = 1.0 / ( ringsBody - 1 );
	var ringIncr = 1.0 / ( subdivisionsHeight - 1 );
	for( var r = 0; r < subdivisionsHeight / 2; r++ ) {
		calculateRing( numSegments, Math.sin( Math.PI * r * ringIncr), Math.sin( Math.PI * ( r * ringIncr - 0.5 ) ), -0.5 );
    }

    for( var r = 0; r < ringsBody; r++ ) {
		calculateRing( numSegments, 1.0, 0.0, r * bodyIncr - 0.5);
    }

    for( var r = subdivisionsHeight / 2; r < subdivisionsHeight; r++ ) {
		calculateRing( numSegments, Math.sin( Math.PI * r * ringIncr), Math.sin( Math.PI * ( r * ringIncr - 0.5 ) ), +0.5);
    }

	for( var r = 0; r < ringsTotal - 1; r++ ) {
		for( var s = 0; s < numSegments - 1; s++ ) {
			cells.push([
                (r * numSegments + ( s + 1 )),
			    (r * numSegments + ( s + 0 )),
    			(( r + 1 ) * numSegments + ( s + 1 ))
            ]);
            cells.push([
    			(( r + 1 ) * numSegments + ( s + 0 )),
    			(( r + 1 ) * numSegments + ( s + 1 )),
    			(r * numSegments + s)
            ])
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
