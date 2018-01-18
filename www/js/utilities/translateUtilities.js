"use strict";

/*
=============================================================================
CONTROLLER DEFINITION
=============================================================================
*/

app.service('translationService',
    function($resource,StorageLanguageModel) {

        return{
            getTranslation:function() {

                return 'js/translations/translation_'+StorageLanguageModel.getCurrentLanguage()+'.json';

                // return $resource(languageFilePath).get(function (data) {
                //   return data;
                // })
            },
            translate:function(languageFilePath){
                $resource(languageFilePath).get(function (data) {
                    //  $scope.translations = data;
                    return data;

                })
            }
        }


    });
