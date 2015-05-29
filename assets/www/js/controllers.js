angular.module('starter.controllers', ['ngCordova'])


.controller('AppCtrl', function($scope, $ionicModal, $http,userService, messageService) {
  
  // Form data for the login modal
  $scope.loginData = {
  };
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginmodal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/myprofile.html', {
	scope: $scope
  }).then(function(modal) {
	$scope.profilemodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginmodal.hide();
  };
  $scope.closeprofile= function(){
	  $scope.profilemodal.hide();
  }
  

  // Open the login modal
  $scope.login = function() {
    $scope.loginmodal.show();
  };
  $scope.myprofile=function(){
	$scope.profilemodal.show();  
  };
  
  $scope.logout = function() {
	 userService.logout($scope); 
	 messageService.toast('登出成功');
	 $scope.profilemodal.hide();
  } ;
  $scope.resetLoginParam = function() {
	  $scope.loginData.username="";
	  $scope.loginData.password="";
	  $scope.closeLogin();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    if(userService.login($scope.loginData.username, $scope.loginData.password, $scope)){
    	$scope.$apply();
    	$scope.closeLogin();
    } else {
    	messageService.warning('用户名或者密码错误');
    }
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('apilistCtrl', function($scope) {
	$scope.tests = [
	  {title: 'camera', id:1},
	  {title: 'barcode', id:2}
	];
})



.controller('apiCtrl', function($scope, $stateParams, $cordovaCamera, $cordovaBarcodeScanner) {
	//camera
	if($stateParams.apiId == 1){
		$scope.showCamera = true;
		$scope.apititle = "camera API";
		
		$scope.takePicture = function(){
			var options = {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					sourceType: Camera.PictureSourceType.CAMERA
			};
			$cordovaCamera.getPicture(options).then(function (imageData){
				$scope.cameraimage = "data:image/jpeg;base64,"+imageData;
			}, function (err){
				console.log('faled: '+err);
			});
		};
		
	}
	
	//barcode
	if($stateParams.apiId == 2){
		$scope.showBarcode = true;
		$scope.apititle = "barcode API";
		
		$scope.scanBarcode = function() {
		    $cordovaBarcodeScanner.scan().then(function(imageData) {
//		        alert(imageData.text);
		    	$scope.scanresult = imageData.text;
		        console.log("Barcode Format -> " + imageData.format);
		        console.log("Cancelled -> " + imageData.cancelled);
		    }, function(error) {
		        console.log("An error happened -> " + error);
		    });
		};
	}
})

;

