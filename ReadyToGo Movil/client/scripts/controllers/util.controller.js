angular
  .module('FLOKsports')
  .controller('UtilCtrl as util', function LoginCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);

	this.formatParams =function (params){
		return  Object.keys(params).map(
					function (key){
						return key+"="+params[key];
					}).join("&");
	}
  
});

