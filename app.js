
var salon = angular.module('salon', ['ngRoute', 'datePicker']);

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
                birth: new Date(1899, 1, 1),
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
    escape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    edit.phoneRegex = "((((\\+386)|(00386)|0)(\\s|-|\\\/)?(41|40|31|51))(\\s|-|\\\/)?[0-9](\\s|-|\\\/)?[0-9](\\s|-|\\\/)?[0-9](\\s|-|\\\/)?[0-9](\\s|-|\\\/)?[0-9](\\s|-|\\\/)?[0-9])"
}]);



salon.controller('detajlCtrl', [
            '$filter',
            'salonModel',
            '$location',
            '$routeParams',
            'dateService',
            function($filter, salonModel, $location, $routeParams, dateService){
    var detajl = this;
    id = $routeParams.id
    detajl.client = $filter('filter')(salonModel.clients, function(d){
        return d.id == id;
    })[0];

    if (detajl.client.birth.getFullYear() == 1900){
        detajl.birthday = 
            dateService.months[detajl.client.birth.getMonth()].name + ', ' +
            detajl.client.birth.getDate()
    }else{
        detajl.birthday = detajl.client.birth
    }

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


