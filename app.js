
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
        controller: 'newCtrl',
        controllerAs: 'new'
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
});

salon.service('salonModel', function() {
    var service = this,

        clients = [
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



    service.getClients = function () {
        return clients;
    };
});

salon.controller('MainCtrl', function($location, salonModel) {
    var main = this;
    main.clients = salonModel.getClients();

    main.showClient = function(id){
        url='/detajli/' + id

        $location.path(url)
    }
    main.addClient = function(){
        console.log('main.addClient')
        var newid = salonModel.getClients().length;
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
        salonModel.getClients().push(newClient);
        $location.path('/edit/' + newid)
    }
});

salon.controller('editCtrl', [
            '$scope',
            'salonModel',
            '$location',
            '$routeParams', 
            function($scope, salonModel, $location, $routeParams){
    var edit = this
    id = $routeParams.id
    edit.client=salonModel.getClients()[id]

    
}]);

salon.controller('newCtrl', ['$location', function($location){

}]);

salon.controller('detajlCtrl', ['salonModel', '$location', '$routeParams', function(salonModel, $location, $routeParams){
    var detajl = this;
    id = $routeParams.id
    detajl.client = salonModel.getClients()[id]
    console.log('client', detajl.client)
    console.log('routepa', $routeParams.id)

    detajl.edit = function(){
        $location.path('/edit/' + id)
    }

    detajl.remove = function(){
        salonModel.getClients().splice(id,1)
        console.log(salonModel.getClients())
    }


}]);


salon.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{client.firstname}}</h4><p>{{client.lastname}}</p></div>'
    }
});