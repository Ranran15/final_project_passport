var app = angular.module('courseHelper', ['ui.router','ngRoute', 'CHControllers', 'CHServices', 'CHDirectives']);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise("/dashboard/dues");

  $stateProvider
    .state('login', {
      url: "/login",
      views: {
        'body': {
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        }
      }
    })
    .state('student', {
      url: "/dashboard",
      views: {
        'body': {
          templateUrl: 'partials/dashboard.html'
        }
      }
    })
    .state('student.dues', {
      url: "/dues",
        views: {
            'menu': {
                templateUrl: 'partials/studentMenu.html'
            },
            'header': {
                templateUrl: 'partials/studentheader.html'
            },
            'content': {
                templateUrl: 'partials/dues.html',
                controller: 'DuesController'
            }
        },
    })
    .state('student.todos', {
      url: "/todos",
        views: {
            'menu': {
                templateUrl: 'partials/studentMenu.html'
            },
            'header': {
                templateUrl: 'partials/studentheader.html'
            },
            'content': {
                templateUrl: 'partials/todos.html',
                controller: 'TodosController'
            }
        },
    })
    .state('student.adddrop', {
      url: "/adddrop",
        views: {
            'menu': {
                templateUrl: 'partials/studentMenu.html'
            },
            'header': {
                templateUrl: 'partials/studentheader.html'
            },
            'content': {
                templateUrl: 'partials/adddrop.html',
                controller: 'AddDropController'
            }
        },
    })
    .state('student.course', {
      url: "/course",
        views: {
            'menu': {
                templateUrl: 'partials/studentMenu.html'
            },
            'header': {
                templateUrl: 'partials/courseheader.html'
            },
            'content': {
                templateUrl: 'partials/course.html',
                controller: 'CourseController'
            }
        },
    })
    .state('instructor', {
      url: "/dashboard",
      views: {
        'body': {
          templateUrl: 'partials/dashboard.html',
          controller: 'InstructorController'
        }
      }
    })
    .state('instructor.main', {
      url: "/main",
        views: {
            'menu': {
                templateUrl: 'partials/instructorMenu.html',
                //controller: 'InstructorController'
            },
            'header': {
                templateUrl: 'partials/instructorHeader.html'
            },
            'content': {
                templateUrl: 'partials/instructorCourse.html',
            }
        },
    })

}]);
 
app.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});

/*
var app_login = angular.module('login', ['LSControllers', 'LSServices']);
app_login.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});
*/




