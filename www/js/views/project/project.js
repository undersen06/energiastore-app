"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/
(function() {
  this.app.controller("ProjectController", ["$scope","$state","$ionicPlatform","$ionicPopup","StorageUserModel","Calculation","translationService","$resource","IonicClosePopupService","Utils","$ionicLoading","httpUtilities","popUpService","StorageProject","Quotation","$cordovaActionSheet","$cordovaStatusbar","Motors","StorageCountryModel",
    function($scope,$state,$ionicPlatform,$ionicPopup,StorageUserModel,Calculation,translationService,$resource,IonicClosePopupService,Utils,$ionicLoading,httpUtilities,popUpService,StorageProject,Quotation,$cordovaActionSheet,$cordovaStatusbar,Motors,StorageCountryModel) {

      $scope.design = {};
      switch (StorageUserModel.getCurrentUser().type_user) {
        case 'user':

        $scope.design.header = 'user-color'
        $scope.design.footer = 'user-color'
        $scope.design.button = 'user-color-button'
        break;

        case 'partner':
        $scope.design.header = 'partner-color'
        $scope.design.footer = 'partner-color'
        $scope.design.button = 'partner-color-button'
        break;

        case 'explorer':
        $scope.design.header = 'explorer-color'
        $scope.design.footer = 'explorer-color'
        $scope.design.button = 'explorer-color-button'
        break;
        default:
        $scope.design.header = 'user-color'
        $scope.design.footer = 'user-color'
        $scope.design.button = 'user-color-button'
        break;
      }


      $scope.currency = StorageCountryModel.getSelectedCurrency().symbol;
      $scope.price = StorageCountryModel.getSelectedCountry().energy_cost;


      $ionicPlatform.ready(function() {

        var projectPopUp;

        const languageFilePath = translationService.getTranslation();
        $resource(languageFilePath).get(function(data) {
          $scope.translations = data;
          $scope.options = { title: 'Seleccione acción', buttonLabels: ["Eliminar","Duplicar"], addCancelButtonWithLabel: $scope.translations.CHOOSE_LANGUAGE_CANCEL, androidEnableCancelButton: true, winphoneEnableCancelButton: true };
          $scope.init();
        });

        $scope.has_quotation = false;
        $scope.calculations = {};
        var user = StorageUserModel.getCurrentUser();
        $scope.user = StorageUserModel.getCurrentUser();

        $scope.back = function() {
          $state.go("dashboard");
        };

        $scope.init = function() {
          $ionicLoading.show({
          templateUrl:"loading.html"
        }).then(function () {

          if(user.type_user === 'explorer'){
            $scope.getExplorerCalulation();
          }else{
              $scope.getCalculation();
          }


        });
        };

        $scope.getExplorerCalulation = function(){

          if(StorageProject.getProjects()=== undefined){

          }else{
            $scope.calculations[0] = StorageProject.getProjects();
          }

          $ionicLoading.hide();
          $scope.$broadcast("scroll.refreshComplete");

        }


        $scope.doRefreshQuotation = function() {
          if(user.type_user === 'explorer'){
            $scope.getExplorerCalulation();
          }else{
              $scope.getCalculation();
          }
          // $scope.getCalculation();
        };

        $scope.addQuotationPopUp = function() {
          $scope.data = {};
          $scope.data.price = $scope.price;

          projectPopUp = $ionicPopup.show({
            animation: 'fade-in',
            title: '<img src="assets/img/project.png" class="img-about-us">',
            subTitle: `<span class="popup-title">${$scope.translations.CREATE_QUOTATION_POPUP_TEXT}</span>`,
            template: `<div class="input-field col s12"><input id="quotation_name" type="text" class="validate" ng-model="data.name"><label for="quotation_name">${$scope
              .translations.ADD_QUOTATION_POPUP_FIRST_INPUT}</label></div>
              <div class="input-field col s12">
               <input id="quotation_kwh_price" type="number" min="0"  pattern="[0-9]*" class="validate" ng-model="data.price" ><label for="quotation_kw_price">${$scope
                 .translations.ADD_QUOTATION_POPUP_SECOND_INPUT}</label></div>`,
            scope: $scope,
            buttons: [  { text: 'Cancelar',
              type: 'button-cancel'
            },
              {
                text: `${$scope.translations.QUOTATION_POPUP_ACCEPT_BUTTON}`,
                type: 'button-afirmative',
                onTap: function(e) {
                  if (!$scope.data.name) {
                    Utils.validateToast($scope.translations.QUOTATION_ERROR_EMPTY_FIRST_INPUT_INFO,);
                    e.preventDefault();
                  } else if (!$scope.data.price) {
                    Utils.validateToast($scope.translations.QUOTATION_ERROR_EMPTY_SECOND_INPUT_INFO);
                    e.preventDefault();
                  } else {
                    if(user.type_user === 'explorer'){
                      if(StorageProject.getProjects() === undefined){

                        var project={
                          name:$scope.data.name,
                          energy_cost:$scope.data.price
                        }


                      StorageProject.addProjects(project);
                      $scope.getExplorerCalulation();

                    }else{

                      popUpService.showPopupOnlyOneProject($scope.translations).then();
                    }
                    }else{
                      $scope.craeteCalculation($scope.data);
                    }

                    // return $scope.data.model;
                  }
                }
              }]
          });



        };

        $scope.craeteCalculation = function(data) {
          Calculation.create(data, StorageUserModel.getCurrentUser()).then(
            function(_response) {
              Utils.validateToast($scope.translations.QUOTATION_CREATED_MESSAGE);
              $scope.calculations = {};
              $scope.getCalculation();
              console.log(_response);
              if(cordova.plugins){
                cordova.plugins.Keyboard.close();
              }
            },
            function(_error) {
              Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
              console.log(_error);
            }
          );
        };

        $scope.getCalculation = function() {
          Calculation.getAll(StorageUserModel.getCurrentUser()).then(
            function(_response) {
              $scope.calculations = _response.data;
              $scope.$broadcast("scroll.refreshComplete");
              console.log(_response);
              $ionicLoading.hide()
            },
            function(_error) {
              $ionicLoading.hide()
              httpUtilities.validateHTTPResponse(_error,popUpService,$scope.translations);

              // Utils.validateToast($scope.translations.QUOTATION_ERROR_DOWNLOAD_INFO);
              $scope.$broadcast("scroll.refreshComplete");
              console.error(_error);

            }
          );
        };

        $scope.goToCalculation = function(calculation) {
          var queries = {
            id_quotation: calculation.id,
            project_name: calculation.name || ''
          }

          $state.go("motors", queries, { reload: true });
        };


        $scope.goToProjects= function(){
          $state.go('project');
        }
        $scope.goToProfile= function(){
          $state.go('settings');
        }
        $scope.goToQuotes= function(){

          $state.go('quotation');
        }
        $scope.goToDashboard= function(){
          $state.go("dashboard");
        }



        $scope.showPDF = function(values){
          if(StorageUserModel.getCurrentUser().type_user === 'explorer'){

          }else{

            $scope.getAvaliablePDF(values);
          }
        }


        $scope.getAvaliablePDF = function(value){
          Quotation.getAvaliablesPDFById(StorageUserModel.getCurrentUser(),value.id).then(function(_response){

          },function(_error){

          })
        }

         $scope.shouldShowDelete = false;
         $scope.shouldShowReorder = false;
         $scope.listCanSwipe = true;



         $ionicPlatform.registerBackButtonAction(function () {
             $state.go("dashboard");
         }, 100);


         $scope.duplicateProject = function(calculation){

           $ionicLoading.show({
           templateUrl:"loading.html"
         }).then(function () {

              calculation.name = calculation.name + '_duplicated';

           Calculation.create(calculation, StorageUserModel.getCurrentUser()).then(
             function(_response) {

               $scope.getMotors(calculation.id,_response.data.id);
             },
             function(_error) {
               Utils.validateToast($scope.translations.QUOTATION_FAIL_MESSAGE);
               console.log(_error);
             }
           );
         });
        }

        $scope.getMotors = function(old_calculation_id,new_calculation_id){


          Motors.getByCalculation(old_calculation_id,StorageUserModel.getCurrentUser()).then(function(_response){
            $scope.insertMotors(_response.data,new_calculation_id);

          },function(_error){
            console.log(_error);
            $scope.$broadcast('scroll.refreshComplete');
          })
        }

        $scope.insertMotors = function(motors,old_calculation_id){

          for (var i = 0; i <= motors.length-1 ; i++) {

            var motor = motors[i];
            var _motor= {
              calculation_id:old_calculation_id,
              name:motor.name,
              rated_power:motor.rated_power, //potencia
              hours:motor.hours,
              volatje:motor.volts,
              amp:motor.amp,
              power_factor:motor.fdp
            }

            Motors.create(StorageUserModel.getCurrentUser(),_motor,old_calculation_id).then(function(_response){

              $ionicLoading.hide();
            },function(_error){

            })
          }
        }

        $scope.closePopUp = function(){
          debugger;
          projectPopUp.close();
        }




      });
    }
  ]);
}.call(this));
