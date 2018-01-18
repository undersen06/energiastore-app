'use strict';

(function () {
  app.service("httpUtilities", ["StorageUserModel", "popUpService", "$state", "$rootScope", function (StorageUserModel, popUpService, $state, $rootScope) {

    var httpUtilities = this;

    this.validateHTTPResponse = function (_error, _popUpService,translations) {

      switch (_error.status) {
        case 401:
          // ocurre cuando los token no coinciden y debe vovler a inicar session

          _popUpService.showPopupTokenProblem(translations).then(function (_res) {
            httpUtilities.deleteStorageData();
          });

          break;



        case 500:
          // ocurre cuando existe un problema interno en el servidor




          break;

        default:
          break;

      }
    };


    this.deleteStorageData = function () {
      StorageUserModel.destroyCurrentUser();
      $state.go("welcome");
    };

    this.configCameraOption = function (_quality, _width, _height) {
      if (_quality === undefined) {
        _quality = 100;
      }

      if (_width === undefined) {
        _width = 500;
      }

      if (_height === undefined) {
        _height = 500;
      }

      return {
        quality: _quality,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: _width,
        targetHeight: _height,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };
    };

    this.configGalleryOptions = function (_quality, _width, _height) {

      if (_quality === undefined) {
        _quality = 100;
      }

      if (_width === undefined) {
        _width = 500;
      }

      if (_height === undefined) {
        _height = 500;
      }

      return {
        quality: _quality,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: _width,
        targetHeight: _height,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
    };
  }]);
}).call();
