app.factory('ProductFactory', function($http){
    var getAll = function(){
       return $http.get('/api/tears')
            .then( function(response){
                return response.data;
            });
    };
    var getOneTear = function(tearId){
        return $http.get('/api/tears/' + tearId)
            .then( function(response){
                return response.data
            });
    };
    var getStateTears = function(state){
       return $http.get('/api/tears/?state=' + state)
            .then( function(response){
                return response.data
            });
    };
    var getOrganicTears = function(bool){
        return $http.get('/api/tears/?organic=' + bool)
            .then( function(response){
                return response.data
            });
    };
    var deleteOne = function(id){
        return $http.delete('/api/tears/' + id)
    }

     return {
        getAll, getOneTear, getStateTears, getOrganicTears, deleteOne
    };

});