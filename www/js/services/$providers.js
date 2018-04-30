'use strict';

(function () {
    this.app.factory('$Providers', ['$http', '$q', 'ENV',
        function ($http, $q, ENV, StorageUserService) {


            return {
                getAllFactors: function (_user_info) {

                    var defer = $q.defer();
                    $http({
                        url: ENV.LOCAL + `api/providers`,
                        method: 'GET',
                        headers: {
                            username: _user_info.username,
                            token: _user_info.authentication_token
                        }
                    }).then(function (_response) {
                        defer.resolve(_response);

                    }, function (_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                }


            }
        }]);
}).call(this);
