angular
.module("verificaciones")
.controller("GruposMaestroCtrl", GruposMaestroCtrl);
function GruposMaestroCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.al = {};
  
	this.subscribe('grupos',()=>{
			return [{estatus: true, maestro_id : Meteor.userId()}]
	});
	

  this.helpers({
	  grupos : () => {
		  return Grupos.find();
	  },
  });
  	
	
	
};