
angular
  .module('FLOKsports')
  .controller('PredictionsCtrl', PredictionsCtrl);

function PredictionsCtrl($stateParams,$scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
  $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  this.tournament_id = $stateParams.tournament_id;
  this.stateParams = $stateParams;
  this.readOnly = true;
  if(Meteor.userId() == this.stateParams.user_id){
    this.readOnly = false;
  }
  this.orderG = false;
  this.params = {};
  this.groupName = '';
  this.activeButton = 0;
  this.activeGroup = 0;

  this.subscribe("teams", ()=>{
    return [ {tournament_id: this.getReactively('tournament_id')} ];
  });

  this.subscribe("matches", () =>{
      return [ {tournament_id:  this.getReactively('tournament_id')},{} ];
  });

  this.subscribe("groups", () =>{
      return [ {tournament_id:  this.getReactively('tournament_id')} ];
  });
  this.subscribe("predictions", () =>{
      return [ this.getReactively('stateParams') ]
  });

  this.helpers({
    matches: function(){
       var matches = Matches.find(this.getReactively('params'),{sort: {start: 1}}).fetch();
       var predictions = Predictions.find().fetch();
       _.each(predictions, function(prediction){
        var match = _.filter(matches, function(match){
          return match._id == prediction.match_id;
        });
        if(match[0] != undefined)
        match[0].prediction = prediction;
       });
      return matches;
    },
    groups:function(){
      return Groups.find({},{sort: {fullName: 1}}).fetch();
    }
  });

  this.save = function(match){
    if(!match.prediction.homeResult || !match.prediction.awayResult)
      return 
    var prediction = {};
    prediction.homeResult = match.prediction.homeResult;
    prediction.awayResult = match.prediction.awayResult;
    prediction.match_id = match._id;
    prediction.homeTeam_id = match.homeTeam_id;
    prediction.awayTeam_id = match.awayTeam_id;
    prediction.tournament_id = this.tournament_id;
    prediction.league_id = this.stateParams.league_id;
    prediction.user_id = this.stateParams.user_id;
    prediction.active = true;
    if(match.prediction._id != undefined){
      Predictions.update({_id:match.prediction._id},{$set:prediction});
    }else{
      Predictions.insert(prediction);
    }
  }
  this.verify = function(match_id){
    Predictions.find()
  }
  this.groupChange = function(group_id, fullName, key){
      this.activeButton = key;
      this.params = {group_id:group_id};
      this.groupName = fullName;
  }

  this.teamFlag = function(team_id){
    var team = Teams.findOne(team_id);
    return team.flagUrl;
  }

  this.teamName = function(team_id){
    var team = Teams.findOne(team_id);
    return team.shortName;
  }

  this.convert = function(key){
    return String.fromCharCode(65 + key); 
  }

  this.orderDate = function(){
    this.orderG = false;
    this.params = {};
    this.activeGroup = 0;
  }

  this.orderGroup = function(){
    this.orderG = true;
    this.activeGroup = 1;
    var group = this.groups[0];
    this.groupChange(group._id, group.fullName, 0);
  }

  this.linker = function(tabIndex, league_id, prediction_id, match_id){
      if(tabIndex == 1){
          $state.go('tabs.leagues-matchDetails',{league_id: league_id, prediction_id: prediction_id, match_id: match_id});
      }
  };
}
