angular.module('starter.controllers', ['ngCordova'])


.controller('AppCtrl', function($scope, $ionicModal, $http, userService , messageService) {
  
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
	  {title: 'barcode', id:2},
	  {title: 'file', id:3},
	  {title: 'filetransfer', id:4}
	];
})



.controller('apiCtrl', function($scope, $stateParams, $cordovaCamera, $cordovaBarcodeScanner, $cordovaFile,  $cordovaFileTransfer, $timeout ,messageService) {
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
	
	//file
	if($stateParams.apiId == 3){
		$scope.showFile = true;
		$scope.apititle = "file API";
		
		$scope.getFreeDiskSpace = function (){
			$cordovaFile.getFreeDiskSpace()
				.then(function (success){
					messageService.toast(success+'kilobytes');
				}, function(error){
					//error;
				});
		};
		
		$scope.createDir = function (){
			$cordovaFile.createDir(cordova.file.externalDataDirectory,'new_dir', false)
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.removeDir = function (){
			$cordovaFile.removeDir(cordova.file.externalDataDirectory,'new_dir')
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.removeDirRecursively = function () {
			$cordovaFile.removeRecursively(cordova.file.externalDataDirectory,'new_dir')
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		}
		
		$scope.checkDir = function() {
			$cordovaFile.checkDir(cordova.file.externalDataDirectory,'new_dir')
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		
		$scope.createFile = function () {
			$cordovaFile.createFile(cordova.file.externalDataDirectory,'new_dir/test.txt',false)
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.removeFile = function () {
			$cordovaFile.removeFile(cordova.file.externalDataDirectory,'new_dir/test.txt')
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.checkFile = function() {
			$cordovaFile.checkFile(cordova.file.externalDataDirectory,'new_dir/test.txt')
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.writeFile = function() {
			$cordovaFile.writeFile(cordova.file.externalDataDirectory, "new_dir/test.txt", "insert txt;", true)
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.writeExistingFile = function() {
			$cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, "new_dir/test.txt", "insert txt;")
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		$scope.readFile = function() {
			$cordovaFile.readAsText(cordova.file.externalDataDirectory, "new_dir/test.txt")
				.then(function (success){
					messageService.toast('success: '+success);
				}, function (error){
					messageService.toast('error: '+error.code);
				});
		};
		
		
	}
	
	
	//filetransfer
	if($stateParams.apiId == 4){
		$scope.showTransfer = true;
		$scope.apititle = "filetransfer API";
		
		$scope.download = function() {
			var url = "http://yinyueshiting.baidu.com/data2/music/134367584/123107718108000128.mp3?xcode=94b81a0cc047ccd2b169a51e193c0fa9";
		    var targetPath = cordova.file.externalDataDirectory + "centries.mp3";
		    var trustHosts = true
		    var options = {};

		    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
		      .then(function(result) {
		        // Success!
		    	  messageService.toast('success: '+result);
		      }, function(err) {
		        // Error
		    	  messageService.toast('error: '+err.code);
		      }, function (progress) {
		        $timeout(function () {
		          $scope.total = progress.total;
		          $scope.loaded = progress.loaded;
		          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
		        })
		      });
		};
	}
})

;

