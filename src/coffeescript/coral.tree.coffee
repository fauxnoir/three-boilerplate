Coral  = Coral  || {}

Coral.Tree = -> 
  ### 
  # Coral.Tree()
  # -----------------------------------------
  # Return a procedurally generated tree mesh
  #
  # Standard scale should vary around '1' so that size is 
  # normalized acrosss Coral and the scale operator can be 
  # applied consistently
  #
  ###

  random = ( min, max ) -> Math.random() * ( max - min ) + min
      
  obj = new THREE.Object3D()

  # Colours
  coloursTrunk = [
    0x9a8261
  ]

  coloursCanopy = [
    0xaa4b2d
    0xc8b849
    0xa4a045
    0xd1cd5f
    0xb0a13b
  ]

  # Define some sizes
  hTrunk = random( 0.6, 1)
  wTrunk = 0.05

  geoTrunk = new THREE.BoxGeometry( wTrunk, hTrunk, wTrunk, 1, 3, 1)


  

  ###
  # Warp the trunk geometry a bit by modifying one 
  # heightSegment in three dimensions.
  ###

  # 0 - 7 is a vertical half of our tree
  # 8 - 16 is the second vertical half

  # 0,1 8,9
  # 2,3 10,11
  # 4,5 12,13
  # 6,7 14,15

  @offsetX = random( 0.01, 0.15 )
  @offsetZ = random( 0.01, 0.15 )
  @offsetY = random( 0.01, 0.15 )

  for v, i in geoTrunk.vertices
    vertexCount = geoTrunk.vertices.length + 1

    if i >= ( vertexCount / 4 ) - 1 && i < ( vertexCount / 4 ) + 3
      v.x += @offsetX
      v.z += @offsetZ
      v.y -= @offsetY

      # Update the related vertex in the other half of the geometry
      geoTrunk.vertices[ i + 8 ].x += @offsetX
      geoTrunk.vertices[ i + 8 ].z += @offsetZ
      geoTrunk.vertices[ i + 8 ].y -= @offsetY

  
  cpyRadius = random 0.12, 0.17

  options = {
    smoothing: 2
    radius: cpyRadius
    detail: 1
    noiseOptions: {
      amplitude: 1.0
      frequency: 2
      octaves: 1
      persistence: 0.5
    }
  }

  geoCanopy = Coral.Blob ( options )



  i = Math.floor( Math.random() * coloursTrunk.length )
  j = Math.floor( Math.random() * coloursCanopy.length )

  console.log coloursCanopy
  materialDev = new THREE.MeshBasicMaterial { color: 0xFFFFFF, wireframe: true }
  matTrunk = new THREE.MeshPhongMaterial { color: coloursTrunk[i], shading: THREE.FlatShading }
  matCanopy = new THREE.MeshPhongMaterial { color: coloursCanopy[j], shading: THREE.FlatShading }

  meshTrunk = new THREE.Mesh( geoTrunk, matTrunk )
  meshCanopy = new THREE.Mesh( geoCanopy, matCanopy )

  targetVertex = geoTrunk.vertices[0]
  meshCanopy.position.set( targetVertex.x - wTrunk / 2 , targetVertex.y + 0.05, targetVertex.z - wTrunk / 2)

  rotX = random( 0, 2 * Math.PI )
  rotY = random( 0, 2 * Math.PI )
  rotZ = random( 0, 2 * Math.PI )

  meshCanopy.rotation.set( rotX, rotY, rotZ )
  obj.add( meshTrunk, meshCanopy )

  obj.rotation.y = random 0, 2*Math.PI 

  obj
