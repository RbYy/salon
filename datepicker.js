var datePicker = angular.module('datePicker', ["model"]);


datePicker.factory('dateService', function(){
    
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

datePicker.controller('DatepickerCtrl', function ($routeParams, salonModel, $scope, $filter, dateService) {
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