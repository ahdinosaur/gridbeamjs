Meteor.startup(function () {
    init();
    animate();
});

function init () {
    height = $(document).height() - 50;
    width = $(document).width() - 25;
    aspect = width/height;
    near = 1;
    far = 1000;
    angle = 60;

    createRenderer = function(){
        var renderer =  new THREE.WebGLRenderer();
        renderer.setSize(width,height);
        return renderer;
    }

    createCamera = function(){
        var camera = new THREE.PerspectiveCamera(
            angle, aspect, near, far);    
        camera.position.set( beam_width * 20, beam_width * 10, beam_width * 20 );
        camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        return camera;
    }


    createScene = function(){
        var scene = new THREE.Scene();
        return scene;
    }

    createLight = function(){
        var light = new THREE.HemisphereLight(0xFFFFFF, 0x000000);
        return light;
    }

    createCube = function(){
        var cubeGeometry = new THREE.CubeGeometry(
            30,30,30);
        
        var material = 
            new THREE.MeshLambertMaterial(
                {
                    color:0xFF0000
                });
        
        var cubeMesh = new THREE.Mesh(
            cubeGeometry,material);
        
        return cubeMesh;
      
    };

    scene = createScene();
    camera = createCamera();
    light = createLight();
    renderer = createRenderer();

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    scene.add(light);
    scene.add(beam(10));
    scene.add(new THREE.AxisHelper(100));
    scene.add(new THREE.GridHelper(beam_width * 30, beam_width));
}

function animate () {
    requestAnimationFrame (animate);
    render();
    update();
}

function update () {
    controls.update();
}

function render () {
    renderer.render(scene,camera);
}

//FIXME - Unable to figure out what is happening here
//scene.add(new THREE.PointLightHelper(light));
Template.viewer.rendered = function() {
    document.getElementById('viewer').appendChild(renderer.domElement);
}