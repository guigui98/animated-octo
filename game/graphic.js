function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);
    
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(50, 0), 0);
    scene.add(player1.graphic);
    //add
   /* for (let i = 0; i < 5; i++)
    {
        let posX = Math.floor(Math.random() * WIDTH);
        while (posX == player1.graphic.position.x)
        {
            posX = Math.floor(Math.random() * WIDTH);
        }
        let posY = Math.floor(Math.random() * HEIGHT);
        while (posY == player1.graphic.position.y)
        {
            posX = Math.floor(Math.random() * HEIGHT);
        }
        ennemy = new Ennemy("ennemy"+ i, 0xffff00, new THREE.Vector2(posX, posY), 6);
        scene.add(ennemy.graphic);
    }*/
    //ennemy = new Ennemy("ennemy", 0xffff00, new THREE.Vector2(10, 30));
    //scene.add(ennemy.graphic);
    //ennemy2 = new Ennemy("ennemy2", 0xffff00, new THREE.Vector2(70, 30));
    //scene.add(ennemy2.graphic);
    //end


    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);
    color = colors[Math.floor(Math.random()*colors.length)];
    while (color === (0x000000))
    {
        color = colors[Math.floor(Math.random()*colors.length)];
    }
    tmpGround = new THREE.Mesh(
    new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
    new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));        
    tmpGround.position.x = 60;
    tmpGround.position.y = 0;
    scene.add(tmpGround);
    //end

    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
            if (x === 60 && y === 0)
            {
                noGround.push([x, y]);
            }
            else if (0x000000 != color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
                noGround.push([x, y]);
        }
    }
}

function Light(name, color, position)
{
   // pointLight = new THREE.PointLight(color, 50, 350);
    pointLight = new THREE.PointLight(color, HEIGHT, WIDTH);
    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
