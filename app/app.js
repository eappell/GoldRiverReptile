(function () {
    "use strict";

    var myapp = angular.module("grr", ["ui.router", "ui.bootstrap","ngAnimate","bootstrapLightbox", "angularMoment"/*, 'masonry'*/]);

    myapp.terms = "";

    myapp.links = [
        { title: "House of the Serpent (Tad Duane)", url: "http://www.houseoftheserpent.com" },
        { title: "Morelia viridis Forums (MVF)", url: "http://moreliaviridis.yuku.com/" },
        { title: "MVF Husbandry Guide", url: "http://moreliaviridis.yuku.com/forums/93/Green-Tree-Python-Husbandry-The-Basics" },
        { title: "Colorado Chondros (Jason Stevens)", url: "http://www.coloradochondros.com/" },
        { title: "GTPKeeper (Buddy Buscemi", url: "http://gtpkeeper.com/" },
        { title: "Rico Walder & Trooper Walsh Article", url: "http://www.reptilechannel.com/care-sheets/green-tree-python.aspx" },
        { title: "Greg Maxwell Article", url: "http://www.reptilechannel.com/snakes/snake-care/green-tree-python-husbandry.aspx" },
        { title: "Morelia Python Radio", url: "https://sites.google.com/site/moreliapythonradio/" },
        { title: "Reptiles Magazine Care Sheet", url: "http://www.reptilesmagazine.com/Care-Sheets/Snakes/Green-Tree-Python/" }
    ];

    myapp.tips = [
        "Currently there is only one recessive morph among green tree pythons, which is the albino gene.",
        "Adult green tree pythons can reach between 4 and 6 feet in length, with females being generally larger.",
        "A few green tree pythons have made it into their mid-20s, but most can be expected to live into their mid-teens with good care.",
        "Hatchling green tree pythons usually measure between 8 and 10 inches long.",
        "The green tree python's scientific name changed in 1994 from Chondropython viridis to Morelia viridis reflecting its close relationship with carpet pythons.",
        "Green tree pythons can live from sea level to 1,800 meters elevation."
    ];

    myapp.service("fbMetaService", function () {
        var title = "Gold River Reptile",
            metaDescription = "",
            metaImageUrl = "",
            metaUrl = "";
        return {
            set: function (newTitle, newMetaDescription, newUrl, newImageUrl) {
                metaImageUrl = newImageUrl;
                metaDescription = newMetaDescription;
                metaUrl = newUrl;
                title = newTitle;
            },
            metaTitle: function () { return title; },
            metaDescription: function () { return metaDescription; },
            metaImageUrl: function () { return metaImageUrl; },
            metaUrl: function () { return metaUrl; }
        };
    });

    myapp.controller("Home", ["$scope", "$rootScope", "$sce", "fbMetaService",
                                function ($scope, $rootScope, $sce, fbMetaService) {
        var factIndex = Math.round(Math.random() * (myapp.tips.length - 1));
        $scope.fact = myapp.tips[factIndex];

        $rootScope.metaservice = fbMetaService;
        var desc = "Keeper and breeder of high quality green tree pythons. We offer our customers happy, healthy snakes and geckos, as well as top-notch customer service and post-sale support!";
        $rootScope.metaservice.set("Gold River Reptile", desc, "http://greptile.com/","http://greptile.com/images/Logo2015_320.png");

        $scope.gotoAvailable = function (){
            window.location = "#/Available";
        };

        var available = $.grep(collection, function (animal){
            if(animal.status == "available") { return animal; }
        });

        var slides = $scope.slides = [];
        if(available.length > 0){
            $scope.myInterval = 5000;
            $scope.addSlide = function (animal) {
                slides.push({
                    image: "/images/bodypics/" + animal.photos[0].filename + ".jpg",
                    title: animal.id,
                    price: animal.price,
                    shipped: animal.includeShipping,
                    text: animal.description
                });
            };

            for (var i=0; i < available.length; i++) {
                $scope.addSlide(available[i]);
            }
        } else {
            slides.push({
                image: "/images/NoneAvail.jpg"
            });
        }
    }]);

    myapp.controller("Project", ["$scope","$uibModal","$log"], function ($scope,$uibModal,$log) {
        $scope.showForm = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/directives/interest-form.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info("Modal dismissed at: " + new Date());
            });
        };
    });

	myapp.GetProjectById = function(projects, id) {
		var selectedProjects = $.grep(projects, function(project, index){
			if(project.id == id) return project;
		});

		if(selectedProjects.length > 0)
			return selectedProjects[0];

		return null;
	};

    myapp.GetAnimalById = function(collection, id){
        var animals = $.grep(collection, function(animal){
            if(animal.id == id)  { return animal; }
        });

        if(animals.length > 0) {
            return animals[0];
        }

        return null;
    };

    myapp.config(function (LightboxProvider) {
        LightboxProvider.getImageUrl = function (image) {
            return "/images/bodypics/" + image.filename + ".jpg";
        };

        LightboxProvider.getImageCaption = function (image) {
            return image.caption;
        };
    });

    myapp.controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
        };
    });

