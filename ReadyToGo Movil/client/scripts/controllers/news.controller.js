
angular
  .module('FLOKsports')
  .controller('NewsCtrl', NewsCtrl);
 
	function NewsCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
	  let reactiveContext = $reactive(this).attach($scope);
	  
		var x = new XMLHttpRequest();
		x.open("GET", "http://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=soccer", true);
		x.onreadystatechange = function () {
		  if (x.readyState == 4 && x.status == 200)
		  {
		    var doc = x.responseXML;
		    reactiveContext.helpers({
			    articulos : () => {
				    console.log(doc);
				    channel = doc.getElementsByTagName("channel")[0];
				    items = channel.getElementsByTagName("item");
				    elementos = [];
				    for(i=0; i < items.length; i++){
					    elementos.push({ 
						    title: items[i].getElementsByTagName("title")[0].innerHTML,
						    link: items[i].getElementsByTagName("link")[0].innerHTML,
						    category: items[i].getElementsByTagName("category")[0].innerHTML,
						    description: items[i].getElementsByTagName("description")[0].innerHTML,
						    pubDate: items[i].getElementsByTagName("pubDate")[0].innerHTML,
						    enclosure: items[i].getElementsByTagName("enclosure")[0].getAttribute("url"),
						  });
				    }/*

				    console.log(elementos);
				    console.log(items);
*/
				    return elementos;
			    }
		    })
		  }
		};
		x.send(null);
	}
