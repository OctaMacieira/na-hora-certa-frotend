// Configuração principal do Angular App
var app = angular.module('naHoraCertaApp', ['ngRoute']);

// Configuração de rotas
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/quem-somos', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .when('/cadastrar-sala', {
            templateUrl: 'views/register-room.html',
            controller: 'RegisterRoomController'
        })
        .when('/sala/:id', {
            templateUrl: 'views/room-details.html',
            controller: 'RoomDetailsController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

// Controller global para navegação
app.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.goHome = function() {
        $location.path('/home');
    };
}]);