/*
    myapp.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    });
*/

    myapp.config(function($stateProvider) {
        $stateProvider
            .state("index", {
                url: "",
                views: {
                    "title": {
                        template: "",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/home.html"
                    },
                    "content": {
                        templateUrl: "/views/content/home.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/home.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                },
                controller: function(){
                    window.bannerHeight = 450;
                    window.scroll(0,0);
                    window.scrollTop();
                }
            })
            .state("home", {
                url: "/Home",
                views: {
                    "title": {
                        template: "",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/home.html"
                    },
                    "content": {
                        templateUrl: "/views/content/home.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/home.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("customer", {
                url: "/Customer",
                views: {
                    "title": {
                        template: "",
                        controller: function(){
                            window.scrollTo(0,0);
                            var rootUrl = 'https://query.yahooapis.com/v1/public/yql?';
                            var yClientId = 'dj0yJmk9dkhMbkNXRzdVQ2lQJmQ9WVdrOVIwaFhjblJ6TkcwbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--';
                            var format = 'json';
                            var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="baltimore, md';
                            var grweather = {};
                            var location = {};
                            var forecast = {};

                            $.ajax({
                                url: rootUrl + '?clientId=' + yClientId + '&format=' + format + '&q=' + query + '")',
                                success: function(data){
                                    grweather = data.query.results.channel;
                                    location = grweather.location;
                                    forecast = grweather.item.forecast;

                                    $('#grweather').text(forecast[0].high);
                                },
                                failure: function(error){
                                    var err = error;
                                }
                            });
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/customer.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Customer.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("register", {
                url: "/Register",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Registration</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/home.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Register.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Collection", {
                url: "/Collection",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Our Collection</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/collection.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Collection.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("NewCollection", {
                url: "/NewCollection",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Our Collection</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/collectionNew.html"
                    },
                    "content": {
                        templateUrl: "/views/content/IsotopeNew.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("dbCollection", {
                url: "/dbCollection",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Our Collection</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/collection.html"
                    },
                    "content": {
                        templateUrl: "/views/content/dbCollection.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Projects", {
                url: "/Projects",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>2014/2015 Projects</h3>",
                        controller: function(){
                            var vm = this;
                            for(var i = 0; i < projects.length; i++) {
                                projects[i].sire = GetAnimalById(collection, projects[i].sireId);
                                projects[i].dam = GetAnimalById(collection, projects[i].damId);
                            }
                            vm.projects = projects;
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/projects.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Projects.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Project", {
                url: "/Projects/:projectId",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>{{project.damId}} x {{project.sireId}}</h3>",
                        controller: function($stateParams, $scope) {
                            var vm = this;
                            vm.project = GetProjectById(projects, $stateParams.projectId);

                            vm.project.sire = GetAnimalById(collection, vm.project.sireId);
                            vm.project.dam = GetAnimalById(collection, vm.project.damId);

                            $scope.project = vm.project;

                            window.scrollTo(0,0);
                            setTimeout(function(){
                                $("[data-toggle=\"tooltip\"]").tooltip();
                            },2000);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/projects.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Project.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("WaitlistProject", {
                url: "/Projects/:projectId/list",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>{{project.damId}} x {{project.sireId}}</h3>",
                        controller: function($stateParams, $scope) {
                            var vm = this;
                            vm.project = GetProjectById(projects, $stateParams.projectId);
                            $scope.project = vm.project;

                            window.scrollTo(0,0);
                            setTimeout(function(){
                                $("[data-toggle=\"tooltip\"]").tooltip();
                                $("[data-tooltip]").tooltip();
                            },2000);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/projects.html"
                    },
                    "content": {
                        templateUrl: "/views/content/PrintProject.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Available", {
                url: "/Available",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Available Animals</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                            $(document).ready(function(){
                                if($("ddlStatus")) {
                                    $("ddlStatus").selectedIndex = 1;
                                }
                                setTimeout(function() {
                                    if($("btnAval"))
                                        $("#btnAvail").click();                        
                                },200);                
                            });
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/available.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Available.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Detail", {
                url: "/Collection/:animalId",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>{{animal.name ? animal.name : animal.id}}</h3>",
                        controller: function($stateParams, $scope) {
                            var vm = this;
                            vm.animal = GetAnimalById(collection, $stateParams.animalId);
                            vm.animal.fatherInCollection = IsInCollection(vm.animal.fatherId);
                            vm.animal.motherInCollection = IsInCollection(vm.animal.motherId);
                            vm.animal.projects = GetProjects(vm.animal.id);
                            $scope.animal = vm.animal;
                            $scope.openLightboxModal = function(index){
                                Lightbox.openModal(vm.animal.photos, index);
                            };
                            window.scrollTo(0,0);

                            function GetProjects(id){
                                var _projects = $.grep(projects, function(project){
                                    if(project.damId == id || project.sireId === id) { return project; }
                                });

                                if(_projects.length > 0) { return _projects; }

                                return [];
                            }

                            function IsInCollection(id){
                                var _animal = GetAnimalById(collection, id);
                                return _animal !== undefined && _animal !== null;
                            }
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/collection.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Detail.html",
                        controller: function(){
                            $(document).ready(function(){
                                $(".imgThumb").on("click", function(){
                                    var src = $(this).attr("src");
                                    var alt = $(this).attr("alt");
                                    $("#imgMain").prop("src", src);
                                    $("#imgMain").siblings(".caption").text(alt);
                                });

                                $(".imgThumb").tooltip({
                                    title: "Click to view larger",
                                    container: "body",
                                    placement: "top"
                                });
                            });
                        }
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("BuyNow", {
                url: "/Available/:animalId",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Buy Now</h3>",
                        controller: function($stateParams, $scope, $http) {
                            var vm = this;
                            vm.animal = GetAnimalById(collection, $stateParams.animalId);
                            $scope.animal = vm.animal;
                            window.scrollTo(0,0);
                            vm.contact = {};
                            vm.test = function() {
                                alert("test passed");
                            };
                            vm.sendForm = function(){
                                alert("sending: " + vm.animal.id + ", $" + vm.animal.price + "," + vm.contact.name + "," + vm.contact.email + "," + vm.contact.comments);
                            };
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/collection.html"
                    },
                    "content": {
                        templateUrl: "/views/content/BuyNow.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("Terms", {
                url: "/Terms",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Terms & Conditions</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/home.html"
                    },
                    "content": {
                        templateUrl: "/views/content/Terms.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("FAQs", {
                url: "/FAQs",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>Frequently Asked Questions</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/home.html"
                    },
                    "content": {
                        templateUrl: "/views/content/FAQs.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            })
            .state("About", {
                url: "/About",
                views: {
                    "title": {
                        template: "<h3 class='title' ui-view='title'>About Gold River Reptile</h3>",
                        controller: function(){
                            window.scrollTo(0,0);
                        }
                    },
                    "nav": {
                        templateUrl: "/views/nav/about.html"
                    },
                    "content": {
                        templateUrl: "/views/content/About.html"
                    },
                    "slider": {
                        templateUrl: "/views/slider/other.html"
                    },
                    "footer": {
                        templateUrl: "/views/footer.html"
                    }
                }
            });
    });

    myapp.directive("tooltip", function(){
        return {
            restrict: "A",
            link: function(scope, element){
                $(element).hover(function(){
                    // on mouseenter
                    $(element).tooltip("show");
                }, function(){
                    // on mouseleave
                    $(element).tooltip("hide");
                });
            }
        };
    });

    myapp.directive("thumbnail", function(){
        return {
            restrict: "A",
            link: function(scope, element) {
                $(element).hover (
                    function() {
                        $(this).find(".thumbhover").slideToggle(250); //.fadeIn(250)
                        $(this).find(".price").slideToggle(250); //.fadeIn(250)
                    }
                );
            }
        };
    });

    myapp.directive("didYouKnow", function(){
        return {
            restrict: "A",
            link: function(scope, element){
                var factIndex = Math.round(Match.random()*(myapp.tips.length - 1));
                $(element).text(myapp.tips[factIndex]);
            }
        };
    });

    (function () {
        var directive = function () {
            return {
                restrict: "E",
                scope: {
                    project: "=",
                    incubationPeriod: "=days"
                },
                templateUrl: "/app/directives/test-directive.html",
                link: {
                }
            };
        };

        myapp
            .directive("testDirective", directive);

    }());

    myapp.filter("partition", ["pmkr.filterStabilize",
                               function(stabilize) {
                                   function partition(arr, size) {
                                       var newArr = [];
                                       for (var i=0; i<arr.length; i+=size) {
                                           newArr.push(arr.slice(i, i+size));
                                       }
                                       return newArr;
                                   }
                                   return stabilize(partition);
                               }
                              ]);

    myapp.filter("to_trusted", ["$sce", function($sce){
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }]);

    myapp.factory("filterStabilize", ["pmkr.memoize",
                                 function(memoize) {
                                     function service(fn) {
                                         function filter() {
                                             var args = [].slice.call(arguments);
                                             // always pass a copy of the args so that the original input can't be modified
                                             args = angular.copy(args);
                                             // return the `fn` return value or input reference (makes `fn` return optional)
                                             var filtered = fn.apply(this, args) || args[0];
                                             return filtered;
                                         }
                                         var memoized = memoize(filter);
                                         return memoized;
                                     }
                                     return service;
                                 }
                                ]);

    myapp.factory("memoize", [
        function() {
            function service() {
                return memoizeFactory.apply(this, arguments);
            }
            function memoizeFactory(fn) {
                var cache = {};
                function memoized() {
                    var args = [].slice.call(arguments);
                    var key = JSON.stringify(args);
                    if (cache.hasOwnProperty(key)) {
                        return cache[key];
                    }
                    cache[key] = fn.apply(this, arguments);
                    return cache[key];
                }
                return memoized;
            }
            return service;
        }

    ]);

}());

