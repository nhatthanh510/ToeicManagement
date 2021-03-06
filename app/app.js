(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

})();