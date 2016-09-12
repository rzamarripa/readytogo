angular
.module("verificaciones")
.controller("GruposCtrl", GruposCtrl);
function GruposCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumnos = [];
  this.al = {};
  
	this.subscribe('alumnos',()=>{
			return [{estatus: true}]
	});
	
	this.subscribe('usuarios',()=>{
		return [{"profile.estatus": true, roles: ["Maestro"]}]
	});
	
	this.subscribe('alumnos',()=>{
		return [{estatus : true}]
	});
	
	this.subscribe('grupos',()=>{
			return [{estatus: true}]
	});
	

  this.helpers({
	  alumnosTotales : () => {
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
			grupo.alumnos = angular.copy(this.alumnos);
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
	    this.alumnos = angular.copy(this.grupo.alumnos);
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
			grupo.alumnos = angular.copy(this.alumnos);
			Grupos.update({_id:idTemp},{$set:grupo});
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
	
	this.getMaestro= function(id){
		  var maestro = Meteor.users.findOne({_id:id});
			if (maestro)
				 return maestro.profile.nombre + ' ' + maestro.profile.apPaterno + ' ' + maestro.profile.apMaterno;
	};
	
	this.AgregarAlumno = function(alumno){
			console.log(JSON.parse(alumno));
			this.alumnos.push(JSON.parse(alumno));
			this.al = {};
	};
	
	
	
};