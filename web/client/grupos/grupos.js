angular
.module("verificaciones")
.controller("GruposCtrl", GruposCtrl);
function GruposCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumnos_id = [];
  this.al = {};
  
	this.subscribe('alumnos',()=>{
			return [{estatus: true}]
	});
	
	this.subscribe('usuarios',()=>{
		return [{"profile.estatus": true, roles: ["Maestro"]}]
	});
	
	this.subscribe('grupos',()=>{
			return [{estatus: true}]
	});
	

  this.helpers({
	  alumnos : () => {
		  return Alumnos.find();
	  },
	  usuarios: ()=> {
		  return Meteor.users.find({roles : ["Maestro"]});
	  },
	  grupos : () => {
		  return Grupos.find();
	  },
  });
  
  this.nuevo = true;  
  this.nuevoGrupo = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.grupo = {}; 
  };
 
	this.guardar = function(grupo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
						
			grupo.estatus = true;
			grupo.alumnos_id = angular.copy(this.alumnos_id);
			Grupos.insert(grupo);
			toastr.success('Guardado correctamente.');
			this.grupo = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
			$state.go('root.grupos');
		
	};
	
	this.editar = function(id)
	{
			//console.log(id);
	    this.grupo = Grupos.findOne({_id:id});
	    //console.log(this.grupo);
	    this.alumnos_id = angular.copy(this.grupo.alumnos_id);
			this.action = false;
			$('.collapse').collapse('show');
			this.nuevo = false;
	};
	
	this.actualizar = function(grupo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }

			var idTemp = grupo._id;
			delete grupo._id;
			grupo.alumnos_id = angular.copy(this.alumnos_id);
			Folios.update({_id:idTemp},{$set:grupo});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	};
		
	this.cambiarEstatus = function(id)
	{	
			var grupo = Grupos.findOne({_id:id});
			if(grupo.estatus == true)
				grupo.estatus = false;
			else
				grupo.estatus = true;
			
			Grupos.update({_id:id}, {$set : {estatus : grupo.estatus}});
	};
	
	this.getAlumno = function(id){
		  var alumno = Alumnos.findOne({_id:id});
			if (alumno)
				 return alumno.nombre + ' ' + alumno.apPaterno + ' ' + alumno.apMaterno;
	};
	
	this.getMaestro= function(id){
		  var maestro = Meteor.users.findOne({_id:id});
			if (maestro)
				 return maestro.profile.nombre + ' ' + maestro.profile.apPaterno + ' ' + maestro.profile.apMaterno;
	};
	
	this.AgregarAlumno = function(grupo){		
			console.log(grupo);
			this.al.alumno_id = grupo.alumno_id;
			this.al.estatus = false;
			this.alumnos_id.push(this.al);
			this.al = {};
	};
	
	
	
};