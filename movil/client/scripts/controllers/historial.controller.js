
angular
  .module('FLOKsports')
  .controller('HistorialCtrl', HistorialCtrl);
 
function HistorialCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal, $ionicHistory) {
  $reactive(this).attach($scope);
   this.subscribe('alumnos',()=>{
			return [{_id :{$in:Meteor.user() && Meteor.user().profile  && Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]}}]
	});
   this.subscribe('movimientos',()=>{
			return [{
						alumno_id :{$in:Meteor.user() && Meteor.user().profile  && Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]}
					}];
	});
    

    this.helpers({
		
		movimientos : () => {

			return Movimientos.find({},{sort: {fechaSolicitud: -1}});
		}
 	});
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

 	this.getAlumno = function(alumno_id){
	 	var alumno = Alumnos.findOne({_id : alumno_id})
	 	//console.log(alumno_id,alumno);
	 	if(alumno){
	 		return alumno;
	 	}
	 	return {};
 	}
  
}
