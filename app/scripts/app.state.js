(function () {
    'use strict';

    angular
        .module('baselApp')
        .config(resourceUrlWhitelistConfig)
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'app/navbar/navbar.html'
                }
            }
        });
    }

    /****************************************************/
    resourceUrlWhitelistConfig.$inject = ['$sceDelegateProvider'];
    /**
     *
     * @param $sceDelegateProvider
     */
    function resourceUrlWhitelistConfig($sceDelegateProvider) {
        // console.log('resourceUrlWhitelistConfig....');
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://seabank.com.vn**',
            'https://seabank.com.vn**',
            'http://*.seabank.com.vn**',
            'https://*.seabank.com.vn**',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://srv*.assets.example.com/**'
        ]);

        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
            'http://myapp.example.com/clickThru**'
        ]);
    }

})();
