/**
 * Created by Eddie on 9/28/14.
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
                        if(moment().diff(dob,'years') > 3) { filtered.push(item); }
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
            description: 'This girl was produced by Eddie Aste. This was a HY pairing of his Shrek male and Venus female. From his site: Shrek was produced by us in 2006 by Lil Bird (OS High Yellow and Lemontree Line) and Gordon (OS High Yellow). Venus was produced in 2004 through a Sorong x Biak pairing done with Rico Walder.'
        },
        {
            id: 'MSBB0910',
            name: 'Dupree',
            photos: [
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
            description: 'Beautiful melanistic GTP. The sire is Marc Spataro`s melanistic Calico male "Mandango", bred to Buddy Buscemi`s very blue female "Kelme" in 2009.'
        },
        {
            id: 'JEMS1019',
            name: 'Ella',
            photos: [
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
            description: 'Incredible pairing of Jason Stevens` SH05191 (Blueline/PNG produced by Rico Walder) male to Ryan Burke`s Arfak female. I was lucky to get a neonate from this pairing, and I`m excited to have her in my collection!'
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
            description: 'One of Mike Lockwood\'s babies from his 2010 Primavera x Sony\'s Jewel pairing. Primavera is an incredible high yellow girl with tons of spectacular lineage. Sony\'s Jewel also has a lot of great high yellow lineage, so the potential for this one is great, and I\'m psyched to have it in my collection!'
        },
        {
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
        },
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
            description: 'Awesome dark red baby from Tad Duane`s D`Argo x Frida (OS HY x Biak) pairing.'
        },
        {
            id: 'JEMS1226',
            name: 'DynamoHum',
            photos: [
                {filename: 'DynamoHum/001', caption: ''},
                {filename: 'DynamoHum/002', caption: ''},
                {filename: 'DynamoHum/003', caption: ''},
                {filename: 'DynamoHum/004', caption: ''},
                {filename: 'DynamoHum/baby01', caption: ''},
                {filename: 'DynamoHum/baby02', caption: ''},
                {filename: 'DynamoHum/baby03', caption: ''},
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
            description: 'Jason Stevens, of Colorado Chondros, gave me first pick from this amazing pairing of Ryan Burke\'s Arfak female to Cimbaby, an Eddie Aste Cimber x Blue Streak male.'
        },
        {
            id: 'MV-Arutype-14(6)',
            name: 'Sunshine Daydream',
            photos: [
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
            description: 'Produced by Tres Clark and Phil Bradley of Tar River Reptiles (tarriverreptiles.com) from an Aru x Aru pairing (F-MV-Arutype-08 x M-MV-Arutype-09).'
        },
        {
            id: 'VCRP-14-05',
            name: 'Scarlet Fire',
            photos: [
                {filename: 'ScarletFire/004', caption: 'Black Chondro'},
                {filename: 'ScarletFire/005', caption: 'Black Back'},
                {filename: 'ScarletFire/003', caption: ''},
                {filename: 'ScarletFire/002', caption: ''},
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
            description: 'This was a joint pairing between Randall Pearson and Vita Cernoch. Pairing Rhea, Randall\'s Arubiak, with Vita\'s Calico/Jayapura male Baldur.'
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
            description: 'Gorgeous green male with electric blue stripe. Sire was all blue wild caught, Dam produced the Walder "Tiger Stripe" and "Blue Max" clutches. This guy was produced by Rico Walder using a blue male on loan from Pete Erickson. I got him from Pete Erickson. More info on Dam: 00111 is the grand dam to the Tiger Stripe female. So she\'s the grand dam to all of the crazy stuff she\'s produced. She\'s also in many pedigrees of high blue animals.'
        },
        {
            id: 'SH09072',
            name: 'Tennessee Jed',
            photos: [
                {filename: 'Jed/002', caption: ''},
                {filename: 'Jed/001', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'male',
            dob: '2009-07-13',
            fatherId: 'SH06033',
            motherId: 'SH04047',
            pairingUrl: 'http://www.signalherp.com/04047%2009.htm',
            status: 'active',
            price: 0,
            pedigree: 'Biak Outcross',
            locale: 'Biak',
            hatchColor: 'red',
            dateAdded: '2010-10-23',
            description: 'From Signal Herp clutch description: This pairing should be 3/4 Biak type with the potential for some black speckling. Several of the sire\'s siblings held a great deal of black pigment.  This male has taken on a very rich mustard coloring that looks fantastic in person.  It\'s very hard to capture in photos though...'
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'deceased',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'yellow',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1402',
            name: 'Fatalii',
            photos: [
                {filename: 'GRR2014/GRR1402', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'active',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 1400,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1404',
            name: '',
            photos: [
                {filename: 'GRR2014/GRR1404', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 1400,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1405',
            name: 'Tabiche',
            photos: [
                {filename: 'GRR2014/GRR1405', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 1750,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1406',
            name: 'Tiger Paw',
            photos: [
                {filename: 'GRR2014/GRR1406', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'active',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 1400,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'deceased',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'deceased',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'yellow',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1410',
            name: 'Malagueta',
            photos: [
                {filename: 'GRR1410/001', caption: ''},
                {filename: 'GRR1410/002', caption: ''},
                {filename: 'GRR1410/003', caption: ''},
                {filename: 'GRR1410/004', caption: ''},
                {filename: 'GRR1410/005', caption: ''},
                {filename: 'GRR2014/GRR1410', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'active',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'deceased',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1412',
            name: 'Bhut Jolokia',
            photos: [
                {filename: 'GRR2014/GRR1412', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'active',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
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
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1415',
            name: '',
            photos: [
                {filename: 'GRR2014/GRR1415', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'sold',
            price: 1500,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
            productOfProject: 'GRR2014'
        },
        {
            id: 'GRR1416',
            name: 'Habanero',
            photos: [
                {filename: 'GRR2014/GRR1416', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2014-04-16',
            fatherId: 'EA0910Vi',
            motherId: 'MSBB0910',
            status: 'active',
            price: 0,
            pedigree: 'OS HY/Lemontree x Calico',
            locale: 'Designer',
            hatchColor: 'yellow',
            dateAdded: '2014-04-16',
            description: 'Lucille x Dupree neonate',
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
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'sold',
            price: 1400,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1502',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1502', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'sold',
            price: 1400,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '1/19/2015',
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
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'available',
            price: 1250,
            includeShipping: true,
            pedigree: ' Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1504',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1504', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1505',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1505a', caption: ''},
                {filename: 'GRR2015/GRR1505b', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1506',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1506', caption: '' },
                {filename: 'GRR2015/GRR1506a', caption: ''},
                {filename: 'GRR2015/GRR1506b', caption: ''},
                {filename: 'GRR2015/GRR1506c', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
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
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'deceased',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
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
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'sold',
            price: 1250,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1509',
            name: '',
            photos: [
                //{filename: 'GRR2015/GRR1509a', caption: ''},
                {filename: 'GRR2015/GRR1509c', caption: ''},
                {filename: 'GRR2015/GRR1509b', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1510',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1510b', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
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
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'deceased',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate.  This one has always been a very stubborn eater.  I had gotten it to take pinkies regularly, but I guess not reguarly enough.  It was still fairly frail, and gave up last night.  Got my hopes up for this one, sorry it didn\'t make it.',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1512',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1512', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'active',
            price: 0,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1513',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1513a', caption: ''},
                {filename: 'GRR2015/GRR1513b', caption: ''}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'sold',
            price: 1400,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'GRR1514',
            name: '',
            photos: [
                {filename: 'GRR2015/GRR1514a', caption: ''},
                {filename: 'GRR2015/GRR1514b', caption: ''},
                {filename: 'GRR2015/GRR1514', caption: 'neonate'}
            ],
            speciesLatin: 'Morelia Viridis',
            species: 'Green Tree Python',
            sex: 'unknown',
            dob: '2015-01-19',
            fatherId: 'EA0910Vi',
            motherId: 'JEMS1019',
            status: 'deceased',
            price: 0,
            includeShipping: true,
            pedigree: 'Arfak OC x Calico',
            locale: 'Designer',
            hatchColor: 'red',
            dateAdded: '2015-01-19',
            description: 'Ella x Dupree neonate - unfortunately this one suffered a blockage of hard urates, and I didn\'t catch it in time to save it.',
            productOfProject: 'GRR2015-1'
        },
        {
            id: 'Dewey',
            name: 'Dewey',
            photos: [
                {filename: 'Dewey', caption: 'Dewey'}
            ],
            speciesLatin: 'Acrantophis dumerili',
            species: 'Dumeril\'s Boa',
            sex: 'male',
            dob: '2008-12-25',
            fatherId: '',
            motherId: '',
            status: 'active',
            price: 0,
            pedigree: '',
            locale: '',
            hatchColor: '',
            dateAdded: '2009-09-27',
            description: 'Dewey is the first snake I ever bought.  He\'s pretty big now, but I still love him.  Just not interested in producing them...'
        },
        {
            id: 'Sirius',
            name: 'Sirius',
            photos: [
                {filename: 'Sirius01', caption: 'Sirius'}
            ],
            speciesLatin: 'Lampropeltis triangulum gaigae',
            species: 'Black Milksnake',
            sex: 'male',
            dob: '2007-09-01',
            fatherId: '',
            motherId: '',
            status: 'active',
            price: 0,
            pedigree: 'St Louis Zoo',
            locale: '',
            hatchColor: '',
            dateAdded: '2010-05-04',
            description: 'I got Sirius after seeing a black milk snake at a local reptile show and becoming fascinated with the species.  He\'s a big boy, and doesn\'t really enjoy being handled, but has never struck at anyone since I\'ve had him.  He\'s a fantastic animal, and one of my favorites for sure.  I do hope to produce black milks soon with Sirius and my female Gaia.'
        },
        {
            id: 'Gaia',
            name: 'Gaia',
            photos: [
                {filename: 'Gaia01', caption: 'Gaia'}
            ],
            speciesLatin: 'Lampropeltis triangulum gaigae',
            species: 'Black Milksnake',
            sex: 'female',
            dob: '2009-12-15',
            fatherId: '',
            motherId: '',
            status: 'active',
            price: 0,
            pedigree: 'San Antonio Zoo',
            locale: '',
            hatchColor: '',
            dateAdded: '2010-04-29',
            description: 'I bought Gaia just before I added Sirius to my collection, after a brief obsession with black milks.  They are spectacular creatures, and I hope to pair mine next year to produce babies.'
        }
    ];

