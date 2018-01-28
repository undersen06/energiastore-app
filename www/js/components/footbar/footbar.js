'use strict';

(function() {
  this.app.component('footbar', {
     templateUrl: "js/components/footbar/footbar.html",
      controller: function ($scope,$state,translationService,$resource) {

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function (data) {
          $scope.translations = data;
        });

        $scope.goToDashboard = function(){
          $state.go("dashboard");
        }

        $scope.goToProjects = function(){
          $state.go("project");
        }

        $scope.goToQuotes = function(){
          $state.go("quotation")
        }


      }
  });
}).call(this);
