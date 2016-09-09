angular
  .module('FLOKsports')
  .controller('ProfileCtrl', ProfileCtrl);
 
function ProfileCtrl($rootScope, $meteor,$scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
  let rc = $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  this.competition_id = "";
  this.leaguesUsers = [];
  this.owners = [];
  this.userId = Meteor.userId();
  this.userEdit = "";
  this.edit = false;
  
	this.subscribe("leaguesUsers", () =>{
      return [ {user_id: this.getReactively('userId')} ];
  });
  
  this.subscribe("leagues1", () =>{
      return [ {_id:{$in:this.getCollectionReactively('leaguesUsers')}, active:false} ];
  });

  this.subscribe("users", () =>{
      return [ this.getCollectionReactively('owners') ];
  });
  this.helpers({
    user: function(){
      return Meteor.users.findOne();
    },
     leaguesUsers: function (){
      this.userId = Meteor.userId();
      leaguesUsers = LeaguesUsers.find().fetch();
      lus = [];
      _.each(leaguesUsers, function (lu){
        lus.push(lu.league_id);
      });
      return lus;
    },
    leagues: function(){
     var leagues = Leagues.find({_id:{$in:this.getCollectionReactively('leaguesUsers')}, active:false}).fetch();
    _.each(leagues, function(league){
      this.competition_id = league.competition_id;

      owner = Meteor.users.findOne(league.owner);
      league.ownerName = owner.profile.name;

      leagueUser = LeaguesUsers.findOne({league_id: league._id, user_id: $scope.currentUser._id});

      league.teamWinnerName = leagueUser.teamWinnerName;
    });
		  return leagues;
	  },

    owners: function (){
      leagues = Leagues.find().fetch();
      owns = [];
      _.each(leagues, function (league){
        owns.push(league.owner);
      });
      return owns;
    }
  });
  
  
  this.linker = function(torneoId, tabIndex){
      if(tabIndex == 0){
          $state.go('tabs.profile-ligaActual',{ id: torneoId});
      } 
  };

  this.takePicture = function(){
    $meteor.getPicture().then(function(picture){
      rc.userEdit.profile.picture = picture;
    });
  };

  this.editar = function () {
    this.userEdit = Meteor.users.findOne();
    this.edit = true;
  };

  this.cancel = function () {
    this.edit = false;
    this.userEdit = this.user;
  };

  this.actualizar = function(){
    Meteor.users.update({_id: $rootScope.currentUser._id}, {$set:{profile: this.userEdit.profile}});
    this.user = Meteor.users.findOne();
    this.edit = false;
  };

  this.logout = function () {
    $meteor.logout();
		$state.go('anon.login');
  };
}