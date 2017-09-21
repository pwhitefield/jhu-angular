(function () {
  'use strict';

  angular.module('ShoppingListApp', [])
         .controller('ToBuyController', ToBuyController)
         .controller('BroughtController', BroughtController)
         .provider('ShoppingListService', ShoppingListServiceProvider);

  ToBuyController.$inject = ['ShoppingListService'];
  function ToBuyController(ShoppingListService) {
    var toBuyController = this;
    toBuyController.items = ShoppingListService.getToBuyItems();
    toBuyController.doBuy = function (index) {
      ShoppingListService.doBuy(index);
      ShoppingListService.isItemBrought();
    };
  }

  BroughtController.$inject = ['ShoppingListService'];
  function BroughtController(ShoppingListService) {
    var broughtController = this;
    broughtController.items = ShoppingListService.getBroughtItems();
    broughtController.doReturn = function (index) {
      ShoppingListService.doReturn(index);
    };
  }


  // ShoppingListService implementation
function ShoppingListService() {
  var service = this;

  // List of shopping items
  var buyItems = [ { name: "Apple" , quantity: 10},
                   { name: "Banana" , quantity: 10},
                   { name: "GrapeFruit" , quantity: 10},
                   { name: "Kiwi" , quantity: 10},
                   { name: "orange" , quantity: 10},
                   { name: "Pear" , quantity: 10}
                 ];

  var broughtItems = [];

  // return the available items to buy
  service.getToBuyItems = function() {
    return buyItems;
  }

  // return the broguht items
  service.getBroughtItems = function() {
    return broughtItems;
  }

  // remove the item from the buy list
  // put into the brought list
  service.doBuy = function (index) {
    broughtItems.push(buyItems[index]);
    buyItems.splice(index, 1);
  };

  // remove item from the brought list
  service.doReturn = function (index) {
    buyItems.push(broughtItems[index]);
    broughtItems.splice(index, 1);
  }
}


function ShoppingListServiceProvider() {
  var provider = this;
  provider.$get = function () {
    var shoppingList = new ShoppingListService();
    return shoppingList;
  };
}

})();
