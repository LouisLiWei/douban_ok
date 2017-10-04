(function (angular) {
    var app = angular.module('moveCat', ['moveCat_home', 'moveCat_details', 'moveCat_movelist']);

    app.directive("active", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.on("click", function () {
                    element.parent().children().removeClass("active");
                    element.addClass("active");
                });
            }
        };
    });


    //搜索功能
    app.controller('searchCtrl', ['$scope', '$window',
        function ($scope, $window) {
            $scope.query = function () {
                // alert(123);
                //拿到用户输入的关键字
                var kw = $scope.keyword;
                // console.log(kw);
                //更改url地址的路由
                $window.location.hash = '#/search?q=' + kw;
            }
        }
    ])

})(angular);