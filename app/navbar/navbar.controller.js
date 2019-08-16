(function() {
  'use strict';

  angular
      .module('baselApp')
      .controller('navbarController', navbarController);

      navbarController.$inject = ['$scope','$state'];

  function navbarController ($scope, $state) {
      var vm = this;

      console.log("success");
  }
})();
