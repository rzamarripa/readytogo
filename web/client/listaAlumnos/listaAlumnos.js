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
			return [{_id: $stateParams.grupo_id,estatus: true }]
	});
    
  this.subscribe('movimientos', () => {
	  return [{ grupo_id : $stateParams.grupo_id, fechaSolicitud : { $gte : this.fechaInicio, $lt : this.fechaFin}}]
  });
  	
  this.helpers({
  	grupo : () => {
		  return Grupos.findOne();
	  },
	  movimientos : () => {
		  return Movimientos.find();
	  },
	  /*
	  movimientosAlumnos : () => {
			if(mov.ready()){
				
				_.each(rc.movimientos, function(movimiento){
					console.log(movimiento);
					for (i=0;i<rc.grupo.alumnos.length;i++)
					{
						if(gpo.ready())
						{
							if (movimiento.alumno_id == rc.grupo.alumnos[i]._id)
							{
									console.log(rc.grupo.alumnos[i]._id);
									movimiento.nombreCompleto = rc.grupo.alumnos[i].nombre + " " + rc.grupo.alumnos[i].apPaterno + " " + rc.grupo.alumnos[i].apMaterno;
									break;
							}
						}	
					}
				})
			}
			
		}
		*/
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