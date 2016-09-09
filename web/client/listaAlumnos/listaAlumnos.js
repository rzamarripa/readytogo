angular
.module("verificaciones")
.controller("listaAlumnosCtrl", listaAlumnosCtrl);
function listaAlumnosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumnos_id = [];
  this.grupo = "";
  
	this.subscribe('grupos',()=>{
			return [{estatus: true, maestro_id: Meteor.user() != undefined ? Meteor.user()._id : "" }]
	});
  
	this.subscribe('usuarios',()=>{
		return [{"profile.estatus": true, _id: Meteor.user() != undefined ? Meteor.user()._id : ""}]
	});
  
	this.subscribe('alumnos',()=>{
			return [{estatus: false,grupo: this.getReactively('this.grupo')}]
	});
	
	
  this.helpers({
  	grupos : () => {
		  return Grupos.findOne();
	  },
	  usuarios: ()=> {
		  return Meteor.users.findOne({_id : Meteor.user()});
	  },
	  alumnos : () => {    
	  		var grupos = Grupos.find().fetch();
	  		if (grupos[0] !== undefined)
						this.grupo = grupos[0].grupo.toString();
				
				return Alumnos.find({});
	  },
  });
  
  this.nuevo = true;  
  this.nuevoGrupo = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.grupo = {}; 
  };
		
	this.cambiarEstatus = function(id)
	{	
			var alumno = Alumnos.findOne({_id:id});
			alumno.estatus = true;
			
			Alumnos.update({_id:id}, {$set : {estatus : alumno.estatus}});
	};
	
	this.getAlumno = function(id){
		  var alumno = Alumnos.findOne({_id:id});
			if (alumno)
				 return alumno.nombre + ' ' + alumno.apPaterno + ' ' + alumno.apMaterno;
	};
		
};