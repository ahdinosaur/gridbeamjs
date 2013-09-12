/*
 *  GridBeam library for three.js and ThreeCSG
 *  Copyright (C) 2013 Michael Williams
 *
 *  License: LGPL 2.1 or later
*/

// zBeam(length) - create a vertical beatbeam strut 'length' long
// xBeam(length) - create a horizontal beatbeam strug along the X axis
// yBeam(length) - create a horizontal beatbeam strut along the Y axis
// translateBeam(beam, [x, y, z]) - translate beatbeam struts in X, Y, or Z axes in units 'beam_width'

cylresolution=16;
beam_width=10;
hole_radius=2.4;

// options are
// position, scale, rotation

var stick = function(length) {
    var geometry = new THREE.CubeGeometry(
        beam_width, beam_width, length * beam_width);
    var mesh = new THREE.Mesh(geometry);
    mesh.translateX(beam_width / 2);
    mesh.translateY(beam_width / 2);
    mesh.translateZ((length * beam_width) / 2);
    return mesh;
}

var hole = function() {
    var geometry = new THREE.CylinderGeometry(
        hole_radius,
        hole_radius,
        beam_width + 2,
        cylresolution
    );
    var mesh = new THREE.Mesh(geometry);
    
    return mesh;
}

var xHole = function (i) {
    mesh = hole();
    mesh.translateX(beam_width / 2);
    mesh.translateY(beam_width / 2);
    mesh.translateZ((beam_width / 2) + (i * beam_width));
    /* {
        start: [-1, beam_width/2, i*beam_width + beam_width/2],
        end: [beam_width+1, beam_width/2, i*beam_width + beam_width/2],
        radius: hole_radius,
        resolution: cylresolution
    } );*/
    return mesh;
}

var yHole = function (i) {
    mesh = hole();
    mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    mesh.translateX( beam_width / 2);
    mesh.translateY( - beam_width / 2);
    mesh.translateZ((beam_width / 2) + i * beam_width);
    /*return cylinder( {
        start: [beam_width/2, -1, i*beam_width + beam_width/2],
        end: [beam_width/2, beam_width+1, i*beam_width + beam_width/2],
        radius: hole_radius,
        resolution: cylresolution
    } );*/
    return mesh;
}

zBeam = function (length) {
    var stick_bsp = new ThreeBSP(stick(length));

    for (var i = 0; i < length; i++) {
        stick_bsp = stick_bsp.subtract(new ThreeBSP(xHole(i)));
        stick_bsp = stick_bsp.subtract(new ThreeBSP(yHole(i)));
    }
    beam = stick_bsp.toMesh(new THREE.MeshBasicMaterial({
        shading: THREE.SmoothShading,
        map: THREE.ImageUtils.loadTexture('img/douglas_fir.jpg')
    }));
    //var holes = [];
    //for (var i = 0; i < length; i++)
    //{
    //    holes.push(xHole(i));
    //    holes.push(yHole(i)); 
    //}
    //var beam = cube.subtract(holes);
    //mesh.position = THREE.Vector3.apply(options.position);
    //mesh.rotation = THREE.Vector3.apply(options.rotation);
    beam.geometry.computeVertexNormals();
    return beam;
}