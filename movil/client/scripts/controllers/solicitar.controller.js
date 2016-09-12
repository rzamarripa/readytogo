
angular
  .module('FLOKsports')
  .controller('SolicitarCtrl', SolicitarCtrl);
 
function SolicitarCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal) {
	$reactive(this).attach($scope);
	
	var start = new Date();
	start.setHours(0,0,0,0);

	var end = new Date();
	end.setHours(23,59,59,999);

	this.subscribe('alumnos',()=>{
			return [{_id :{$in:Meteor.user().profile.hijos_id}}]
	});
	this.subscribe('movimientos',()=>{
			return [{
						_id :{$in:Meteor.user().profile.hijos_id},
						fechaSolicitud:{$gte:start,$lte:end}
					}];
	});
	this.helpers({
		alumnos : () => {
			return Alumnos.find({_id :{$in:Meteor.user().profile.hijos_id}});
		},
		movimientos: ()=>{
			return Movimientos.find();
		}
 	});
	this.estado = function(alumno){
		//console.log(this.movimientos);
		var mov = Movimientos.findOne({alumno_id:alumno._id});
		if(!mov)
			return 'Sin Solicitar';
	}
	this.solicitado = function(alumno){
		var mov = Movimientos.findOne({alumno_id:alumno._id});
		if(!mov)
			return false;
		return mov.estatus==1;
	}

  

 
}