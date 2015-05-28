angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $http, userService, messageService) {
  
  // Form data for the login modal
  $scope.loginData = {};
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  
  $scope.logout = function() {
	 userService.logout($scope); 
	 messageService.alert('登出成功');
	 redirectTo: '/';
  } ;
  $scope.resetLoginParam = function() {
	  $scope.loginData.username="";
	  $scope.loginData.password="";
	  $scope.closeLogin();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    if(userService.login($scope.loginData.username, $scope.loginData.password, $scope)){
    	$scope.$apply();
    	console.log('flag: '+$scope.loginFlag);
    	$scope.closeLogin();
    } else {
    	messageService.alert('用户名或者密码错误');
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
});


