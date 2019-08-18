(function() {
  "use strict";

  angular.module("baselApp").controller("NavbarController", NavbarController);

  NavbarController.$inject = [
    "$state",
    "Auth",
    "Principal",
    "ProfileService",
    "LoginService",
    "CacheService",
    "$scope",
  ];

  function NavbarController(
    $state,
    Auth,
    Principal,
    ProfileService,
    LoginService,
    CacheService,
    $scope
  ) {
    var vm = this;
    var ACCOUNT_INFO = "ACCOUNT_INFO";

    vm.isNavbarCollapsed = true;
    vm.isAuthenticated = Principal.isAuthenticated;

    ProfileService.getProfileInfo().then(function(response) {
      vm.inProduction = response.inProduction;
      vm.swaggerEnabled = response.swaggerEnabled;
    });

    vm.login = login;
    vm.logout = logout;
    vm.toggleNavbar = toggleNavbar;
    vm.collapseNavbar = collapseNavbar;
    vm.$state = $state;

    function login() {
      collapseNavbar();
      LoginService.open();
    }

    function logout() {
      collapseNavbar();
      Auth.logout();
      $state.go("home");
    }

    function toggleNavbar() {
      vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
    }

    function collapseNavbar() {
      vm.isNavbarCollapsed = true;
    }

    // kiem tra login
    $scope.$on("authenticationSuccess", function() {
      getAccount();
    });

    checkCacheAccount();
    function checkCacheAccount() {
      if (CacheService.isCacheValid(ACCOUNT_INFO)) {
        vm.account = CacheService.getCache(ACCOUNT_INFO);
        vm.isAuthenticated = Principal.isAuthenticated;
        return;
      }
      getAccount();
    }

    function getAccount() {
      Principal.identity().then(function(account) {
        vm.account = account;
        console.log(account);
        CacheService.setCache(ACCOUNT_INFO, vm.account);
        vm.isAuthenticated = Principal.isAuthenticated;
      });
    }
    // end kiem tra login
  }
})();
