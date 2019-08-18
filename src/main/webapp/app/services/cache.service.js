
(function () {
    'use strict';

    angular
        .module('baselApp')
        .factory('CacheService', CacheService);

    CacheService.$inject = ['$sessionStorage'];

    function CacheService($sessionStorage) {

        var TIME_TO_LIVE = 30 * 60 * 1000; // 30 minutes

        return {
            setCache: setCache,
            getCache: getCache,
            removeCache: removeCache,
            isCacheValid: isCacheValid
        };

        function setCache(cacheKey, content) {
            if (!cacheKey) {
                return;
            }
            $sessionStorage[cacheKey] = {
                timestamp: new Date().getTime(),
                content: angular.copy(content)
            };
        }

        function getCache(cacheKey) {
            if (isCacheValid(cacheKey)) {
                return $sessionStorage[cacheKey].content;
            }
            return null;
        }

        function removeCache(cacheKey) {
            delete $sessionStorage[cacheKey];
        }

        function isCacheValid(cacheKey) {
            if (!cacheKey) {
                return false;
            }
            var cachedObj = $sessionStorage[cacheKey];
            if (!cachedObj) {
                return false;
            }
            var cachedTimestamp = cachedObj.timestamp;
            var currentTimestamp = new Date().getTime();

            if (!cachedTimestamp || currentTimestamp - cachedTimestamp > TIME_TO_LIVE) {
                return false;
            }
            return true;
        }
    }
})();
