'use strict';

angular.module('noterious', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'noterious.common',
  'gridster'
])
  .constant('ENDPOINT_URI', 'tomsah-noterious.firebaseapp.com')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/boards');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('boards', {
        url:'/boards',
        templateUrl: 'app/boards/boards-mdv.tmpl.html',
        controller: 'BoardsCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .state('notes', {
        url:'/boards/:boardId/notes',
        templateUrl: 'app/notes/notes-mdv.tmpl.html',
        controller: 'NotesCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
    ;
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;
