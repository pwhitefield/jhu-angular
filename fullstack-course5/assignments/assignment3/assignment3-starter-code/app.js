(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .service('MenuSearchService', MenuSearchService)
         .directive('foundItems', FoundItemsDirective)
         .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    var promise = MenuSearchService.getMenuItems();
    promise.then(function (response) {
      narrow.categories = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong. Error is " + error);
    });

    narrow.getMatchedMenuItems = function (searchName) {
      narrow.matches = MenuSearchService.getMatchedMenuItems(searchName);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMenuItems = function () {
      var response = $http({
      method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
      return response;
    };

    service.getMatchedMenuItems = function (searchName) {
      var matched = [];
      $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      })
      .then(function (response) {
        let menu_items = response.data.menu_items;
        menu_items.forEach(function (menuItem, index) {
          if (menuItem.short_name === searchName) {
            matched.push(menuItem);
          }
        });
      });
      return matched;
    };
  }

  function FoundItemsDirective() {
    return {
      templateUrl: 'foundItems.html'
    };
  }
})();
