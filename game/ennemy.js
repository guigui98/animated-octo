var Ennemy = function(name, color, position) {

    this.name = name;
    this.position = position;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
        });

    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    //this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction+(3*Math.PI/2));
};

Ennemy.prototype.dead = function () {
    this.graphic.position.z = this.graphic.position.z-0.1;
        //Nettoyage de la div container
        $("#ennemy").html("");
       // jQuery('#'+this.name+' >.life').text("Tu es mort !");
       // init();
}



