
angular
  .module('FLOKsports')
  .controller('SolicitarCtrl', SolicitarCtrl);
 
function SolicitarCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal,$ionicListDelegate) {
	$reactive(this).attach($scope);
	
	var start = new Date();
	start.setHours(0,0,0,0);

	var end = new Date();
	end.setHours(23,59,59,999);

	this.subscribe('alumnos',()=>{
			return [{_id :{$in:Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]}}]
	});
	this.subscribe('grupos',()=>{
			return [{estatus:true}]
	});
	this.subscribe('movimientos',()=>{
			return [{
						alumno_id :{$in:Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]},
						fechaSolicitud:{$gte:start,$lte:end}
					}];
	});
	this.helpers({
		alumnos : () => {
			return Alumnos.find({_id :{$in:Meteor.user().profile.hijos_id? Meteor.user().profile.hijos_id:[]}});
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
		switch(mov.estatus){
			case 1:
			case 2:
				return "Solicitado";
			case 3:
				return "Enviado";
			case 4:
				return "Solicitud Cancelada";

		}
		return 'Sin Solicitar';
	}
	this.solicitado = function(alumno){
		var mov = Movimientos.findOne({alumno_id:alumno._id});
		if(!mov)
			return false;
		return mov.estatus==1;
	}
	this.cancelar = function(alumno,slidingItem){
		console.log("cancelar")
		var mov = Movimientos.findOne({alumno_id:alumno._id});
		if(mov){
			Movimientos.update({_id:mov._id}, {$set : {estatus : 4,fechaCancelacion:new Date()}});
		}
		$ionicListDelegate.closeOptionButtons();
	}
	this.solicitar = function(alumno){
		var mov = Movimientos.findOne({alumno_id:alumno._id});
		console.log("solicitar")

		if(!mov){
			var grupo =Grupos.findOne({alumnos :{"$elemMatch":{_id:alumno._id}}});
			var movimiento = {
				alumno_id:alumno._id,
				estatus:1,
				fechaDevuelto:null,
				fechaEnvio:null,
				fechaSolicitud:new Date(),
				grupo_id:grupo._id,
				estatus:1,
				maestro_id:grupo.maestro_id
			}
			Movimientos.insert(movimiento);
		}
		else if(mov.estatus==4){
			
			Movimientos.update({_id:mov._id}, {$set : {estatus : 1,fechaSolicitud:new Date()}});
		}
		
	}

  

 
}