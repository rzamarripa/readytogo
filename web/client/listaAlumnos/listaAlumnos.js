angular
.module("verificaciones")
.controller("listaAlumnosCtrl", listaAlumnosCtrl);
function listaAlumnosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumnos_id = [];
  this.grupo = {};
  this.fechaInicio = new Date();
	this.fechaInicio.setHours(0,0,0,0);
	this.fechaFin = new Date();
	this.fechaFin.setHours(23,0,0,0);
  
  
	this.subscribe('grupos',()=>{
			return [{estatus: true, _id: $stateParams.grupo_id }]
	});
    
  this.subscribe('movimientos', () => {
	  console.log(this.fechaInicio, this.fechaFin);
	  return [{ fechaSolicitud : { $gte : this.fechaInicio, $lt : this.fechaFin}, grupo_id : $stateParams.grupo_id}]
  });
  	
  this.helpers({
  	grupo : () => {
		  return Grupos.findOne();
	  },
	  movimientos : () => {
		  return Movimientos.find();
	  }
  });
  
  this.nuevo = true;  
  this.nuevoGrupo = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.grupo = {}; 
  };
		
	this.cambiarEstatus = function(movimiento_id, estatus)
	{	
		if(estatus == 3){
			console.log("entregado");
			Movimientos.update({_id:movimiento_id}, {$set : {estatus : estatus, fechaEnvio : new Date()}});
		}else if(estatus == 2){
			console.log("devuelto");
			Movimientos.update({_id:movimiento_id}, {$set : {estatus : estatus, fechaDevuelto : new Date()}});
		}
	};
	
	this.getAlumno = function(alumno_id){
		var alumnoSeleccionado = "";
	  _.each(rc.grupo.alumnos, function(alumno){
		  if (alumno_id == alumno._id){
			  alumnoSeleccionado = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		  }
	  });
		return alumnoSeleccionado;
	};
		
};