angular.module('starter.services', [])

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


.service('messageService', function(){
	this.alert = function(message){
		alert(message);
	}
})