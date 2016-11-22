angular
.module("verificaciones")
.controller("AlumnosCtrl", AlumnosCtrl);
function AlumnosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {

	let rc = $reactive(this).attach($scope);

  this.action = true;
	this.subscribe('alumnos',()=>{
			return [{estatus : true}]
	});
	
	this.subscribe('campus',()=>{
			return [{estatus : true}]
	});

  this.helpers({
	  alumnos : () => {
		  return Alumnos.find({});
	  },
	  campus : () => {
		  return Campus.find({});
	  },
  });
  
  this.nuevo = true;  
  this.nuevoAlumno = function()
  {
			this.action = true;
		  this.nuevo = !this.nuevo;
		  this.alumno = {}; 
  };
 
	this.guardar = function(alumno,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }				
			alumno.estatus = true;
			Alumnos.insert(alumno);
			toastr.success('Guardado correctamente.');
			this.alumno = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
			$state.go('root.alumnos');
		
	};
	
	this.editar = function(id)
	{
	    this.alumno = Alumnos.findOne({_id:id});
			this.action = false;
			$('.collapse').collapse('show');
			this.nuevo = false;
	};
	
	this.actualizar = function(alumno,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			
			var idTemp = alumno._id;
			delete alumno._id;		
			Alumnos.update({_id:idTemp},{$set:alumno});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	    $state.go('root.alumnos');
	};
		
	this.cambiarEstatus = function(id)
	{
			var alumno = Alumnos.findOne({_id:id});
			if(alumno.estatus == true)
				alumno.estatus = false;
			else
				alumno.estatus = true;
			
			Alumnos.update({_id:id}, {$set : {estatus : alumno.estatus}});
	};

	this.tomarFoto = function(){
			$meteor.getPicture().then(function(data){
			rc.alumno.fotografia = data;
		});
	};

};