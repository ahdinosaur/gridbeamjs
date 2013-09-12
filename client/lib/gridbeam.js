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

var stick = function() {
    var geometry = new THREE.CubeGeometry(
        beam_width, beam_width, beam_width);
    var mesh = new THREE.Mesh(geometry);
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

var xHole = function () {
    mesh = hole();
    return mesh;
}

var yHole = function () {
    mesh = hole();
    mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    return mesh;
}

var pieceGeometry = function() {
    var bsp = new ThreeBSP(stick());
    bsp = bsp.subtract(new ThreeBSP(xHole()));
    bsp = bsp.subtract(new ThreeBSP(yHole()));
    var geometry = bsp.toGeometry();
    geometry.computeVertexNormals();
    return geometry;
}();
var pieceMaterial = new THREE.MeshBasicMaterial({
    shading: THREE.SmoothShading,
    map: THREE.ImageUtils.loadTexture('img/douglas_fir.jpg')
});

var piece = function(i) {
    var mesh = new THREE.Mesh(pieceGeometry, pieceMaterial);
    mesh.translateX(beam_width / 2);
    mesh.translateY(beam_width / 2);
    mesh.translateZ((beam_width / 2) + (i * beam_width));
    return mesh
}

zBeam = function (length) {
    var pole = new THREE.Object3D();

    for (var i = 0; i < length; i++) {
        pole.add(piece(i));
    }
    return pole;
}