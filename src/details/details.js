(function (angular) {
    var app = angular.module('moveCat_details', ['ngRoute', 'customAjax']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details/:id', {
            templateUrl: './details/details.html',
            controller: 'detailsCtrl'
        })
    }]);

    app.controller('detailsCtrl', ['$scope', 'jsonp', '$routeParams',
        function ($scope, jsonp, $routeParams) {
            jsonp({
                url: 'http://api.douban.com/v2/movie/subject/' + $routeParams.id,
                params: {},
                callback: function (response) {
                    // console.log(response);
                    $scope.move = response;
                    $scope.isShow = false;
                    $scope.$apply();
                }
            })
        }
    ])

})(angular)