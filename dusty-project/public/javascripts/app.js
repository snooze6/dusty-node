/**
 * Created by snooze on 21/02/17.
 */

var app = angular.module('dusty-frontend', ['ngRoute', 'ui.materialize', 'ngCookies']);

// configure our routes
app.config(function($routeProvider) {
    // Check if the user is authenticated
    function checkauth($q, $rootScope, $location) {
        var deferred = $q.defer();
        deferred.resolve();
        if (!$rootScope.user.token) {
            $location.path('/auth');
        }
        return deferred.promise;
    }

    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'main',
            resolve: {
                factory: checkauth
            }
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : ''
        })
        .when('/auth', {
            templateUrl : 'pages/auth.html',
            controller  : 'auth'
        })
});

app.controller('master', ['$location', '$rootScope', '$cookies', function ($location, $rootScope, $cookies) {
    $rootScope.user = {
        pass: '',
        user: '',
        name: '',
        token: null
    };

    if ($cookies.getObject('user')) {$rootScope.user = $cookies.getObject('user');}

    $rootScope.logout = function () {
        console.log('Trying to logout');

        $rootScope.user = {
            pass: '',
            user: '',
            name: '',
            token: null
        };
        $cookies.remove('user');

        $location.path('/');
    }
}]);

app.controller('main', ['things', '$scope', '$rootScope', function ($things, $scope, $rootScope) {
    $scope.things = [];
    
    $things.getThings(null, null, $rootScope.user.token).then(function (data) {
        $scope.things = data.data;
    });

    $scope.search = function () {
        $things.getThings($scope.searchterm, 2, $rootScope.user.token).then(function (data) {
            $scope.things = data.data;
        })
    }
}]);

app.controller('auth', ['users', '$scope', '$rootScope', '$location', '$cookies', function($users, $scope, $rootScope, $location, $cookies) {
    $scope.show = false;

    $scope.login = function () {
        $users.login($rootScope.user.user, $rootScope.user.pass).then(function (data) {
            if (data.data.sucess){

                $rootScope.user.token = data.data.token;
                $location.path('/');
                $cookies.putObject('user', $rootScope.user)
            }
        }, function (err) {
            $scope.show = true;
        })
    }
}]);

app.factory('things', [ '$http', function ($http){
    return {
        getThings: function (filter, avaliable, token) {
            var headers = {}; var params = {};
            if (token) {headers = {'x-access-token': token}}
            if (filter) {params.filter = filter}
            if (avaliable) {params.avaliable = avaliable}

            return $http.get('api/things', {
                    params: params,
                    headers: headers
                }
            );
        }
    }
}]);

app.factory('users', [ '$http', function ($http){
    return {
        login: function (user, pass) {
            return $http.post('api/users/login', {
                    user: user,
                    pass: pass
            })
        }
    }
}]);