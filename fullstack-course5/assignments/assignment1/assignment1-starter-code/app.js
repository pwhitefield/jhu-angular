(function () {
  'use strict';

  angular.module('LunchApp', [])
    .controller('LunchController', LunchController);

  LunchController.$inject = ['$scope'];
  function LunchController($scope) {
    $scope.itemEaten = "";
    $scope.validateItemEaten = function() {
      var itemArr = $scope.itemEaten.split(",");
      $scope.itemCount = itemArr.length;
      $scope.itemCountMsg = "Enjoy";
      if ($scope.itemCount > 3) {
        $scope.itemCountMsg = "Too much";
      }
    };
  };

})();
