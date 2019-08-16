(function() {
  "use strict";

  /**
   * @ngdoc overview
   * @name baselApp
   * @description
   * # baselApp
   *
   * Main module of the application.
   */
  angular
    .module("baselApp", [
      "ngAnimate",
      "ngAria",
      "ngCookies",
      "ngMessages",
      "ngResource",
      "ngRoute",
      "ngSanitize",
      "ngTouch",
      "ui.bootstrap",
      "ui.router",
      "ngStorage",
      "ngIdle",
      "toastr"
    ])
    .run(run)
    .config(config);

  run.$inject = [
    "stateHandler",
    "$rootScope",
    "$uibModal",
    "$state",
    "$uibModalStack",
    "CacheService",
  ];
  config.$inject = ["toastrConfig", "KeepaliveProvider", "IdleProvider"];
  function run(
    stateHandler,
    $rootScope,
    $uibModal,
    $state,
    $uibModalStack,
    CacheService
  ) {
    stateHandler.initialize();
  }

  function config(toastrConfig, KeepaliveProvider, IdleProvider) {
    angular.extend(toastrConfig, {
      allowHtml: true,
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-center modal show",
      preventDuplicates: false,
      preventOpenDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "5000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: false,
    });

    IdleProvider.idle(900);
    IdleProvider.timeout(15);
    KeepaliveProvider.interval(10);
  }
  function configTemp($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        controllerAs: "main",
      })
      .when("/about", {
        templateUrl: "views/about.html",
        controller: "AboutCtrl",
        controllerAs: "about",
      })
      .otherwise({
        redirectTo: "/",
      });
  }
})();
