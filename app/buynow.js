/**
 * Created by Eddie on 1/4/15.
 */

(function(){
    angular
	    .module('grr')
	    .controller('BuyNow', BuyNow)
		.controller('SendContactForm', ['$scope', '$http', function($scope, $http) {
			$scope.contact = {
				name: '',
				email: '',
				comments: ''
			};
			$scope.sendForm = function(){
				sendEmail($http,vm.animal.id,vm.animal.price,vm.animal.includeShipping,$scope.contact.name,$scope.contact.email,$scope.contact.comments, function(data){
					if(!data.status){
						toastr.error('Error sending form email: ' + data.message, "Send Error");
					} else {
						toastr.options = {
							onHidden: function() { window.location = data.message; },
							progressBar: true
						};
						toastr.success('Form data sent successfully.  We will respond to your inquiry shortly.  Click here to return to the animal you are interested in.', "Form Sent");
					}
				});
			};
		}]);
})();

function sendEmail($http, id, price, shipped, name, email, comment, callback){
	var form = {
		id: id,
		price:price,
		shipped: shipped,
		name: name,
		email: email,
		comments: comment
	};
	
	var server = "noRWR7SikdaHJAGIrUGAQQWDjxVqM+Ss51RK7L3iqDUZUp29E8tpuA==";
	var user = "qYXn81nhgkGDVhUHdNTzVLF8aD1XjKY3";
	var pw = "0YvPr5B74sBiX8RgnEn6Ir8JzBkLRbTHksTMHxF6sf73iTXYju2gmbi3RH9IMYaA";
	
	var body = "New inquiry regarding <a href='http://grreptile.com/#/Detail/" + form.id + "'>ID #" + form.id + "</a>";
	body += " was sent on " + moment().format('dddd, MMMM Do YYYY, h:mm:ss a') + ":";
	body += "<p>";
	body += "<blockquote>";
	body += "<strong>ID: </strong><a href='http://grreptile.com/#/Detail/" + form.id + "'>ID #" + form.id + "</a>";
	body += "<br/><strong>Price: </strong> $" + form.price + ", ";
	body += form.shipped ? "shipped" : "plus shipping.";
	body += "<br/><strong>Name: </strong>" + form.name;
	body += "<br/><strong>Email: </strong>" + form.email;
	body += "<br/><strong>Comments: </strong>" + form.comments + "</p>";
	
	var data = {
	    "FromAddress": "sales@grreptile.com",
	    "FromName": form.name,
	    "ServerAddress": server,
	    "EnableSsl": true,
	    "ServerPort": 587,
	    "Subject": "Sales inquiry for ID #" + form.id,
	    "AuthUsername": user,
		"AuthPassword": pw,
		"ToAddresses": [
			"sales@grreptile.com"
		],
		"CcAddresses": [],
		"BccAddresses": [],
		"Html": true,
		"Body": body	
	};
	
	$http.post('http://appell.com/Appell.Utilities/api/Email', data)
		.success(function(data,status,headers,config) {
			var response = {
				status: true,
				message: "http://grreptile.com/#/Detail/" + form.id
			};
			return callback(response);
		})
		.error(function(data,status,headers,config) {
			var response = {
				status: false,
				message: data
			};
			return callback(response);
		});
}

function BuyNow($stateParams) {
    /* jshint validthis: true */
    this.animal = GetAnimalById(collection, $stateParams.animalId);
	this.eddie = {};
}
