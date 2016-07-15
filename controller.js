'use strict';
	var app=angular.module('wikipediaApp',[]);
	app.controller('WikiSearch',['$scope','$http',function($scope,$http){
		$scope.search=function(){
			$scope.results=[];
			var searchvalue=$('input').val();
			if (searchvalue==""){
			$('.search').css("margin-top","200px");
			}
			else{
				$('.search').css("margin-top","20px");
			}
			var api='http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
			var cb='&callback=JSON_CALLBACK';
			var url=api+searchvalue+cb;
			var page='https://en.wikipedia.org/?curid=';
			$http.jsonp(url)
			.success(function(data){ 
			var results = data.query.pages; 
			angular.forEach(results,function(v,k){
			$scope.results.push({title: v.title, body: v.extract, page: page + v.pageid});
			console.log(v.title);
				})
			}).
			error(function (data) {
			$scope.data = "Request failed";
			});
		}
	}]);

	
	