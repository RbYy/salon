describe('when I call renderBirthday', function(){
    beforeEach(module('model'));
    beforeEach(module('datePicker'));    
    beforeEach(function(){
        inject(function(salonModel, dateService){ 
            modelS = salonModel
            client = modelS.clients[1]

        })
    })


    it('returns true', function(){
        expect(modelS.renderBirthday(client) ).toEqual(new Date(2015,3 ,4));
    })

    it('returns true', function(){
        client.birth = new Date(1896, 7, 7)  //Fake year! If given, renders a date string without the year 
        expect(modelS.renderBirthday(client)).toEqual('August, 7');
    })        

})


