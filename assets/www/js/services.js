angular.module('starter.services',[])

.service('userService', function() {

	this.initParam = function($scope) {
		$scope.loginFlag = false;
		$scope.userName = "";
		$scope.gender = "";
	};
	this.logout = function($scope) {
		this.initParam($scope);
	};
	this.login = function(loginName, password, $scope) {
		console.log('loginName: ' + loginName + '; password: ' + password);
		if (loginName == 'user' && password == 'pass') {
			$scope.userName = "嗡汤圆";
			$scope.gender = "男";
			$scope.loginFlag = true;
			return true;
		} else {
			return false;
		}
	};

})


.service('messageService', function($cordovaDialogs, $cordovaToast){
	this.warning = function(message){
		$cordovaDialogs.alert(message, 'Warning','Confirm')
			.then(function(){
			});
	};
	
	this.toast = function(message){
		$cordovaToast
			.show(message, 'short', 'center')
			.then(function(success){
				//success
			}, function (error){
				//error
			});
	};
})

;