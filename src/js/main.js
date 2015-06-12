var Coral, demo, renderer, rendererStats, stats;

Coral = Coral || {};

Coral.Tree = function() {

  /* 
   * Coral.Tree()
   * -----------------------------------------
   * Return a procedurally generated tree mesh
   *
   * Standard scale should vary around '1' so that size is 
   * normalized acrosss Coral and the scale operator can be 
   * applied consistently
   *
   */
  var coloursCanopy, coloursTrunk, cpyRadius, geoCanopy, geoTrunk, hTrunk, i, j, k, len, matCanopy, matTrunk, materialDev, meshCanopy, meshTrunk, obj, options, random, ref, rotX, rotY, rotZ, targetVertex, v, vertexCount, wTrunk;
  random = function(min, max) {
    return Math.random() * (max - min) + min;
  };
  obj = new THREE.Object3D();
  coloursTrunk = [0x9a8261];
  coloursCanopy = [0xaa4b2d, 0xc8b849, 0xa4a045, 0xd1cd5f, 0xb0a13b];
  hTrunk = random(0.6, 1);
  wTrunk = 0.05;
  geoTrunk = new THREE.BoxGeometry(wTrunk, hTrunk, wTrunk, 1, 3, 1);

  /*
   * Warp the trunk geometry a bit by modifying one 
   * heightSegment in three dimensions.
   */
  this.offsetX = random(0.01, 0.15);
  this.offsetZ = random(0.01, 0.15);
  this.offsetY = random(0.01, 0.15);
  ref = geoTrunk.vertices;
  for (i = k = 0, len = ref.length; k < len; i = ++k) {
    v = ref[i];
    vertexCount = geoTrunk.vertices.length + 1;
    if (i >= (vertexCount / 4) - 1 && i < (vertexCount / 4) + 3) {
      v.x += this.offsetX;
      v.z += this.offsetZ;
      v.y -= this.offsetY;
      geoTrunk.vertices[i + 8].x += this.offsetX;
      geoTrunk.vertices[i + 8].z += this.offsetZ;
      geoTrunk.vertices[i + 8].y -= this.offsetY;
    }
  }
  cpyRadius = random(0.12, 0.17);
  options = {
    smoothing: 2,
    radius: cpyRadius,
    detail: 1,
    noiseOptions: {
      amplitude: 1.0,
      frequency: 2,
      octaves: 1,
      persistence: 0.5
    }
  };
  geoCanopy = Coral.Blob(options);
  i = Math.floor(Math.random() * coloursTrunk.length);
  j = Math.floor(Math.random() * coloursCanopy.length);
  console.log(coloursCanopy);
  materialDev = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
  });
  matTrunk = new THREE.MeshPhongMaterial({
    color: coloursTrunk[i],
    shading: THREE.FlatShading
  });
  matCanopy = new THREE.MeshPhongMaterial({
    color: coloursCanopy[j],
    shading: THREE.FlatShading
  });
  meshTrunk = new THREE.Mesh(geoTrunk, matTrunk);
  meshCanopy = new THREE.Mesh(geoCanopy, matCanopy);
  targetVertex = geoTrunk.vertices[0];
  meshCanopy.position.set(targetVertex.x - wTrunk / 2, targetVertex.y + 0.05, targetVertex.z - wTrunk / 2);
  rotX = random(0, 2 * Math.PI);
  rotY = random(0, 2 * Math.PI);
  rotZ = random(0, 2 * Math.PI);
  meshCanopy.rotation.set(rotX, rotY, rotZ);
  obj.add(meshTrunk, meshCanopy);
  obj.rotation.y = random(0, 2 * Math.PI);
  return obj;
};

stats = new Stats();

stats.domElement.style.position = 'absolute';

stats.domElement.style.left = '0px';

stats.domElement.style.top = '0px';

rendererStats = new THREEx.RendererStats();

rendererStats.domElement.style.position = 'absolute';

rendererStats.domElement.style.left = '0px';

rendererStats.domElement.style.bottom = '0px';

renderer = new THREE.WebGLRenderer();

demo = Sketch.create({
  type: Sketch.WEBGL,
  element: renderer.domElement,
  context: renderer.context,
  setup: function() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.z = 2.4;
    this.scene = new THREE.Scene();
    this.objTree = Coral.Tree();
    this.light = new THREE.HemisphereLight(0xffeed1, 0x404040, 1.2);
    this.light.position.set(10, 10, 10);
    this.scene.add(this.light);
    return this.scene.add(this.objTree);
  },
  resize: function() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    return renderer.setSize(this.width, this.height);
  },
  draw: function() {
    stats.begin();
    this.objTree.rotation.y += 0.02;
    renderer.render(this.scene, this.camera);
    stats.end();
    return rendererStats.update(renderer);
  }
});

window.onload = function() {
  var gui;
  document.body.appendChild(stats.domElement);
  document.body.appendChild(rendererStats.domElement);
  return gui = new dat.GUI();
};

//# sourceMappingURL=main.js.map
