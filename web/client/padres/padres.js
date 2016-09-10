angular
.module("verificaciones")
.controller("PadresCtrl", PadresCtrl);
function PadresCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);
	this.hijos_id = [];
	
  this.action = true;
	this.subscribe('usuarios',()=>{
			return [{}]
	});
	
	this.subscribe('alumnos',()=>{
			return [{estatus: true}]
	});
	
  this.helpers({
	  usuarios : () => {
		  return Meteor.users.find({roles: ["Padres"]});
	  },
	  alumnos : () => {
		  return Alumnos.find();
	  }
  });
  
  this.nuevo = true;  
  this.nuevoPadre = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.hijos_id = [];
		  this.padre = {}; 
  };
 
	this.guardar = function(padre,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
						
			padre.profile.estatus = true;
			padre.profile.hijos_id = angular.copy(this.hijos_id);
			Meteor.call('createUsuario', padre, 'Padres')
			toastr.success('Guardado correctamente.');
			this.padre = {};
			this.hijos_id = [];
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
			$state.go('root.padres');
		
	};
	
	this.editar = function(id)
	{	
			console.log(id);
	    this.padre = Meteor.users.findOne({_id:id});
	    console.log(this.padre);
	    this.hijos_id = angular.copy(this.padre.profile.hijos_id);
			this.action = false;
			$('.collapse').collapse('show');
			this.nuevo = false;
	};
	
	this.actualizar = function(padre,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			
			Meteor.call('updateUsuario', padre, 'Padres');
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	    $state.go('root.padres');
	};
		
	this.cambiarEstatus = function(id)
	{
			var padre = Meteor.users.findOne({_id:id});
			if(padre.profile.estatus == true)
				padre.profile.estatus = false;
			else
				padre.profile.estatus = true;
			
			
			Meteor.call('updateUsuario', padre, 'Padres');

	};

	this.tomarFoto = function(){
			$meteor.getPicture().then(function(data){
			rc.padre.profile.fotografia = data;
		});
	};
	
	this.AgregarAlumno = function(padre){
			this.hijos_id.push(padre.hijo_id);
			console.log(this.hijos_id);
	};
	
	this.getAlumno = function(id){
		  var alumno = Alumnos.findOne({_id:id});
			if (alumno)
				 return alumno.nombre + ' ' + alumno.apPaterno + ' ' + alumno.apMaterno;
	};
	
};