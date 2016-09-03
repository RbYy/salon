
var salon = angular.module('salon', ['ngRoute', 'datePicker', 'model']);

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
        // triggered by clicking on item
        $location.path('/detajli/' + id)
    }

    main.addClient = function(){
        // triggered by "+" button
        var newid = salonModel.counter;

        newClient = 
            {                
                id: newid,
                firstname: '',
                lastname: '',
                email: '',
                address: '',
                phone: '',
                birth: new Date(1896, 0, 1),
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
            '$location',
            function($filter, salonModel, $routeParams, $location){
    var edit = this
    edit.phoneRegex = salonModel.phoneRegex

    edit.client = $filter('filter')(salonModel.clients, function(d){
        // get client from list by "id" from URL
        return d.id == $routeParams.id;
        })[0];
    try{
        edit.birthday = salonModel.renderBirthday(edit.client)
    }catch(err){
        $location.path('/')
    }

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
    
    try{
        detajl.client = $filter('filter')(salonModel.clients, function(d){
            return d.id == id;
        })[0];
        detajl.birthday = salonModel.renderBirthday(detajl.client)
    }catch(err){
        $location.path('/')
    }
    detajl.edit = function(){
        // triggered by "edit (pencil)" button click
        $location.path('/edit/' + id)
    }
    
    detajl.remove = function(){
        // triggered by trash bin button click
        for (client in salonModel.clients){
            if (salonModel.clients[client].id == id){
               salonModel.clients.splice(client,1)
            }
        }
        $location.path('/removed/')
    }
}]);


salon.directive('client', function() {
    // render list items
    return {
        scope: true,
        replace: true,
        template: 
                '<div>\
                    <h4>{{$index+1}} :: {{client.firstname}}\
                        <span ng-show="birthday" class="glyphicon glyphicon-gift"></span>\
                    </h4>\
                    <span>{{client.lastname}}</span>\
                </div>',
        link: function(scope, element, attrs){
            scope.$watch("client.birth",
                function(){
                    if (scope.client.birth.toDateString() == new Date().toDateString()){
                        scope.birthday = true
                    }else{
                        scope.birthday = false
                    }
                })
        }
    }
}); 
