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
      controllerAs: 'narrow',
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    var searchItem = "";
    var promise = MenuSearchService.getMatchedMenuItems(searchItem);
    promise.then(
      function(result) {
        foundItems = result;
      },
      function(error) {
        errorMsg = error;
      }
    );
  }

  // service function
  //MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService () {
    var service = this;

    service.getMatchedMenuItems = function (searchTerms) {
      return $http({
        method: "GET",
        url: (ApiBasePath + + "/menu_items.json")
      }).then(function(result) {
        return "";
      })
    }
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
    var narrow = this;
  }
})();
