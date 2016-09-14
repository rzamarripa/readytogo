
angular
  .module('FLOKsports')
  .controller('AccountCtrl', AccountCtrl);
 
function AccountCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal, $ionicHistory,$ionicSideMenuDelegate) {
  $reactive(this).attach($scope);
   
  this.subscribe('alumnos',()=>{
		return [{_id :{$in:Meteor.user() && Meteor.user().profile ? (Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]):[]}}]
	});
	
	this.subscribe('grupos',()=>{
			return [{estatus:true}]
	});

	this.helpers({
		miPerfil : () => {
			return Meteor.user();
		},
		alumnos : () => {
			return Alumnos.find();
		}
 	});
 	
 	this.logout = function () {
	    Meteor.logout(function(err){
	        if (err) {
	            throw new Meteor.Error("Logout failed");
	        }else{
	          	$ionicHistory.clearCache();
	        	$ionicHistory.clearHistory();
	        	$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
	        	
	          	$state.go('anon.login');
	        }
	    })
	  }
 	
 	this.tieneFoto = function(sexo, foto){
	  if(foto === undefined){
		  if(sexo === "Masculino"){
			  return "img/badmenprofile.jpeg";
			}else if(sexo === "Femenino"){
				return "img/badgirlprofile.jpeg";
			} 
	  }else{
		  return foto;
	  }
  }
}
