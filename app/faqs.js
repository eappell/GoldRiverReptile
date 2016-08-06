/**
 * Created by Eddie on 6/5/14.
 */

(function(){
    angular
    .module('grr')
    .controller('FAQs', ['$sce', function($sce){
	    var vm = this;
		vm.faqs = getFaqs($sce);
	}]);
})();

function FAQs() {
    /* jshint validthis: true */
    var vm = this;
	vm.faqs = faqs;
	vm.status = {
		isItemOpen: new Array(faqs.length),
		isFirstDisabled: false
	};
    vm.oneAtATime = true;
	
	vm.status.isItemOpen[0] = true;
}

function getFaqs($sce){
	return [
        { 
            q: 'Can I feed my green tree python rats?', 
            a: $sce.trustAsHtml('There\'s a some great information on this question <a href="http://moreliaviridis.yuku.com/topic/24650/III-Feeding" target="mvf">here</a>.  If you have other questions regarding feeding, don\'t hesitate to <a href="mailto:info@grreptile.com&subject=Feeding%20Qustion">email us</a>.') 
        },
        { 
            q: 'Are green tree pythons mean?', 
            a: $sce.trustAsHtml('Green tree pythons have gotten a bad rap over the years. They have a reputation of being aggressive, but for the most part this is untrue. Their attitude can be a reflection of how they\'ve been treated. If they are grabbed, physically restrained and treated roughly, they will become defensive and appear aggressive when approached.') 
        },
        { 
            q: 'How large do green tree pythons get?', 
            a: $sce.trustAsHtml('Adult green tree pythons can reach between 4 and 6 feet in length, with females being generally larger.') 
        },
        { 
            q: 'What type of enclosure should I get for my baby green tree python?', 
            a: $sce.trustAsHtml('The MVF (Morelia Viridis Forum) has a very concise answer to this question <a href="http://moreliaviridis.yuku.com/topic/23944/16-Basic-Setups" target="mvf">here</a>.  If you have other questions regarding caging, don\'t hesitate to <a href="mailto:info@grreptile.com&subject=Caging%20Question">email us</a>.') 
        },
        { 
            q: 'Can\'t I just get an imported wild-caught animal for a lot cheaper?', 
            a: $sce.trustAsHtml('Yep, you sure can!  Remember that question above about chondros being \'mean\'?  This is where that myth comes from.  It\'s the captive-bred animals that have the much gentler dispositions.  Not to mention there\'s a good chance you could bring unknown bugs into your collection.  You can save a few bucks buying from one of the many importers, but in the long run a quality, captive-bred chondro will be worth the money you spend on it.') 
        },
        { 
            q: 'Why are green tree pythons so much more expensive than [insert your species here]?', 
            a: $sce.trustAsHtml('First of all, domestic, captive-bred green tree pythons can be purchased for a very reasonable amount these days.  If you just want a nice example of a specific locale, there are some fantastic breeders out there producing some beautiful locale-specific stuff and selling for very fair prices.  However, if you want to add some highly sought-after designer genetics to your collection, the prices will typically be higher.  Additionally, green tree python neonates are famously difficult to get established, so you\'re paying for the time and effort it took to get your animal established.  Finally, we would suggest that the prices for highly desirable chondros are not any more than "morphs" of many other species.') 
        },
        { 
            q: 'What type of substrate should I use?', 
            a: $sce.trustAsHtml('Many substrates are suitable for green tree python enclosures. Newspaper is easy to clean, but it\'s not aesthetically pleasing for some people. Many snakekeepers use various mulches or coconut-husk products because they are pleasing to the eye and also help provide the humidity to keep these animals healthy. I personally use paper towels in the baby and juvenile tubs, and puppy training pads, which I buy in bulk at Costco, in the adult cages.') 
        },
        { 
            q: 'Can I feed my animal live prey?', 
            a: $sce.trustAsHtml('For the safety of the snake, I prefer to feed only frozen-thawed (f/t) rodents to my green tree pythons.  There have been times when I had an animal who would only eat live, and in those instances I would feed live, and slowly migrate them over to a diet of f/t.  Now my entire collection eats only f/t, and I\'ve never had an injury feeding any of my animals.') 
        },
        { 
            q: 'How big are a green tree python\'s teeth?', 
            a: $sce.trustAsHtml('Big.  Seriously, while their teeth don\'t come close to the size of an Emerald Tree Boa\'s teeth, you definitely don\'t want to get bit by an adult chondro, if you can avoid it.')
        },
        { 
            q: 'What\'s with all the tail movement at night?', 
            a: $sce.trustAsHtml('One of the many very cool aspects to being a chondro keeper is witnessing them flicking their tail at night.  What it means is that your chondro is hungry, and is attempting to lure a prey item closer to them by flicking their tail like a struggling worm.  This behavior is widely documented, and is called <a href="http://en.wikipedia.org/wiki/Caudal_luring" target="wiki">\'caudal luring\'</a>.')
        },
        { 
            q: 'How often should I feed my chondro?', 
            a: $sce.trustAsHtml('Feed juveniles a small mouse every five to seven days. Older juveniles and young adults can be fed a hopper or medium mouse every seven to 10 days. Adults can be given a meal of one or two adult mice, or a small rat every 10 to 14 days. Be careful not to overfeed your green tree python. These naturally slender snakes have a sedentary lifestyle.') 
        },
        {
            q: 'How hot should my hot spot be?',
            a: $sce.trustAsHtml('In my experience, chondros do best when kept in the mid 80\'s, fahrenheit.  In general, you want a temperature gradient of 75˚ to 88˚ F.  Much more information, and some great insight, can be <a href="http://moreliaviridis.yuku.com/topic/23952/8-TemperatureThermal-Gradients" target="mvf">found here</a>.')
        }
];
}

 