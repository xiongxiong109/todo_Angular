//新建angular模块
var m=angular.module('ngContactor',['ngResource']);
//数据列表控制器
m.controller('ngList',['$scope','$resource',function($scope,$resource){

	//获取数据列表
	var personData=$resource('./resource/person.json');
	$scope.personData=personData.query();

	//规定可编辑状态
	$scope.isEdit=false;
	$scope.toggleEdit=function(){
		$scope.isEdit=!$scope.isEdit;
	}

	//添加联系人
	$scope.add={
		name:"",
		age:"",
		phone:"",
		job:""
	}
	$scope.addContactor=function(){
		//利用扩展的对象来更新数据
		var json=angular.extend({},$scope.add);
		$scope.personData.unshift(json);
		//更新完成后清空表单
		for(var i in $scope.add){
			$scope.add[i]="";
		}
		$("#addModal").modal('hide');
	}

	//删除联系人
	$scope.curIndex=null;
	$scope.showWarning=function(idx){
		$scope.curIndex=idx;
		$("#delModal").modal('show');
	}
	$scope.dele=function(){
		$("#delModal").modal('hide');
		$scope.personData.splice( $scope.curIndex, 1 );
	}
	$scope.cancel=function(){
		$("#delModal").modal('hide');
	}

	//编辑联系人
	$scope.edit=angular.copy($scope.add);
	$scope.showEdit=function(idx){
		$scope.curIndex=idx;
		$("#editModal").modal('show');
		$scope.edit=angular.copy($scope.personData[idx]);
	}
	//确认编辑
	$scope.editCfm=function(){
		//编辑更新
		$scope.personData[$scope.curIndex]=angular.copy($scope.edit);
		$("#editModal").modal('hide');
	}
}]);

//指令模板
m.directive('tplhead',function(){
	return {
		restrict:"E",
		templateUrl:"./view/header.html",
		replace:true
	}
});

m.directive('tploverlayer',function(){
	return {
		restrict:"E",
		templateUrl:"./view/modal.html"
	}
});