
var salon = angular.module('salon', ['ngRoute']);

salon.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'default.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
    .when('/dodaj/', {
        templateUrl: 'forma.html',
        controller: 'editCtrl',
        controllerAs: 'edit'
    })
    .when('/edit/:id', {
        templateUrl: 'forma.html',
        controller: 'editCtrl',
        controllerAs: 'edit'
    })
    .when('/detajli/:id', {
        templateUrl: 'detajli.html',
        controller: 'detajlCtrl',
        controllerAs: 'detajl'
    })
    .when('/removed/', {
        template: '<h3>Client removed ...</h3>',
        controller: 'detajlCtrl',
        controllerAs: 'detajl'
    })    
});

salon.service('salonModel', function() {
    var service = this

        service.clients = [
            {
                id: 0,
                firstname: 'Marija',
                lastname: 'Pomagauka',
                email: 'marija@pomagaj.mi',
                address: 'Križ 15,\n5432 Sveta Nebesa',
                phone: '040666666',
                birth: '15/8/1906',
            },
            {
                id: 1,
                firstname: 'Pujsa',
                lastname: 'Pepa',
                email: 'pujsa@prasica.sem',
                address: 'svinjak 666',
                phone: '68468654',
                birth: '5-4-2015',
            },            
            {
                id: 2,
                firstname: 'Telica',
                lastname: 'Sentimentalka',
                email: 'krava@mlekarica.io',
                address: 'pozimi stala,\npoleti gmajna',
                phone: '65465445',
                birth: '6-4-2014',
            },            
        ];

        service.counter = 3
});

salon.controller('MainCtrl', function($location, salonModel) {
    var main = this;
    main.clients = salonModel.clients;

    main.showClient = function(id){
        $location.path('/detajli/' + id)
    }

    main.addClient = function(){
        var newid = salonModel.counter;

        newClient = 
            {                
                id: newid,
                firstname: '',
                lastname: '',
                email: '',
                address: '',
                phone: '',
                birth: '',
            },
        salonModel.clients.push(newClient);
        salonModel.counter++
        $location.path('/edit/' + newid)
    }
});


salon.controller('editCtrl', [
            '$filter',
            'salonModel',
            '$routeParams', 
            function($filter, salonModel, $routeParams){
    var edit = this
    id = $routeParams.id
    edit.client = $filter('filter')(salonModel.clients, function(d){
        return d.id == id;
    })[0];
}]);



salon.controller('detajlCtrl', [
            '$filter',
            'salonModel',
            '$location',
            '$routeParams',
            function($filter, salonModel, $location, $routeParams){
    var detajl = this;
    id = $routeParams.id
    detajl.client = $filter('filter')(salonModel.clients, function(d){
        return d.id == id;
    })[0];


    detajl.edit = function(){
        $location.path('/edit/' + id)
    }

    detajl.remove = function(){
        for (client in salonModel.clients){
            if (salonModel.clients[client].id == id){
               salonModel.clients.splice(client,1)
            }
        }
    }
}]);


salon.directive('client', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{client.id}} :: {{client.firstname}}</h4><p>{{client.lastname}}</p></div>'
    }
});