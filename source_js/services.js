var CHServices = angular.module('CHServices', []);

CHServices.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});

CHServices.factory('StudentUsers', function($http, $window) {
    return {
        get : function(query) {
            var baseUrl = $window.sessionStorage.baseurl;
            if (query === undefined) {
                return $http.get(baseUrl + '/api/studentusers');
            }
            else if (typeof(query) === "string") {
                return $http.get(baseUrl + '/api/studentusers/' + query);
            }
            else {
                return $http.get(baseUrl + '/api/studentusers', {params: query});
            }
        },
        post : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/studentusers', user);
        },
        put : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/studentusers/' + user._id, user);
        },
        delete : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/studentusers/' + id);
        }
    }
});

CHServices.factory('Courses', function($http, $window) {
    return {
        get : function(query) {
            var baseUrl = $window.sessionStorage.baseurl;
            if (query === undefined) {
                return $http.get(baseUrl + '/api/courses');
            }
            else if (typeof(query) === "string") {
                return $http.get(baseUrl + '/api/courses/' + query);
            }
            else {
                return $http.get(baseUrl + '/api/courses', {params: query});
            }
        },
        post : function(course) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/courses', course);
        },
        put : function(course) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/courses/' + course._id, course);
        },
        delete : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/courses/' + id);
        }
    }
});

CHServices.factory('PersonalTasks', function($http, $window) {
    return {
        get : function(query) {
            var baseUrl = $window.sessionStorage.baseurl;
            if (query === undefined) {
                return $http.get(baseUrl + '/api/personalTasks');
            }
            else if (typeof(query) === "string") {
                return $http.get(baseUrl + '/api/personalTasks/' + query);
            }
            else {
                return $http.get(baseUrl + '/api/personalTasks', {params: query});
            }
        },
        post : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/personalTasks', user);
        },
        put : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/personalTasks/' + user._id, user);
        },
        delete : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/personalTasks/' + id);
        }
    }
});


//var LSServices = angular.module('LSServices', []);

CHServices.factory('StudentUsers', function($http, $window) {
    return {
        get : function(query) {
            var baseUrl = $window.sessionStorage.baseurl;
            if (query === undefined) {
                return $http.get(baseUrl + '/api/studentusers');
            }
            else if (typeof(query) === "string") {
                return $http.get(baseUrl + '/api/studentusers/' + query);
            }
            else {
                return $http.get(baseUrl + '/api/studentusers', {params: query});
            }
        },
        post : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/studentusers', user);
        },
        put : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/studentusers/' + user._id, user);
        },
        delete : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/studentusers/' + id);
        }
    }
});

CHServices.factory('InstructorUsers', function($http, $window) {
    return {
        get : function(query) {
            var baseUrl = $window.sessionStorage.baseurl;
            if (query === undefined) {
                return $http.get(baseUrl + '/api/instructorusers');
            }
            else if (typeof(query) === "string") {
                return $http.get(baseUrl + '/api/instructorusers/' + query);
            }
            else {
                return $http.get(baseUrl + '/api/instructorusers', {params: query});
            }
        },
        post : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/instructorusers', user);
        },
        put : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl + '/api/instructorusers/' + user._id, user);
        },
        delete : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/instructorusers/' + id);
        }
    }
});
