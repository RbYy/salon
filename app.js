
var salon = angular.module('salon', ['ngRoute', 'ui.bootstrap']);

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
                birth: new Date(1911, 11, 8),
            },
            {
                id: 1,
                firstname: 'Pujsa',
                lastname: 'Pepa',
                email: 'pujsa@prasica.sem',
                address: 'svinjak 666',
                phone: '68468654',
                birth: new Date(1015,3 ,4),
            },            
            {
                id: 2,
                firstname: 'Telica',
                lastname: 'Sentimentalka',
                email: 'krava@mlekarica.io',
                address: 'pozimi stala,\npoleti gmajna',
                phone: '65465445',
                birth: new Date(2013, 12, 12),
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
                birth: new Date(1900, 1, 1),
            },
        salonModel.clients.push(newClient);
        salonModel.counter++
        $("#scroller").scrollTop($("#scroller")[0].scrollHeight);
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
        $location.path('/removed/')
    }
}]);


salon.directive('client', function() {
    return {
        scope: true,
        replace: true,
        template: 
                "<div>\
                    <h4>{{client.id}} :: {{client.firstname}}</h4>\
                    <p>{{client.lastname}}</p>\
                    <p>{{client.birth | date:'longDate'}}</p>\
                </div>",
        link: function(scope, element, attrs){

        }
    }
});


salon.factory('dateService', function(){
    
    getFebruaryDays = function(year){
        if (year % 4 == 0){
            return 29
        }else{
            return 28
        }
    }


    data =
    {
        months:
        [
            { id: 0, name: "January", days: 31 },
            { id: 1, name: "February", days: getFebruaryDays },
            { id: 2, name: "March", days: 31 },
            { id: 3, name: "April", days: 30 },
            { id: 4, name: "May", days: 31 },
            { id: 5, name: "June", days: 30 },
            { id: 6, name: "July", days: 31 },
            { id: 7, name: "August", days: 31 },
            { id: 8, name: "September", days: 30, },
            { id: 9, name: "October", days: 31, },
            { id: 10, name: "November", days: 30 },
            { id: 11, name: "December", days: 31 },
        ],

        generateDaysForMonth: function(month, year){
            days = []
            var nrDays = null
            if (month == 1){  // 2: february
                nrDays = data.months[1].days(year)
            }else{
                for (i in data.months){
                    if (i == month){
                        nrDays = data.months[i].days
                    }
                }
            }
            for (var i=1; i <= nrDays; i++){
                days.push(i)
            }
            return days
        },

        generateYears: function(){
            years = []
            for (var i = 1; i<= 116; i++){
                years.push(i + 1900);
            }
            return years
        },
    }
    return data
})

salon.controller('DatepickerCtrl', function ($routeParams, salonModel, $scope, $filter, dateService) {
    var picker = this;
    id = $routeParams.id
    picker.month ={}
    picker.client = $filter('filter')(salonModel.clients, function(d){
        return d.id == id;
    })[0];
    picker.months = dateService.months
    picker.month = picker.months[picker.client.birth.getMonth()]
    picker.day = picker.client.birth.getDate()
    picker.year = picker.client.birth.getFullYear()
    

    picker.days = dateService.generateDaysForMonth(picker.month.id, picker.year)
    picker.years = dateService.generateYears()
    setNumberOfDays = function(){
        picker.days = dateService.generateDaysForMonth(picker.month.id, picker.year)
        picker.client.birth = new Date(picker.year, picker.month.id, picker.day)

    }
    $scope.$watchGroup(["picker.month.id", "picker.day", "picker.year"], setNumberOfDays)

  
});