(function (angular) {

    var app = angular.module('moveCat_movelist', ['ngRoute', 'customAjax']);

    //配置路由
    // app.config(['$locationProvider', function ($locationProvider) {
    //     $locationProvider.hashPrefix('');
    // }]);

    app.config(['$routeProvider', function ($routeProvider) {

        //#/in_theaters/4
        //#/top250/3
        //#/coming_soon/3
        //同时匹配/:moveType/:page?
        $routeProvider.when('/:moveType/:page?', {
            templateUrl: './movelist/movelist.html',
            controller: 'in_theatersCtrl'
        })
    }]);


    //jsonp  自定义跨域ajax请求
    app.controller('in_theatersCtrl', ['$scope', 'jsonp', '$routeParams', '$route', '$window',
        function ($scope, jsonp, $routeParams, $route, $window) {
            $scope.pageSize = 10;
            $scope.pageIndex = +($routeParams.page || 1);
            // console.log('面容量:' + $scope.pageSize + '.页码:' + $scope.pageIndex);
            //start 值 
            // 第 1 页   start  0
            // 第 2 页   start  10
            // 第 3 页   start  20
            // 第 4 页   start  30
            //start = ($scope.pageIndex-1)*10

            jsonp({
                url: "http://api.douban.com/v2/movie/" + $routeParams.moveType,
                params: {
                    count: $scope.pageSize,
                    start: ($scope.pageIndex - 1) * $scope.pageSize,
                    q: $routeParams.q
                },
                callback: function (response) {
                    $scope.isShow = false;
                    // console.log(response);
                    $scope.move = response;
                    $scope.pageCount = $window.Math.ceil(response.total / $scope.pageSize); //最多页码
                    $scope.$apply(); //自定义的jsonp要加，告诉视图发生变化了，你该刷新视图了
                }
            });
            $scope.change = function (pageIndex) {
                if (pageIndex < 1 || pageIndex > $scope.pageCount) {
                    // alert('到头了');
                    return;
                }
                // console.log(pageIndex);
                $route.updateParams({
                    page: pageIndex
                })
            }
        }

    ])

})(angular)