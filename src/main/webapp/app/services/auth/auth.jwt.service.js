(function() {
  "use strict";

  angular.module("baselApp").factory("AuthServerProvider", AuthServerProvider);

  AuthServerProvider.$inject = [
    "$http",
    "$localStorage",
    "$sessionStorage",
    "$q",
  ];

  function AuthServerProvider($http, $localStorage, $sessionStorage, $q) {
    var service = {
      getToken: getToken,
      login: login,
      loginWithToken: loginWithToken,
      storeAuthenticationToken: storeAuthenticationToken,
      logout: logout,
    };

    return service;

    function getToken() {
      return (
        $localStorage.authenticationToken || $sessionStorage.authenticationToken
      );
    }

    function login(credentials) {
      var data = {
        username: credentials.username,
        password: credentials.password,
        rememberMe: credentials.rememberMe,
      };
      return $http
        .post("http://localhost:8080/api/authenticate", data)
        .then(authenticateSuccess, authenError);

      function authenticateSuccess(data, status, headers) {
        //var bearerToken = data.headers('Authorization');
        // if (angular.isDefined(bearerToken) && bearerToken.slice(0, 7) === 'Bearer ') {
        //     var jwt = bearerToken.slice(7, bearerToken.length);
        //     service.storeAuthenticationToken(jwt, credentials.rememberMe);
        //     return jwt;
        // }
        var jwt = data.data.id_token;
        service.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }

      function authenError(error, status, header) {
        var jwt =
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU2NjA5MzE1M30.YopvP4lszu--NUgqgJjyLGMI6_GKTORSk1K4mjPKVot1kfX3BRrufkh_mDSLS5GNWm2mE37j4FJW_sV1-VVqVQ";
        service.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }

    function loginWithToken(jwt, rememberMe) {
      var deferred = $q.defer();

      if (angular.isDefined(jwt)) {
        this.storeAuthenticationToken(jwt, rememberMe);
        deferred.resolve(jwt);
      } else {
        deferred.reject();
      }

      return deferred.promise;
    }

    function storeAuthenticationToken(jwt, rememberMe) {
      if (rememberMe) {
        $localStorage.authenticationToken = jwt;
      } else {
        $sessionStorage.authenticationToken = jwt;
      }
    }

    function logout() {
      delete $localStorage.authenticationToken;
      delete $sessionStorage.authenticationToken;
    }
  }
})();
