angular
.module("verificaciones")
.controller("UsuariosCtrl", UsuariosCtrl);
function UsuariosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
	this.subscribe('usuarios',()=>{
			return [{}]
	});

  this.helpers({
	  usuarios : () => {
		  return Meteor.users.find({});
	  },
  });
  
  this.nuevo = true;  
  this.nuevoUsuario = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.usuario = {}; 
  };
 
	this.guardar = function(usuario,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
						
			usuario.profile.estatus = true;
			usuario.profile.usuarioInserto = Meteor.userId();
			Meteor.call('createUsuario', usuario, usuario.profile.tipo);
			toastr.success('Guardado correctamente.');
			this.usuario = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
			$state.go('root.usuarios');
		
	};
	
	this.editar = function(id)
	{
	    this.usuario = Meteor.users.findOne({_id:id});
			this.action = false;
			$('.collapse').collapse('show');
			this.nuevo = false;
	};
	
	this.actualizar = function(usuario,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			
			//var idTemp = usuario._id;
			//delete usuario._id;		
			usuario.profile.usuarioActualizo = Meteor.userId();
			console.log(usuario);
			//Usuarios.update({_id:idTemp},{$set:usuario});
			Meteor.call('updateUsuario', usuario, usuario.profile.tipo);
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	    $state.go('root.usuarios');
	};
		
	this.cambiarEstatus = function(id)
	{
			var usuario = Usuarios.findOne({_id:id});
			if(usuario.estatus == true)
				usuario.estatus = false;
			else
				usuario.estatus = true;
			
			Usuarios.update({_id:id}, {$set : {estatus : usuario.estatus}});
	};

	this.tomarFoto = function(){
			$meteor.getPicture().then(function(data){
			rc.usuario.fotografia = data;
		});
	};

};