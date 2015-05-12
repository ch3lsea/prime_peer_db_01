/**
 * Created by chelsea on 5/12/15.
 */
var app = angular.module('app', []);
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.assignment = {};
    $scope.assignments = [];
    var fetchAssignments = function() {
        return $http.get('/assignment').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch assignments from the API');
            }
            $scope.assignment = {};
            $scope.assignments = response.data;
            return response.data;
        })
    };
    $scope.add = function(assignment){
        return $http.post('/assignment', assignment).then(fetchAssignments);
    };
    $scope.delete = function(id){
        return $http.delete('/assignment/' + id).then(fetchAssignments);
    };
    $scope.update = function(id){
        var name = prompt("Enter the new name");
        return $http.put('/assignment/' + id, {"name" : name}).then(fetchAssignments);
    };
    fetchAssignments();
}]);
