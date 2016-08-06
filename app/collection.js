/**
 * Created by Eddie on 9/28/14.
 * Updated 2/23/2016
 */

(function() {
    angular
        .module('grr')
        .controller('Collection', Collection)
        .controller('Projects', Projects)
        .directive('animalCard', function() {
        return {
            scope: {
                snake: '=animal'
            },
            restrict: 'E',
            link: function(scope, element, attrs){
                var animal = scope.snake;
                //scope.animalId = attrs.id;
            },
            templateUrl: '/views/templates/animalCard.html'
        };
    })
        .filter('AnimalType', AnimalTypeFilter)
    ;

    function AnimalTypeFilter(){
        return function(items, type){
            var filtered = [];

            for(var i = 0; i < items.length; i++){
                var item = items[i];

                if(type === null || type === undefined || type.value === "") {
                    return items;
                }

                switch(type.value){
                    case "":
                        filtered.push(item);
                        break;
                    case "male":
                        if(item.sex == "male") { filtered.push(item);}
                        break;
                    case "female":
                        if(item.sex == "female") { filtered.push(item); }
                        break;
                    case "adult":
                        var dob = moment(item.dob);
                        if(moment().diff(dob,'years') >= 2) { filtered.push(item); }
                        break;
                    case "baby":
                        dob = moment(item.dob);
                        if(moment().diff(dob,'years') < 2) { filtered.push(item); }
                        break;
                    case "gtp":
                        if(item.species === 'Green Tree Python') { filtered.push(item); }
                        break;
                    case "otherSnake":
                        if(item.species != 'Green Tree Python' && item.species != 'Crested Gecko') { filtered.push(item); }
                        break;
                    case "crested":
                        if(item.species === 'Crested Gecko') { filtered.push(item); }
                        break;
                }
            }

            return filtered;
        };
    }

    function Projects() {
        var vm = this;
        vm.projects = projects;
    }

    function Collection($http) {
        /* jshint validthis: true */
        var vm = this;
        vm.collection = collection;
        vm.dbCollection = GetAnimals($http, function(data){
            return data;
        });
        vm.getAnimal = function(id) { };
        vm.GetUserAnimals = GetUserAnimals;
        vm.SelectedAnimalType = {};
        vm.animalTypes = [
            { name: "Males", value: "male"},
            { name: "Females", value: "female"},
            { name: "Adults", value: "adult"},
            { name: "Babies", value: "baby"},
            { name: "Green Tree Pythons", value: "gtp"},
            { name: "Other Snakes", value: "otherSnake"},
            { name: "Crested Geckos", value: "crested"}
        ];
        return vm;
    }

    function GetUserAnimals(userId, $http, callback) {
        var url = 'http://api.herptracker.com/Users(' + userId + ')/Animals';
        $http.get(url)
            .success(function(data, status) {
            if(status == 200 && data.value.length > 0){
                return callback(data.value);
            }
        })
            .error(function(data, status) {
            return callback("Error: status = " + status);
        });
    }

    function GetAnimals($http, callback){
        var url = 'http://api.herptracker.com/odata/Animals';
        $http.get(url)
            .success(function(data) {
            if(data.value.length > 0){
                return callback(data.value);
            }
        })
            .error(function(data, status) {
            return callback("Error: " + status);
        });
    }
})();

