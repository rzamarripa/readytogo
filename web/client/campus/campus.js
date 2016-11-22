angular
  .module('verificaciones')
  .controller('CampusCtrl', CampusCtrl);
 
function CampusCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	this.action = true;
	
	this.subscribe('campus',()=>{
		return [{}]
	});
  
  this.helpers({
		campus : () => {
		  return Campus.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoCampus = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.campu.nombre = "";
    		
  };
	
  this.guardar = function(campu,form)
	{
			if(form.$invalid){
	      toastr.error('Error al guardar los datos.');
	      return;
	    }
			
			campu.estatus = true;
			campu.usuarioInserto = Meteor.userId();
			Campus.insert(campu);
			toastr.success('Guardado correctamente.');
			campu = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			$state.go('root.campus');
			form.$setPristine();
	    form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.campu = Campus.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(campu,form)
	{
	    if(form.$invalid){
	        toastr.error('Error al actualizar los datos.');
	        return;
	    }
		 	var idTemp = campu._id;
			delete campu._id;		
			campu.usuarioActualizo = Meteor.userId(); 
			Campus.update({_id:idTemp},{$set:campu});
			toastr.success('Actualizado correctamente.');
			//console.log(ciclo);
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	};
		
	this.cambiarEstatus = function(id)
	{
			var campu = Campus.findOne({_id:id});
			if(campu.estatus == true)
				campu.estatus = false;
			else
				campu.estatus = true;
			
			Campus.update({_id:id}, {$set : {estatus : campu.estatus}});
	};	
	
	
};