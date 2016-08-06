/**
 * Created by Eddie on 9/28/14.
 */

(function(){
    angular
    .module('grr')
    .controller('Projects', Projects)
    ;
})();

function Projects($location) {
    var vm = this;
    //vm.projectDetail = ProjectDetail;
    for(var i = 0; i < projects.length; i++) {
        projects[i].sire = GetAnimalById(collection, projects[i].sireId);
        projects[i].dam = GetAnimalById(collection, projects[i].damId);
    }
    vm.projects = projects;
}

var projects = [
    {
        id: 'GRR2015-4',
        dateStart: '2015-06-27',
        dateEnd: '2016-05-29',
        dateLaid: '2016-04-08',
        dateHatched: '2016-05-29',
        isComplete: true,
        incubation: 'artificial',
        sireId: 'MSBB0910',
        damId: 'EA0910Vi',
        shortDescription: "Repeat pairing of my high yellow female, Lucille, with my Calico outcross male, Dupree.  The last time these two got together in 2014, they made some amazing babies, so the anticipation for this pairing is very high!",
        description:
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FTheReptileReport%2Fposts%2F892916894153521%3A0&width=240" width="240" height="340" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>' +
        '<div class="col-md-9">' +
        "I didn't know if this pairing was going to happen this year.  I witnessed a lot of locks, but Lucille was still eating, " +
        "with no sign of slowing down.  Then I dropped her temps, and BOOM, follicle development.  From there on, everything went " +
        "fairly smoothly, until day 2 or 3 of incubation, when I noticed several (4) of the eggs had fairly large spots of " +
        "discoloration.  I've always had eggs go bad during incubation, so I assumed these would too.  I thought I'd try applying " +
        "Elmer's glue to the spots, as I've heard other mention on the MVF that it has worked for them.  It worked great, and they " +
        "all produced babies!  In all, I got 6 yellows, 14 reds - a 100% hatch rate.  Thanks to all the helpful members of the chondro community! " +
        "Also, a big thanks to SIM boxes - they've worked out great for me.<p><a href='/#/Projects/GRR2015-4/list'>Waiting list " + 
		"selection</a></p></div>" +
        "</div>",
        eggsLaidDate: '2016-04-08',
        expectedHatchDate: '2016-05-29',
        actualHatchDate: '2016-05-29',
        eggs: {
            count: 20,
            fertile: 20,
            infertile: 0,
            slugs: 0,
            questionable: 2,
            hatched: 20
        },
        photos: [
            { filename: 'GRR1620/005', caption: 'July 16, 2016' },
            { filename: 'LucilleDupree2015_001', caption: 'Lucille x Dupree 2015'}
        ],
        events: [
            {
                date: '2015-06-27',
                title: 'Introduced [MSBB0910] Dupree',
                description: 'Introduced Male to Female',
                photo: 'images/bodypics/LucilleDupree2015_001.jpg'
            },
            {
                date: '2015-06-27',
                title: 'Observed Copulation',
                description: 'Copulation with [MSBB0910] Dupree',
                photo: 'images/bodypics/LucilleDupree2015_002.jpg'
            },
            {
                date: '2015-10-28',
                title: 'Observed Copulation',
                description: 'Copulation with [MSBB0910] Dupree - first rain of the season, and these two were going at it for about 24 hours.',
                photo: 'images/photos/LucillexDupree2015.jpg'
            },
            {
                date: '2015-11-02',
                title: 'Removed [MSBB0910] Dupree',
                description: 'Lost interest, and they both seem hungry.',
                photo: ''
            },
            {
                date: '2016-02-13',
                title: 'Follicle Development',
                description: 'A bit late in the season, but it looks like follicle development going on.  Her color lightened, and she won\'t eat.',
                photo: 'images/bodypics/Lucille/Lucille_follicles_2016.jpg'
            },
            {
                date: '2016-03-12',
                title: 'Ovulation',
                description: 'She appears to be ovulating.  While she isn\'t much bigger than she\'s been for weeks, she looks much more uncomfortable.',
                photo: 'images/bodypics/Lucille/Lucille_Ovulation_2016.jpg'
            },
            {
                date: '2016-03-24',
                title: 'Pre-Lay Shed',
                description: 'Lucille decided to shed a few days before I expected, but maybe my ovulation date was off.  Regardless, I\'m happy to see the shed!',
                photo: 'images/bodypics/Lucille/Lucille_PreLayShed_2016.jpg'
            },
            {
                date: '2016-04-08',
                title: 'Eggs Laid!',
                description: 'She gave me 20 pearly whites!  A couple look like they have a discolored spot, but nothing too major.  Hoping they all make it the distance!',
                photo: 'images/bodypics/Lucille/LucilleDupree2016_002.jpg'
            },
            {
                date: '2016-05-30',
                title: 'Hatch Day!',
                description: 'They started pipping around 9pm last night, and have continued into today.  Day 51/52 hatching.  So far they\'re looking amazing!',
                photo: 'images/bodypics/GRR2016/HatchingPic_01.jpg'
            }
        ]
    },
    {
        id: 'GRR2015-3',
        dateStart: '2015-05-24',
        dateEnd: '2015-08-01',
        dateLaid: '',
        dateHatched: '',
        isComplete: true,
        incubation: '',
        sireId: 'JEMS1226',
        damId: 'JEMS1019',
        shortDescription: "Hoping my JEMS1226 male, DynamoHum, will be ready to get to work this year. He was a little too young and shy last year. Things are looking better for this year though... Fingers crossed. This would be a fantastic Arfak OC pairing, if it works.",
        description: "Hoping my JEMS1226 male, DynamoHum, will be ready to get to work this year. He was a little too young and shy last year. Things are looking better for this year though... Fingers crossed. This would be a fantastic Arfak OC pairing, if it works.",
        eggs: {
            count: 0,
            fertile: 0,
            infertile: 0,
            slugs: 0,
            questionable: 0,
            hatched: 0
        },
        photos: [
            {filename: 'ella_dynamohum2', caption: 'JEMS1226'}
        ],
        events: [
            {
                date: '2015-05-24',
                title: 'Introduction',
                description: 'Introduced Male to Female',
                photo: 'images/bodypics/ella_dynamohum2.jpg'
            },
            {
                date: '2015-07-01',
                title: 'Removed male',
                description: 'Unfortunately this male isn\'t ready to begin breeding.  He\'s been in there for over a month but I haven\'t witnessed a copulation.',
                photo: ''
            },
            {
                date: '2015-08-01',
                title: 'Ended Project',
                description: 'I\'m not feeling this pairing right now.  Dynamo doesn\'t seem to be ready to go yet, so I\'m ending this project for this season.  I\'ll try him with another female later in the season.',
                photo: ''
            }
        ]
    },
    {
        id: 'GRR2015-2',
        dateStart: '2015-05-01',
        dateEnd: '2015-07-05',
        dateLaid: '',
        dateHatched: '',
        isComplete: true,
        incubation: '',
        sireId: 'MSBB0910',
        damId: 'ML1031vi',
        shortDescription: "This is a pairing between my female 'Rose', an OSHY produced by Mike Lockwood, and my 'Dupree' Calico male.  This would be the first year Rose produces if she goes.",
        description: "This is a pairing between my female 'Rose', an OSHY produced by Mike Lockwood, and my 'Dupree' Calico male.  This would be the first year Rose produces if she goes.",
        eggs: {
            count: 0,
            fertile: 0,
            infertile: 0,
            slugs: 0,
            questionable: 0,
            hatched: 0
        },
        photos: [
            {filename: 'RoseDupree_2015-1', caption: 'The loving embrace'}
        ],
        events: [
            {
                date: '2015-05-01',
                title: 'Introduction',
                description: 'Introduced Male to Female',
                photo: 'images/bodypics/RoseDupree_2015-1.jpg'
            },
            {
                date: '2015-05-01',
                title: 'Witnessed Copulation',
                description: 'Witnessed several instances of copulation.',
                photo: ''
            },
            {
                date: '2015-05-18',
                title: 'Removed male',
                description: 'Rose looks like she\'s about to begin a shed cycle, so removing Dupree.',
                photo: ''
            },
            {
                date: '2015-07-01',
                title: 'Reintroduced male',
                description: 'Since I didn\'t see any action between Dupree and Lucille, trying him back with Rose.',
                photo: ''
            },
            {
                date: '2015-07-05',
                title: 'Removed male',
                description: 'Dupree is about to shed, and haven\'t seen any action between the two, so removing him for his shed cycle.',
                photo: ''
            }
        ]
    },
    {
        id: 'GRR2015-1',
        dateStart: '2014-11-14',
        dateEnd: '2015-04-17',
        dateLaid: '2015-11-30',
        dateHatched: '',
        isComplete: true,
        incubation: 'artificial',
        sireId: 'MSBB0910',
        damId: 'JEMS1019',
        shortDescription: "This is a pairing between my female 'Ella', an Arfak outcross produced by Jason Stevens and Ryan Burke, and my 'Dupree' Calico male.",
        description: "This is a pairing between my female 'Ella', an Arfak outcross produced by Jason Stevens and Ryan Burke, and my 'Dupree' Calico male.",
        eggsLaidDate: '2014-11-30',
        expectedHatchDate: '2015-01-19',
        actualHatchDate: '2015-01-19',
        eggs: {
            count: 16,
            fertile: 16,
            infertile: 0,
            slugs: 0,
            questionable: 2,
            hatched: 14
        },
        photos: [
            {filename: 'GRR1504/009', caption: '07-31-2016'},
            {filename: 'Ella/001', caption: 'Dam'},
            {filename: 'Dupree/001', caption: 'Sire'}
        ],
        events: [
            {
                date: '2014-09-23',
                title: 'Introduction',
                description: 'Introduced Male to Female',
                photo: ''
            },
            {
                date: '2014-09-23',
                title: 'Observed Copulation',
                description: 'Copulation with [MSBB0910] Dupree',
                photo: 'http://www.iherp.com/Gallery/91844/56664_365803_Large_uVJlAIHZcwXu6.jpg'
            },
            {
                date: '2014-11-06',
                title: 'Removed Male',
                description: 'Neither is showing any interest at this point.',
                photo: ''
            },
            {
                date: '2014-11-14',
                title: 'Pre-Lay Shed',
                description: '',
                photo: ''
            },
            {
                date: '2014-11-30',
                title: 'Laid Eggs',
                description: '16 big, beautiful, plump eggs!',
                photo: 'http://www.iherp.com/Gallery/91844/56664_374125_Large_TdLElvE6SzbB.jpg'
            },
            {
                date: '2015-01-19',
                title: 'Eggs Hatched',
                description: 'All 14 good eggs hatched and babies are lookin great!  11 reds, 3 yellows.',
                photo: ''
            }
        ]
    },
    {
        id: 'GRR2014',
        dateStart: '2013-11-14',
        dateEnd: '2014-04-17',
        dateLaid: '2014-02-23',
        dateHatched: '2014-04-16',
        isComplete: true,
        incubation: 'artificial',
        sireId: 'MSBB0910',
        damId: 'EA0910Vi',
        shortDescription: "This is a pairing between my female 'Lucille' HY chondro and my 'Dupree' Calico x Kelme male. Very excited to see what happens here - my first chondro breeding project!",
        description: "This is a pairing between my female 'Lucille' HY chondro and my 'Dupree' Calico x Kelme male. Very excited to see what happens here - my first chondro breeding project!",
        eggsLaidDate: '2014-02-24',
        expectedHatchDate: '2015-01-19',
        actualHatchDate: '2014-04-16',
        eggs: {
            count: 17,
            fertile: 17,
            infertile: 0,
            slugs: 0,
            questionable: 0,
            hatched: 16
        },
        photos: [
            {filename: 'GRR1412/023', caption: '05-18-2016'},
            {filename: 'Lucille/001', caption: 'Dam'},
            {filename: 'Dupree/001', caption: 'Sire'}
        ],
        events: [
            {
                date: '2013-11-14',
                title: 'Introduction',
                description: 'Introduced Male to Female',
                photo: ''
            },
            {
                date: '2013-11-15',
                title: 'Observed Copulation',
                description: 'Copulation with [MSBB0910] Dupree',
                photo: 'http://www.iherp.com/Gallery/91844/58984_327370_Large_c1AH4eXpIrHsy.jpg'
            },
            {
                date: '2014-02-08',
                title: 'Pre-lay Shed',
                description: '',
                photo: ''
            },
            {
                date: '2014-02-24',
                title: 'Laid Eggs',
                description: '17 big, beautiful, plump eggs!',
                photo: 'http://www.iherp.com/Gallery/91844/58984_338884_Large_IZJMfybjqfGhaJ8.jpg'
            },
            {
                date: '2014-04-16',
                title: 'Eggs Hatched',
                description: '16 babies pipped!',
                photo: 'http://www.iherp.com/Gallery/91844/58984_345799_Large_ijJOLRqrgQ5.jpg'
            }
        ]
    }
];
