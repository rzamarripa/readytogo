angular
  .module('FLOKsports')
  .controller('BankCtrl', BankCtrl);
 
function BankCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
	
  this.subscribe("packs");
  
  this.helpers({
    packs: function(){
      return Packs.find({},{sort: {credits: 1}}).fetch();
    }
  });

  this.buy = function(pack){
    user = Meteor.users.findOne();
    if(user.profile.credits != undefined){
      user.profile.credits += parseInt(pack.credits);
    }else{
      user.profile.credits = parseInt(pack.credits);
    };
    Meteor.users.update({_id: user._id}, {$set:{profile: user.profile}}, function (err) {
      if(!err){
        $ionicPopup.alert({
          title: 'Compra exitosa',
          template: 'La compra se realizó correctamente',
          okType: 'button-positive button-clear'
        });
      };
    });
  }
}