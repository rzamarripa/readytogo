
angular
  .module('FLOKsports')
  .controller('LigaActualCtrl', LigaActualCtrl);

function LigaActualCtrl($stateParams, $scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate, $ionicModal) {
	$reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  this.users = [];
  this.league = "";
  console.log($stateParams);
  this.league_id = $stateParams.id;
  this.subscribe("leagues", () =>{
    return [ {_id: this.getReactively('league_id'), active:true} ];
  });

  this.subscribe("users", () =>{
    return [ this.getCollectionReactively('users') ];
  });

  this.subscribe("leaguesUsers", ()=>{
    return [ {league_id: this.getReactively('league_id') }] 
  });

  this.helpers({
    league: function(){
      return Leagues.findOne(this.league_id);
    },
    users: function(){
      leaguesUsers = LeaguesUsers.find().fetch();
      lus = [];
      _.each(leaguesUsers, function (lu){
        lus.push(lu.user_id);
      });
      return lus;
    },
    participants: function(){
      var lus = LeaguesUsers.find({league_id: $stateParams.id}).fetch();
        _.each(lus, function (lu){
          user = Meteor.users.findOne(lu.user_id);
          if(user){
          lu.username = user.profile.name;
          if(user.profile.picture != undefined){
            lu.picture = user.profile.picture;
          }else{
            lu.picture = "images/unknown.jpg";
          }
        }
        });
      return lus;
    }
  });
  /*
  this.isOwner = function(){
    if(this.league.owner == Meteor.userId()){
      return true
    }else{
      return false
    }
  }*/
  this.linker = function(tabIndex, user_id){
        if(tabIndex == 1) {
          console.log(user_id);
            $state.go('tabs.leagues-predictions',{league_id: this.league_id, user_id: user_id,tournament_id: this.league.tournament_id});
        }
    };
  /*
	$ionicModal.fromTemplateUrl('invite.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });
  */

};