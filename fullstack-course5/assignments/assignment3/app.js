(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .provider('MenuSearchService', MenuSearchServiceProvider)
         .directive('foundItems', FoundItemsDirective)
         .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  // directive component with one way binding to items
  // where items is for display to UI only.
  function FoundItemsDirective () {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    var searchTerm = "";
    //var allTerms = MenuSearchService.getMatchedMenuItems(searchTerm);
    var allTerms = MenuSearchService.getMenuCategories();
    console.log('allTerms ' + allTerms);
  }

  MenuSearchService.$inject = ['$scope', '$http', 'ApiBasePath'];
	function MenuSearchService($scope, $http, ApiBasePath) {
	  var service = this;

	  service.getMenuCategories = function () {
		var response = $http({
		  method: "GET",
		  url: (ApiBasePath + "/categories.json")
		});

		return response;
	  };
	}

  // provider function
  function MenuSearchServiceProvider () {
    var provider = this;
    provider.$get = function () {
      var menuSearchService = new MenuSearchService ();
      return menuSearchService;
    }
  }

  function FoundItemsDirectiveController () {
    var foundItems = this;
  }
}) ();
