var model = angular.module('model', ['datePicker']);

model.service('salonModel', ['dateService', function(dateService) {
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
                birth: new Date(2015,3 ,4),
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

        service.renderBirthday = function(client){

            if (client.birth.getFullYear() == 1899){
                rendered = dateService.months[client.birth.getMonth()].name + ', ' + client.birth.getDate()
                console.log(rendered)
            return rendered

            }else{
                return client.birth
            }
        }
        service.counter = 3
}]);