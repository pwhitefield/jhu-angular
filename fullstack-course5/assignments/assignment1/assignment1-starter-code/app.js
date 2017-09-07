(function() {
  'use strict';

  angular.module('LunchApp', [])
         .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope'];
  function LunchController($scope) {
    $scope.itemEaten = "";
    $scope.validateItemEaten = function() {
      var itemArr = $scope.itemEaten.split(",");
      var totalItems = 0;

      for (var i = 0; i < itemArr.length; i++) {
        if (itemArr[i].trim() != "") {
          totalItems ++;
        }
      }

      $scope.itemCountMsg = "Enjoy";
      if (totalItems > 3) {
        $scope.itemCountMsg = "Too much";
      }
    };
  };

})();