var collection = [
    {
        id: 'EA0910Vi',
        name: 'Lucille',
        photos: [
            {filename: 'Lucille/001', caption: ''},
            {filename: 'Lucille/002', caption: ''},
            {filename: 'Lucille/003', caption: ''},
            {filename: 'Lucille/004', caption: ''},
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2009-05-10T00:00:00',
        fatherId: 'EA06028Vi',
        motherId: 'EA04019Vi',
        pairingLink: 'http://www.moreliacreations.com/Projects/2009-1.htm',
        status: 'active',
        price: 0,
        pedigree: 'Eddie Aste/OS/Lemontree',
        lineage: 'HY OS/Lemontree',
        locale: 'Sorong/Biak',
        hatchColor: 'red',
        dateAdded: '2011-05-10',
        shortDesc: 'This gorgeous female was produced by Eddie Aste from a high yellow pairing of his Shrek male and Venus female.',
        description: 'This gorgeous female was produced by Eddie Aste from a high yellow pairing of his Shrek male and Venus female. Quote from his site: <p class="quote">\'Shrek was produced by us in 2006 by Lil Bird (OS High Yellow and Lemontree Line) and Gordon (OS High Yellow). Venus was produced in 2004 through a Sorong x Biak pairing done with Rico Walder.\'</p>She was paired with my calico male, <a href="/#/Collection/MSBB0910">Dupree</a> in 2014, which <a href="/#/Projects/GRR2014">produced 16 stunning animals</a>.  I <a href="/#/Projects/GRR2015-4">repeated that pairing</a> this past season (2015), and the result is 20 eggs in the incubator as I write this (Apr 2016).'
    },
    {
        id: 'MSBB0910',
        name: 'Dupree',
        photos: [
            {filename: 'Dupree/006', caption: ''},
            {filename: 'Dupree/005', caption: ''},
            {filename: 'Dupree/001', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2009-08-28',
        fatherId: 'Mandango',
        motherId: 'Kelme (WC04)',
        status: 'active',
        price: 0,
        pedigree: 'Spataro Calico (Mandango) Sire x Buscemi Kelme Dam',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2011-04-13',
        shortDesc: 'Beautiful melanistic GTP. The sire is Marc Spataro\'s melanistic Calico male "Mandango", bred to Buddy Buscemi\'s very blue female "Kelme" in 2009.',
        description: 'Beautiful melanistic GTP. The sire is Marc Spatar\'s melanistic Calico male "Mandango", bred to Buddy Buscemi\'s very blue female "Kelme" in 2009.'
    },
    {
        id: 'SSAB 13-02',
        name: 'Cosmik Debris',
        photos: [
            {filename: 'CosmikDebris/007', caption: ''},
            {filename: 'CosmikDebris/001', caption: ''},
            {filename: 'CosmikDebris/002', caption: ''},
            {filename: 'CosmikDebris/003', caption: ''},
            {filename: 'CosmikDebris/005', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2013-05-29',
        fatherId: 'Blue Deuce',
        motherId: 'Jaya',
        status: 'active',
        price: 0,
        pedigree: 'Blue Deuce (Daddypants x TMBF)',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-07-10',
        shortDesc: 'This guy was produced by Sean and Christian Stewart, and was one of only TWO babies that hatched from this clutch! The sire is the Stewart\'s spectacular blue male Blue Deuce. The dam is a beautiful Jaya type female from Aaron Burke. I am so honored to have this guy in my collection!',
        description: 'This guy was produced by Sean and Christian Stewart, and was one of only TWO babies that hatched from this clutch! The sire is the Stewart\'s spectacular blue male Blue Deuce. The dam is a beautiful Jaya type female from Aaron Burke. I am so honored to have this guy in my collection!'
    },
    {
        id: 'JEMS1019',
        name: 'Ella',
        photos: [
            {filename: 'Ella/006', caption: ''},
            {filename: 'Ella/001', caption: ''},
            {filename: 'Ella/002', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2010-05-16',
        fatherId: 'SH05191',
        motherId: 'Arfak',
        status: 'active',
        price: 0,
        pedigree: 'SH05191 x Arfak',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2011-02-18',
        shortDesc: 'Incredible pairing of Jason Stevens\' SH05191 (Blueline/PNG produced by Rico Walder) male to Ryan Burke\'s Arfak female. I was lucky to get a neonate from this pairing, and I\'m excited to have her in my collection!',
        description: 'Incredible pairing of Jason Stevens\' SH05191 (Blueline/PNG produced by Rico Walder) male to Ryan Burke\'s Arfak female. I was lucky to get a neonate from this pairing, and I\'m excited to have her in my collection!'
    },
    {
        id: 'ML1031vi',
        name: 'Rose',
        photos: [
            {filename: 'Rose/001', caption: ''},
            {filename: 'Rose/002', caption: ''},
            {filename: 'Rose/003', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2010-06-17',
        fatherId: 'HW01.03',
        motherId: 'AK06.16',
        status: 'active',
        price: 0,
        pedigree: 'OSHY',
        locale: 'Designer',
        hatchColor: 'yellow',
        dateAdded: '2011-01-15',
        shortDesc: 'One of Mike Lockwood\'s babies from his 2010 Primavera x Sony\'s Jewel pairing. Primavera is an incredible high yellow girl with tons of spectacular lineage. Sony\'s Jewel also has a lot of great high yellow lineage, so the potential for this one is great, and I\'m psyched to have it in my collection!',
        description: 'One of Mike Lockwood\'s babies from his 2010 Primavera x Sony\'s Jewel pairing. Primavera is an incredible high yellow girl with tons of spectacular lineage. Sony\'s Jewel also has a lot of great high yellow lineage, so the potential for this one is great, and I\'m psyched to have it in my collection!'
    },
/*    {
        id: 'BK0211-06',
        name: 'Chinacat Sunflower',
        photos: [
            {filename: 'Chinacat/006', caption: 'Chinacat Sunflower'},
            {filename: 'Chinacat/005', caption: 'Chinacat Sunflower'},
            {filename: 'Chinacat/003', caption: 'Chinacat Sunflower'},
            {filename: 'Chinacat/004', caption: 'Chinacat Sunflower'},
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2011-03-25',
        fatherId: 'Jackpot',
        motherId: 'Pineapple Express`',
        status: 'active',
        price: 0,
        pedigree: 'Colclough line/HY/Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-05-03',
        description: 'This incredible female was produced by Bob Kelly and is the offspring of Jackpot and Pineapple Express. This pairing contains lineage that goes back many generations, and includes OS High Yellow, Calico, Lemontree, and the incredible black Colclough female. I am beyond excited to have this amazing girl in my collection.'
    },*/
    {
        id: 'TD.12.04',
        name: 'Cameron',
        photos: [
            {filename: 'Cameron/002', caption: ''},
            {filename: 'Cameron/003', caption: ''},
            {filename: 'Cameron/001', caption: ''},
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2012-03-01',
        fatherId: 'D`Argo',
        motherId: 'Frida',
        pairingUrl: 'http://www.houseoftheserpent.com/d\'argoxfridaclut.html',
        status: 'active',
        price: 0,
        pedigree: 'OS HY x Biak',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2011-05-05',
        shortDesc: 'Awesome dark red baby from Tad Duane`s D`Argo x Frida (OS HY x Biak) pairing.',
        description: 'Awesome dark red baby from Tad Duane`s D`Argo x Frida (OS HY x Biak) pairing.'
    },
    {
        id: 'JEMS1226',
        name: 'DynamoHum',
        photos: [
            {filename: 'DynamoHum/003', caption: ''},
            {filename: 'DynamoHum/001', caption: ''},
            {filename: 'DynamoHum/002', caption: ''},
/*
            {filename: 'DynamoHum/004', caption: ''},
            {filename: 'DynamoHum/baby01', caption: ''},
            {filename: 'DynamoHum/baby02', caption: ''},
            {filename: 'DynamoHum/baby03', caption: ''},
*/
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2012-04-15',
        fatherId: 'Cimbaby',
        motherId: 'Arfak',
        status: 'active',
        price: 0,
        pedigree: 'Cimbaby x Arfak',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2012-10-22',
        shortDesc: 'Jason Stevens, of Colorado Chondros, gave me first pick from this amazing pairing of Ryan Burke\'s Arfak female to Cimbaby, an Eddie Aste Cimber x Blue Streak male.',
        description: 'Jason Stevens, of Colorado Chondros, gave me first pick from this amazing pairing of Ryan Burke\'s Arfak female to Cimbaby, an Eddie Aste Cimber x Blue Streak male.'
    },
    {
        id: 'BMJL07',
        name: 'Jack Straw',
        photos: [
            {filename: 'Jack Straw/003', caption: ''},
            {filename: 'Jack Straw/002', caption: ''},
            {filename: 'Jack Straw/004', caption: ''},
            {filename: 'Jack Straw/005', caption: ''},
            {filename: 'Jack Straw/001', caption: ''},
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2010-07-30',
        fatherId: '',
        motherId: '',
        status: 'active',
        price: 0, //400
        includeShipping: true,
        pedigree: 'Bushmaster',
        locale: 'Jayapura x Lereh',
        hatchColor: 'red',
        dateAdded: '2010-10-27',
        shortDesc: 'This is a Bushmaster-bred Jayapura x Lereh.  This guy is a beautiful example of both localities, displaying some beautiful shades of green as well as fine blue diamonds.',
        description: 'Acquired from Ryan at Clockwork Reptile Company. This is a Bushmaster-bred Jayapura x Lereh.  This guy is a beautiful example of both localities, displaying some beautiful shades of green as well as fine blue diamonds.  Unfortunately this one developed a tail kink as it approached adulthood.  It can be seen in a couple of his pics.  It is unknown whether this would affect his ability to breed, as I haven\'t yet paired him up.  This is reflected in his asking price.'
    },
    {
        id: 'MV-Arutype-14(6)',
        name: 'Sunshine Daydream',
        photos: [
            {filename: 'SunshineDaydream/004', caption: ''},
            {filename: 'SunshineDaydream/003', caption: ''},
            {filename: 'SunshineDaydream/002', caption: ''},
            {filename: 'SunshineDaydream/001', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-08-16',
        fatherId: 'M-MV-Arutype-09',
        motherId: 'F-MV-Arutype-08',
        status: 'active',
        price: 0,
        pedigree: 'Aru x Aru',
        locale: 'Aru',
        hatchColor: 'yellow',
        dateAdded: '2015-04-02',
        shortDesc: 'Produced by Tres Clark and Phil Bradley of Tar River Reptiles (tarriverreptiles.com) from an Aru x Aru pairing (F-MV-Arutype-08 x M-MV-Arutype-09).',
        description: 'Produced by Tres Clark and Phil Bradley of Tar River Reptiles (tarriverreptiles.com) from an Aru x Aru pairing (F-MV-Arutype-08 x M-MV-Arutype-09).'
    },
    {
        id: 'VCRP-14-05',
        name: 'Scarlet Fire',
        photos: [
            {filename: 'ScarletFire/010', caption: 'Nov 11, 2015'},
            {filename: 'ScarletFire/009', caption: 'Nov 11, 2015'},
            {filename: 'ScarletFire/011', caption: 'Nov 11, 2015'},
            {filename: 'ScarletFire/007', caption: 'Oct 24, 2015'},
            {filename: 'ScarletFire/006', caption: 'Aug 8, 2015'},
            {filename: 'ScarletFire/004', caption: 'July 11, 2015'},
            {filename: 'ScarletFire/005', caption: 'July 11, 2015'},
            {filename: 'ScarletFire/003', caption: ''},
            {filename: 'ScarletFire/001', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2014-03-28',
        fatherId: 'BT-10-17',
        motherId: 'MSBB0913',
        status: 'active',
        price: 0,
        pedigree: 'Calico x AruBiak',
        locale: 'designer',
        hatchColor: 'red',
        dateAdded: '2015-05-27',
        shortDesc: 'This guy is the product of a joint pairing between Randall Pearson and Vita Cernoch. Pairing Rhea, Randall\'s Arubiak, with Vita\'s Calico/Jayapura male Baldur.',
        description: 'This guy is the product of a joint pairing between Randall Pearson and Vita Cernoch. Pairing Rhea, Randall\'s Arubiak, with Vita\'s Calico/Jayapura male Baldur.'
    },
    {
        id: 'SH08146',
        name: 'Ziggy',
        photos: [
            {filename: 'Ziggy/001', caption: ''},
            {filename: 'Ziggy/002', caption: ''},
            {filename: 'Ziggy/003', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2008-07-29',
        fatherId: 'Erickson Blue Male',
        motherId: 'SH00111',
        pairingUrl: 'http://www.signalherp.com/00111%2008.htm',
        status: 'active',
        price: 0,
        pedigree: 'Signal Herp Blue Line',
        locale: 'designer',
        hatchColor: 'yellow',
        dateAdded: '2010-08-10',
        shortDesc: 'Gorgeous green male with electric blue stripe. Sire was all blue wild caught, Dam produced the Walder "Tiger Stripe" and "Blue Max" clutches.',
        description: 'Gorgeous green male with electric blue stripe. Sire was all blue wild caught, Dam produced the Walder "Tiger Stripe" and "Blue Max" clutches. This guy was produced by Rico Walder using a blue male on loan from Pete Erickson. I got him from Pete Erickson. More info on Dam: 00111 is the grand dam to the Tiger Stripe female. So she\'s the grand dam to all of the crazy stuff she\'s produced. She\'s also in many pedigrees of high blue animals.'
    },
    {
        id: 'SH09072',
        name: 'Tennessee Jed',
        photos: [
            {filename: 'Jed/004', caption: ''},
            {filename: 'Jed/003', caption: ''},
            {filename: 'Jed/002', caption: ''},
            {filename: 'Jed/001', caption: ''},
            {filename: 'Jed/006', caption: ''},
            {filename: 'Jed/005', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'male',
        dob: '2009-07-13',
        fatherId: 'SH06033',
        motherId: 'SH04047',
        pairingUrl: 'http://www.signalherp.com/04047%2009.htm',
        status: 'active',
        price: 0, // 1250
        includeShipping: false,
        pedigree: 'Biak Outcross',
        locale: 'Biak',
        hatchColor: 'red',
        dateAdded: '2010-10-23',
        shortDesc: 'This guy was a red neonate, produced from the pairing of Rico\'s beautiful Biak 04047, to the spectacular 06033, a Greg Stephens production from a pairing of a Superiori type female to an undocumented high yellow line male.',
        description: 'This guy was a red neonate, produced from the pairing of Rico\'s beautiful Biak 04047, to the spectacular 06033, a Greg Stephens production from a pairing of a Superiori type female to an undocumented high yellow line male.  This male has taken on a very rich mustard coloring that looks fantastic in person.  It\'s very hard to capture in photos though...  From Signal Herp clutch description: This pairing should be 3/4 Biak type with the potential for some black speckling. Several of the sire\'s siblings held a great deal of black pigment.'
    },
    {
        id: 'SIN2011_F',
        name: 'Lil',
        photos: [
            {filename: 'Lil/002', caption: ''},
            {filename: 'Lil/001', caption: ''}
        ],
        speciesLatin: 'Lampropeltis triangulum sinaloae',
        species: 'Sinaloan Milksnake',
        sex: 'female',
        dob: '2010-11-02',
        fatherId: '',
        motherId: '',
        pairingUrl: '',
        status: 'active',
        price: 0,
        pedigree: 'aberrant',
        locale: 'Sinaloan',
        hatchColor: '',
        dateAdded: '2012-02-09',
        shortDesc: 'Aberrant Sinaloan Milk Snake from Lucky Dragon Geckos in FL',
        description: 'Aberrant Sinaloan Milk Snake from Lucky Dragon Geckos in FL'
    },
    {
        id: 'SIN2011_M',
        name: 'Rocky',
        photos: [
            {filename: 'Rocky/003', caption: ''},
            {filename: 'Rocky/002', caption: ''},
            {filename: 'Rocky/001', caption: ''}
        ],
        speciesLatin: 'Lampropeltis triangulum sinaloae',
        species: 'Sinaloan Milksnake',
        sex: 'male',
        dob: '2010-11-02',
        fatherId: '',
        motherId: '',
        status: 'active',
        price: 0,
        pedigree: 'aberrant',
        locale: 'Sinaloan',
        hatchColor: '',
        dateAdded: '2012-02-09',
        shortDesc: 'Aberrant Sinaloan Milk Snake from Lucky Dragon Geckos in FL',
        description: 'Aberrant Sinaloan Milk Snake from Lucky Dragon Geckos in FL'
    },
    {
        id: 'GRR1401',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1401', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'deceased',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'yellow',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1402',
        name: 'Fatalii',
        photos: [
            {filename: 'GRR1402/005', caption: ''},
            {filename: 'GRR1402/004', caption: ''},
            {filename: 'GRR1402/003', caption: ''},
            {filename: 'GRR1402/001', caption: ''},
            {filename: 'GRR1402/002', caption: ''},
            {filename: 'GRR2014/GRR1402', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'active',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: '2014 Lucille x Dupree kid who has a very unique look.  Not sure how this one will end up, but it sure is fun watching it change!',
        description: '2014 Lucille x Dupree kid who has a very unique look.  Not sure how this one will end up, but it sure is fun watching it change!',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1403',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1403', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1400,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1404',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1404c', caption: ''},
            {filename: 'GRR2014/GRR1404', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1400,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1405',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1405b', caption: ''},
            {filename: 'GRR2014/GRR1405', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1750,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1406',
        name: 'Tiger Paw',
        photos: [
            {filename: 'GRR1406/011', caption: '2-14-2016'},
            {filename: 'GRR1406/012', caption: '2-14-2016'},
            {filename: 'GRR1406/013', caption: '2-14-2016'},
            {filename: 'GRR1406/010', caption: ''},
            {filename: 'GRR1406/009', caption: ''},
            {filename: 'GRR1406/007', caption: ''},
            {filename: 'GRR1406/006', caption: ''},
            {filename: 'GRR1406/004', caption: ''},
            {filename: 'GRR1406/001', caption: ''},
            {filename: 'GRR2014/GRR1406', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'active',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: '2014 Lucille x Dupree offspring - this one looks like it could go very high yellow like mama.',
        description: '2014 Lucille x Dupree offspring - this one looks like it could go very high yellow like mama.' +
                    ' This one was recently (2/12/2016) probed and determined likely to be female.',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1407',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1407', caption: 'baby pic'},
            {filename: 'GRR2014/GRR1407c', caption: 'Post Shed'},
            {filename: 'GRR2014/GRR1407e', caption: 'Gaining black scales'},
            {filename: 'GRR2014/GRR1407f', caption: 'Gaining black scales'}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1400,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1408',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1408', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'deceased',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1409',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1409', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'deceased',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'yellow',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1410',
        name: 'Malagueta',
        photos: [
            {filename: 'GRR1410/013', caption: '11-14-2015'},
            {filename: 'GRR1410/012', caption: '11-14-2015'},
            {filename: 'GRR1410/011', caption: '11-14-2015'},
            {filename: 'GRR1410/010', caption: '11-14-2015'},
            {filename: 'GRR1410/009', caption: '11-14-2015'},
            {filename: 'GRR1410/006', caption: ''},
            {filename: 'GRR1410/005', caption: ''},
            {filename: 'GRR1410/002', caption: ''},
            {filename: 'GRR1410/001', caption: ''},
            {filename: 'GRR2014/GRR1410', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'active',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'This beautiful 2014 Lucille x Dupree kid was my pick of the clutch' +
        ' when they all hatched out, and is still one of the best looking kids from that pairing.',
        description: 'This beautiful 2014 Lucille x Dupree kid was my pick of the clutch' +
        ' when they all hatched out, and is still one of the best looking kids from that pairing.  ' +
        'I think this one will be something special when it\'s done changing...  Based on recent' +
        ' shed (2/1/2016), I believe this one is a female.',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1411',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1411', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'deceased',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1412',
        name: 'Bhut Jolokia',
        photos: [
            {filename: 'GRR1412/022', caption: '05-18-2016'},
            {filename: 'GRR1412/021', caption: '05-18-2016'},
            {filename: 'GRR1412/023', caption: '05-18-2016'},
            {filename: 'GRR1412/020', caption: '05-18-2016'},
            {filename: 'GRR1412/012', caption: ''},
            {filename: 'GRR1412/018', caption: ''},
            {filename: 'GRR1412/016', caption: ''},
            {filename: 'GRR1412/015', caption: ''},
            {filename: 'GRR1412/014', caption: ''},
            {filename: 'GRR1412/013', caption: ''},
            {filename: 'GRR2014/GRR1412', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'active',
        price: 0,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'One of my favorites of the entire 2014 Lucille x Dupree clutch, this one continues to change in a good direction. ' +
        ' This one was recently (2/12/2016) probed and determined likely to be female.',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1413',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1413', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1500,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1414',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1414', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1500,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1415',
        name: '',
        photos: [
            {filename: 'GRR2014/GRR1415b', caption: 'Taken by Alexis Marie'},
            {filename: 'GRR2014/GRR1415', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1500,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2014-04-16',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1416',
        name: 'Habanero',
        photos: [
            {filename: 'GRR1416/005', caption: '2-14-2016'},
            {filename: 'GRR1416/007', caption: '2-14-2016'},
            {filename: 'GRR1416/004', caption: ''},
            {filename: 'GRR1416/001', caption: ''},
            {filename: 'GRR1416/003', caption: ''},
            {filename: 'GRR2014/GRR1416', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'female',
        dob: '2014-04-16',
        motherId: 'EA0910Vi',
        fatherId: 'MSBB0910',
        status: 'sold',
        price: 1750,
        pedigree: 'OS HY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'yellow',
        dateAdded: '2014-04-16',
        shortDesc: 'This is the only surviving yellow neonate from my 2014 Lucille x Dupree pairing, and it looks great!  Based on a recent shed and probing, I believe this one is a female, although that is not guaranteed.',
        description: 'This is the only surviving yellow neonate from my 2014 Lucille x Dupree pairing, and it looks great!  Based on a recent shed and probing, I believe this one is a female, although that is not guaranteed.',
        productOfProject: 'GRR2014'
    },
    {
        id: 'GRR1501',
        name: '',
        photos: [
            {filename: 'GRR2015/GRR1501a', caption: ''},
            {filename: 'GRR2015/GRR1501b', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1400,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1502',
        name: '',
        photos: [
            {filename: 'GRR2015/GRR1502b', caption: '5-19-2016'},
            {filename: 'GRR2015/GRR1502', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1400,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '1/19/2015',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1503',
        name: '',
        photos: [
            {filename: 'GRR1503/002', caption: 'August 8, 2015'},
            {filename: 'GRR1503/001', caption: ''},
            {filename: 'GRR2015/GRR1503a', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1250,
        includeShipping: true,
        pedigree: ' Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1504',
        name: 'Jumping Jack Flash',
        photos: [
            {filename: 'GRR1504/009', caption: '07-31-2016'},
            {filename: 'GRR1504/010', caption: '07-31-2016'},
            {filename: 'GRR1504/007', caption: '2016-05-21'},
            {filename: 'GRR1504/005', caption: '2016-05-21'},
            {filename: 'GRR1504/006', caption: '2016-05-21'},
            {filename: 'GRR1504/008', caption: '2016-05-21'},
            {filename: 'GRR1504/004', caption: '2016-05-21'},
            {filename: 'GRR1504/001', caption: ''},
            {filename: 'GRR2015/GRR1504', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'active',
        price: 0,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1505',
        name: 'Sway',
        photos: [
            {filename: 'GRR1505/002', caption: ''},
            {filename: 'GRR1505/001', caption: ''},
            {filename: 'GRR2015/GRR1505a', caption: ''},
            {filename: 'GRR2015/GRR1505b', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 850,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1506',
        name: 'Ruby Tuesday',
        photos: [
            {filename: 'GRR1506/016', caption: '07-31-2016'},
            {filename: 'GRR1506/015', caption: '07-31-2016'},
            {filename: 'GRR1506/014', caption: '07-31-2016'},
            {filename: 'GRR1506/010', caption: '05-18-2016'},
            {filename: 'GRR1506/013', caption: '05-18-2016'},
            {filename: 'GRR1506/012', caption: '05-18-2016'},
            {filename: 'GRR1506/003', caption: ''},
            {filename: 'GRR1506/004', caption: ''},
            {filename: 'GRR1506/005', caption: ''},
            {filename: 'GRR1506/002', caption: ''},
            {filename: 'GRR2015/GRR1506', caption: '' },
            {filename: 'GRR2015/GRR1506a', caption: ''},
            {filename: 'GRR2015/GRR1506b', caption: ''},
            {filename: 'GRR2015/GRR1506c', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'active',
        price: 0,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1507',
        name: '',
        photos: [
            {filename: 'GRR2015/GRR1507', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'deceased',
        price: 0,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1508',
        name: '',
        photos: [
            {filename: 'GRR2015/GRR1508a', caption: 'Post-shed'},
            {filename: 'GRR2015/GRR1508', caption: 'Pre-shed'}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1250,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1509',
        name: 'Brown Sugar',
        photos: [
            {filename: 'GRR1509/014', caption: '07-31-2016'},
            {filename: 'GRR1509/015', caption: '07-31-2016'},
            {filename: 'GRR1509/010', caption: '05-18-2016'},
            {filename: 'GRR1509/011', caption: '05-18-2016'},
            {filename: 'GRR1509/012', caption: '05-18-2016'},
            {filename: 'GRR1509/004', caption: ''},
            {filename: 'GRR1509/005', caption: ''},
            {filename: 'GRR1509/006', caption: ''},
            {filename: 'GRR1509/007', caption: ''},
            {filename: 'GRR1509/002', caption: ''},
            {filename: 'GRR1509/001', caption: ''},
            {filename: 'GRR2015/GRR1509c', caption: ''},
            {filename: 'GRR2015/GRR1509b', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'active',
        price: 0,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1510',
        name: 'Tumbling Dice',
        photos: [
            { filename: 'GRR1510/004', caption: ''},
            { filename: 'GRR1510/006', caption: ''},
            { filename: 'GRR1510/007', caption: ''},
            { filename: 'GRR1510/003', caption: ''},
            { filename: 'GRR1510/002', caption: ''},
            { filename: 'GRR1510/001', caption: ''},
            { filename: 'GRR2015/GRR1510b', caption: ''}
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 850,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1511',
        name: '',
        photos: [
            { filename: 'GRR2015/GRR1511a', caption: 'Post-shed' },
            { filename: 'GRR2015/GRR1511b', caption: 'Back pattern' },
            { filename: 'GRR2015/GRR1511', caption: 'Pre-shed' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'deceased',
        price: 0,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1512',
        name: '',
        photos: [
            { filename: 'GRR2015/GRR1512', caption: '' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'deceased',
        price: 0,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1513',
        name: '',
        photos: [
            { filename: 'GRR1513/005', caption: 'Photo by Alexis Marie' },
            { filename: 'GRR1513/004', caption: '' },
            { filename: 'GRR1513/003', caption: '' },
            { filename: 'GRR1513/001', caption: '' },
            { filename: 'GRR1513/002', caption: '' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1250,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1514',
        name: '',
        photos: [
            { filename: 'GRR2015/GRR1514', caption: '' },
            { filename: 'GRR2015/GRR1514a', caption: '' },
            { filename: 'GRR2015/GRR1514b', caption: '' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2015-01-19',
        fatherId: 'MSBB0910',
        motherId: 'JEMS1019',
        status: 'sold',
        price: 1000,
        includeShipping: false,
        pedigree: 'Arfak OC x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2015-01-19',
        shortDesc: 'Ella x Dupree neonate',
        description: 'Ella x Dupree neonate',
        productOfProject: 'GRR2015-1'
    },
    {
        id: 'GRR1601',
        name: 'Galaxy',
        photos: [
            { filename: 'GRR2016/GRR1601c', caption: 'After First Shed' },
            { filename: 'GRR2016/GRR1601d', caption: 'After First Shed' },
            { filename: 'GRR2016/GRR1601a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 2950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 8,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'I love the "fuzzy" pattern this one has - very unique among this entire clutch.',
        description: 'I love the "fuzzy" pattern this one has - very unique among this entire clutch.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1602',
        name: 'Perihelion',
        photos: [
            { filename: 'GRR1602/004', caption: '7/23/16' },
            { filename: 'GRR1602/003', caption: '7/23/16' },
            { filename: 'GRR1602/001', caption: 'After first shed' },
            { filename: 'GRR1602/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1602a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 2850,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 9,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one reminds me a lot of how Bhut Jolokia looked when she was a neonate.',
        description: 'This one reminds me a lot of how <a href="/#/Collection/GRR1412">Bhut Jolokia</a> looked when she was a neonate.  In particular, the bright orange diamonds really stand out.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1603',
        name: 'Aurora',
        photos: [
            { filename: 'GRR1603/001', caption: '7-26-16' },
            { filename: 'GRR1603/002', caption: '7-26-16' },
            { filename: 'GRR2016/GRR1603a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 1950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 9,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Beautiful reduced pattern on this yellow neonate.',
        description: 'Beautiful reduced pattern on this yellow neonate.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1604',
        name: 'Pulsar',
        photos: [
            { filename: 'GRR1604/004', caption: 'First shed' },
            { filename: 'GRR1604/005', caption: 'First shed' },
            { filename: 'GRR2016/GRR1604a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 2650,
        includeShipping: true,
        takenMeal: true,
        fullPinkiesTaken: 12,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1605',
        name: 'Caldera',
        photos: [
            { filename: 'GRR1605/002', caption: 'After first shed' },
            { filename: 'GRR1605/001', caption: 'After first shed' },
            { filename: 'GRR1605/003', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1605a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1605b', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 1,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one is really something special.  One of several in this clutch that has almost no dorsal pattern, but a strong, black stripe going down it\'s back.',
        description: 'This one is really something special.  One of several in this clutch that has almost no dorsal pattern, but a strong, black stripe going down it\'s back.  The rich shade of red this one has is just the icing on the cake.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1606',
        name: 'Ultraviolet',
        photos: [
            { filename: 'GRR1606/008', caption: 'After 5 meals' },
            { filename: 'GRR1606/007', caption: 'After 5 meals' },
            { filename: 'GRR1606/006', caption: 'After 5 meals' },
            { filename: 'GRR1606/003', caption: 'After first shed' },
            { filename: 'GRR1606/004', caption: 'After first shed' },
            { filename: 'GRR1606/005', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1606a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 2850,
        includeShipping: true,
        takenMeal: true,
        fullPinkiesTaken: 11,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one has a beautiful "velvet" appearance with bright, orange diamonds.',
        description: 'This one has a beautiful "velvet" appearance with bright, orange diamonds.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1607',
        name: 'Quasar',
        photos: [
            { filename: 'GRR1607/001', caption: 'After First Shed' },
            { filename: 'GRR1607/002', caption: 'After First Shed' },
            { filename: 'GRR2016/GRR1607a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 2850,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 14,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one is very similar to #6 in appearance, although it has a richer red color.',
        description: 'This one is very similar to #6 in appearance, although it has a richer red color.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1608',
        name: 'Solar Flare',
        photos: [
            { filename: 'GRR2016/GRR1608b', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1608a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 1950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 9,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Of all of the yellow neonates in this group, this one has the most reduced pattern.',
        description: 'Of all of the yellow neonates in this group, this one has the most reduced pattern.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1609',
        name: 'Umbra',
        photos: [
            { filename: 'GRR1609/001', caption: 'After first shed' },
            { filename: 'GRR1609/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1609a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1609b', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'feeding',
        price: 2650,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 4,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1610',
        name: 'Solstice',
        photos: [
            { filename: 'GRR1610/001', caption: 'After first shed' },
            { filename: 'GRR1610/002', caption: 'After first shed' },
            { filename: 'GRR1610/003', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1610a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 1950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 3,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Another reduced pattern yellow, with a nice, beautiful stripe.',
        description: 'Another reduced pattern yellow, with a nice, beautiful stripe.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1611',
        name: 'Patera',
        photos: [
            { filename: 'GRR1611/001', caption: 'After first shed' },
            { filename: 'GRR1611/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1611a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'feeding',
        price: 2750,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 0,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1612',
        name: 'Supernova',
        photos: [
            { filename: 'GRR1612/001', caption: 'After first shed' },
            { filename: 'GRR1612/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1612a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 1950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 4,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one also has a nice dark stripe running down it\'s back.',
        description: 'This one also has a nice dark stripe running down it\'s back.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1613',
        name: 'Parsec',
        photos: [
            { filename: 'GRR1613/001', caption: 'After first shed' },
            { filename: 'GRR1613/002', caption: 'After first shed' },
            { filename: 'GRR1613/003', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1613a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'sold',
        price: 1950,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 0,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Beautiful yellow baby',
        description: 'Beautiful yellow baby',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1614',
        name: 'Ceres',
        photos: [
            { filename: 'GRR1614/005', caption: '07/31/2016' },
            { filename: 'GRR1614/006', caption: '07/31/2016' },
            { filename: 'GRR1614/001', caption: 'After first shed' },
            { filename: 'GRR1614/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1614a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1614b', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1614c', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 6,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This one appears to almost completely lack dark pigment in it\'s pattern.  Not sure what that means, but it\'s cool!',
        description: 'This one appears to almost completely lack dark pigment in it\'s pattern.  Not sure what that means, but it\'s cool!',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1615',
        name: 'Redshift',
        photos: [
            { filename: 'GRR1615/003', caption: 'After First Shed' },
            { filename: 'GRR1615/001', caption: 'After First Shed' },
            { filename: 'GRR1615/002', caption: 'After First Shed' },
            { filename: 'GRR2016/GRR1615a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 1,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'I\'m only holding this one back because it hasn\'t shed yet.  Once it sheds, I will make a decision about whether to keep it or not.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1616',
        name: 'Comet',
        photos: [
            { filename: 'GRR1616/003', caption: 'After first shed' },
            { filename: 'GRR1616/004', caption: 'After first shed' },
            { filename: 'GRR1616/001', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1616b', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1616a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 3,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Lucille x Dupree neonate',
        description: 'Lucille x Dupree neonate',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1617',
        name: 'Nebula',
        photos: [
            { filename: 'GRR2016/GRR1617b', caption: '08-01-2016' },
            { filename: 'GRR2016/GRR1617a', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 1950,
        includeShipping: true,
        takenMeal: true,
        fullPinkiesTaken: 12,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Yet another very reduced pattern yellow, as seems standard with this lineage.',
        description: 'Yet another very reduced pattern yellow, as seems standard with this lineage.',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1618',
        name: 'Equinox',
        photos: [
            { filename: 'GRR1618/008', caption: 'First shed' },
            { filename: 'GRR1618/006', caption: 'First shed' },
            { filename: 'GRR1618/007', caption: 'First shed' },
            { filename: 'GRR1618/002', caption: 'First shed' },
            { filename: 'GRR1618/003', caption: 'First shed' },
            { filename: 'GRR1618/005', caption: 'First shed' },
            { filename: 'GRR1618/001', caption: 'First shed' },
            { filename: 'GRR2016/GRR1618a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1618b', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1618c', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 7,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Incredible, nearly patternless baby.  The appearance is striking - very excited to see how this one progresses!',
        description: 'Incredible, nearly patternless baby.  The appearance is striking - very excited to see how this one progresses!',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1619',
        name: 'Zenith',
        photos: [
            { filename: 'GRR1619/007', caption: '07/31/2016' },
            { filename: 'GRR1619/005', caption: '07/31/2016' },
            { filename: 'GRR1619/003', caption: 'After first shed' },
            { filename: 'GRR1619/004', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1619a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1619b', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 5,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'Another very dark, nearly patternless neonate, similar to #20',
        description: 'Another very dark, nearly patternless neonate, similar to #20',
        productOfProject: 'GRR2015-4'
    },
    {
        id: 'GRR1620',
        name: 'Dark Matter',
        photos: [
            { filename: 'GRR1620/005', caption: 'July 16, 2016' },
            { filename: 'GRR1620/006', caption: 'July 16, 2016' },
            { filename: 'GRR1620/007', caption: 'July 16, 2016' },
            { filename: 'GRR1620/003', caption: 'After first shed' },
            { filename: 'GRR1620/004', caption: 'After first shed' },
            { filename: 'GRR1620/001', caption: 'After first shed' },
            { filename: 'GRR1620/002', caption: 'After first shed' },
            { filename: 'GRR2016/GRR1620d', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1620e', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1620a', caption: 'Hatch Pic' },
            { filename: 'GRR2016/GRR1620b', caption: 'Hatch Pic' }
        ],
        speciesLatin: 'Morelia Viridis',
        species: 'Green Tree Python',
        sex: 'unknown',
        dob: '2016-05-30',
        fatherId: 'MSBB0910',
        motherId: 'EA0910Vi',
        status: 'Hold',
        price: 0,
        includeShipping: false,
        takenMeal: true,
        fullPinkiesTaken: 9,
        pedigree: 'OSHY/Lemontree x Calico',
        locale: 'Designer',
        hatchColor: 'red',
        dateAdded: '2016-05-30',
        shortDesc: 'This clutch has many outstanding neonates, but I have to say, this one is really something special.  It\'s completely black, or at least appears that way.',
        description: 'This clutch has many outstanding neonates, but I have to say, this one is really something special.  It\'s completely black, or at least appears that way.',
        productOfProject: 'GRR2015-4'
    }
];
