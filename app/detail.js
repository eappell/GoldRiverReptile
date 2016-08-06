/**
 * Created by Eddie on 12/14/14.
 */

var animal = null;
var isBaby = false;

(function(){
    angular
        .module('grr')
        .controller('Detail', Detail);
})();

function Detail($stateParams,$rootScope,fbMetaService) {
    var vm = this;
    $('.content').hide();
    /* jshint validthis: true */
    vm.animal = GetAnimalById(collection, $stateParams.animalId);
    window.animal = vm.animal;
    vm.isBaby = moment().diff(vm.animal.dob,'months') < 6;
    window.isBaby = moment().diff(vm.animal.dob,'months') < 6;
        
    var pics = vm.animal.photos;
    vm.slides = GetSlides(pics);
    vm.myInterval = 5000;

    $rootScope.metaservice = fbMetaService;
    var desc = vm.animal.id;
    var title = vm.animal.id;
    var url = 'http://greptile.com/#/Collection/' + vm.animal.id;
    var imageUrl = 'http://greptile.com/images/bodypics/' + vm.animal.photos[0].filename + '.jpg';

    $(document).ready(function(){
//        $rootScope.metaservice.set(title,desc,url,imageUrl);
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
        $('.content').show();
    });
}

function GetSlides(pics) {
    slides = [];    
    for(var i = 0;i < pics.length;i++) {
        var pic = {
            image: '/images/bodypics/' + pics[i].filename + '.jpg',
            filename: pics[i].filename,
            caption: pics[i].caption,
            id: i
        };
        slides.push(pic);
    }
    return slides;
}

function IsInCollection(id){
    var animal = GetAnimalById(collection, id);
    return typeof(animal) !== undefined;
}

function GetAnimalById(collection, id){
    var animals = $.grep(collection, function(animal, index){
        if(animal.id == id) return animal;
    });

    if(animals.length > 0)
        return animals[0];

    return null;
}
