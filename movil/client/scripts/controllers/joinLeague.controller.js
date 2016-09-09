  angular
 .module('FLOKsports')
 .controller('JoinLeagueCtrl', JoinLeagueCtrl);
 function JoinLeagueCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
	$reactive(this).attach($scope);
	this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
	
	this.searchLeague = "";
	this.league = "";
	this.user_id = Meteor.userId();
	this.showJoin = false;
	this.show = false;
	this.subscribe("teams", () =>{
		return [ {tournament_id: this.getReactively('league.tournament_id')} ];
	});

	this.subscribe("leaguesUsers", () =>{
		return [ this.getReactively('user_id') ];
	});

	this.subscribe("leagues", () =>{
	      return [ {_id:this.getReactively('searchLeague')} ];
	  	});
	
	this.helpers({
		teams: function (){
			return Teams.find();
		},
		league: function (){
			return Leagues.findOne(this.getReactively('searchLeague'));
		}
	});

	this.search = function (){
		if(this.league != undefined){
			console.log(this.league);
			this.show = true;
			var team = LeaguesUsers.findOne({user_id: this.user_id, league_id: this.league._id});
			if(team == undefined){
				this.showJoin = true;
			}else{
				this.showJoin = false;
			}
		}else{
			this.show = false;
		}
	}

	this.join = function (){
		if(this.join.teamwinner != undefined){
			team = Teams.findOne(this.join.teamwinner)
			var joinUL = {};
			joinUL.user_id = this.user_id;
			joinUL.league_id = this.league._id;
			joinUL.teamWinnerId =team._id;
			joinUL.teamWinnerName =team.name;
			joinUL.teamWinnerFlagUrl = team.flagUrl;
			joinUL.date = new Date();
			joinUL.active = true;
			LeaguesUsers.insert(joinUL, function (err){
				if(err){
					$ionicPopup.alert({
			            title: error.reason,
			            template: error.message,
			            okType: 'button-positive button-clear'
			          });
				}else{
					$state.go('tabs.leagues');
				}
			});
		}else{
			$ionicPopup.alert({
	            title: "Select some team",
	            template: "team winngin cannot be blank",
	            okType: 'button-positive button-clear'
	        });
		}
	}

	this.linker = function( tabIndex){
	      if(tabIndex == 3){
	          $state.go('tabs.joinLeague',{  tab: "home"});
	      } else if(tabIndex == 1) {
	          $state.go('tabs.leagues-joinLeague',{ tab: "league"});
	      }
	  };
 }