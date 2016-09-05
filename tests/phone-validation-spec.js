describe('editCtrl', function(){
    var appCtrl, $scope, form;
 
    beforeEach(module('salon')); 
    //beforeEach(module('templates'));  <-- CAN'T MAKE ng-html2js WORK! 
    beforeEach(function() {

        inject(function(
            $controller,
            $templateCache,
            $rootScope,
            $filter,
            $routeParams,
            $compile,
            salonModel) {
                scope = $rootScope.$new();
                filter = $filter
                salonM = salonModel
                //templateCache = $templateCache
                compile =$compile
                template = angular.element('<div><h2>Edit data about {{client.firstname}}</h2><form class="form-horizontal" name="forma"><div class="form-group"><label class="control-label col-sm-2" for="firstname">First Name</label><input type="text" name="firstname" class="form-control col-sm-10" id="firstname" ng-model="client.firstname"/></div><div class="form-group"><label class="control-label col-sm-2" for="surname">Surname</label><input type="text" name="surname" class="form-control col-sm-10" id="surname" ng-model="client.lastname" /></div><div class="form-group"><label class="control-label col-sm-2" for="email">Email</label><input type="email" name="email" class="form-control col-sm-5" id="email" ng-model="client.email"><span class="col-sm-5 error" ng-show="forma.email.$error.email" ng-keyup="edit.validateEmail()">Not a valid email</span></div><div class="form-group"><label class="control-label col-sm-2" for="address">Address</label><textarea id="address" class="form-control col-sm-10" placeholder="Address" rows="3" ng-model="client.address"></textarea></div><div class="form-group"><label class="control-label col-sm-2" for="phone">Phone Number</label><input type="text" name="phone" id="phone" class="form-control col-sm-5"  ng-pattern="phoneRegex" ng-model="client.phone"/><span class="col-sm-5 error" ng-show="forma.phone.$invalid">Not a valid telephone number</span></div></form></div>')
                //templateCache.put('forma.html','<div><h2>Edit data about {{client.firstname}}</h2><form class="form-horizontal" name="forma"><div class="form-group"><label class="control-label col-sm-2" for="firstname">First Name</label><input type="text" name="firstname" class="form-control col-sm-10" id="firstname" ng-model="client.firstname"/></div><div class="form-group"><label class="control-label col-sm-2" for="surname">Surname</label><input type="text" name="surname" class="form-control col-sm-10" id="surname" ng-model="client.lastname" /></div><div class="form-group"><label class="control-label col-sm-2" for="email">Email</label><input type="email" name="email" class="form-control col-sm-5" id="email" ng-model="client.email"><span class="col-sm-5 error" ng-show="forma.email.$error.email" ng-keyup="edit.validateEmail()">Not a valid email</span></div><div class="form-group"><label class="control-label col-sm-2" for="address">Address</label><textarea id="address" class="form-control col-sm-10" placeholder="Address" rows="3" ng-model="client.address"></textarea></div><div class="form-group"><label class="control-label col-sm-2" for="phone">Phone Number</label><input type="text" name="phone" id="phone" class="form-control col-sm-5"  ng-pattern="phoneRegex" ng-model="client.phone"/><span class="col-sm-5 error" ng-show="forma.phone.$invalid">Not a valid telephone number</span></div></form></div>')
                scope.client = filter('filter')(salonM.clients, function(d){
                    // get client from list by "id" from URL
                    return d.id == 1; //on 1 there is Pujsa Pepa
                    })[0];
                scope.phoneRegex = salonM.phoneRegex
                //template = templateCache.get('forma.html')
                element = compile(template)(scope)
                editCtrl = $controller('editCtrl', {
                    $scope: scope,
                    $routeParams: {id: '1'}, // on 1 there is Pujsa Pepa 
                    $element: element
                });
                
                scope.$apply()
                form = scope.forma
        })
    });
 
    it('should have editCtrl controller toBeDefined', function() {
        expect(editCtrl).toBeDefined();
    });



    it('should access the client and her phone number', function() {

        expect(scope.client).toBeDefined();
        expect(scope.phoneRegex).toBeDefined()
        expect(scope.client.phone).toBe("+38640454454");
    
 
    });

    it('should be valid phone numbers', function() {
        form.phone.$setViewValue("040555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("041555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("030 555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("051 555 555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("040 55 55 55");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("068-555-555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("070/55-55-55");
        expect(form.phone.$valid).toBeTruthy();
    });
 
     it('should be valid phone numbers with Slovene prefix', function() {
        form.phone.$setViewValue("+38640555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("+386 41555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("00386/30 555555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("00386 51 555 555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("+386 40 55 55 55");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("00386-64-555-555");
        expect(form.phone.$valid).toBeTruthy();
        form.phone.$setViewValue("+386/49/55-55-55");
        expect(form.phone.$valid).toBeTruthy();
    });

    it('should be invalid phone numbers', function() {
        form.phone.$setViewValue("04055  5555");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("04155h5555");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("30 555555");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("051 555 5555");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("040 55 55 5");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("068-5555  55");
        expect(form.phone.$valid).toBeFalsy();
        form.phone.$setViewValue("070/55-55--55");
        expect(form.phone.$valid).toBeFalsy();
    });
});