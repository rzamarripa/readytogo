angular
.module("verificaciones")
.controller("MaestrosCtrl", MaestrosCtrl);
function MaestrosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  
	this.subscribe('usuarios',()=>{
			return [{}]
	});
	
	this.subscribe('campus',()=>{
			return [{estatus : true}]
	});

  this.helpers({
	  usuarios : () => {
		  return Meteor.users.find({roles: ["Maestro"]});
	  },
	  campus : () => {
		  return Campus.find({});
	  },
  });
  
  this.nuevo = true;  
  this.nuevoMaestro = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.maestro = {}; 
  };
 
	this.guardar = function(maestro,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
						
			maestro.profile.estatus = true;
			Meteor.call('createUsuario', maestro, 'Maestro');
			toastr.success('Guardado correctamente.');
			this.maestro = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
			$state.go('root.maestros');
		
	};
	
	this.editar = function(id)
	{
	    this.maestro = Meteor.users.findOne({_id:id});
			this.action = false;
			$('.collapse').collapse('show');
			this.nuevo = false;
	};
	
	this.actualizar = function(maestro,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			
			Meteor.call('updateUsuario', maestro, 'Maestro');
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	    $state.go('root.maestros');
	};
	/*
	this.cambiarEstatus = function(id)
	{
			var maestro = Usuarios.findOne({_id:id});
			if(maestro.profile.estatus == true)
				maestro.profile.estatus = false;
			else
				maestro.profile.estatus = true;
			
			Usuarios.update({_id:id}, {$set : {estatus : maestro.profile.estatus}});
	};
  */
	this.tomarFoto = function(){
			$meteor.getPicture().then(function(data){
			rc.maestro.profile.fotografia = data;
		});
	};

};