import _ from 'lodash';

export class RecordController {
  constructor($ionicPlatform , $scope) {
    this.$scope     = $scope;
    this.$ionicPlatform = $ionicPlatform;

    this.$scope.$on('$ionicView.enter', function(){
      console.log('enter');
      getSounds();
    });

    this.$scope.play = function(x) {
      console.log('play', x);
      Sounds.play(x);
    }

    this.$scope.delete = function(x) {
      console.log('delete', x);
      Sounds.get().then(function(sounds) {
        var toDie = sounds[x];
        window.resolveLocalFileSystemURL(toDie.file, function(fe) {
          fe.remove(function() {
            Sounds.delete(x).then(function() {
              getSounds();
            });
          }, function(err) {
            console.log("err cleaning up file", err);
          });
        });
      });
    }

    this.$scope.cordova = {loaded:false};
    this.$ionicPlatform.ready(function() {
      this.$scope.$apply(function() {
        this.$scope.cordova.loaded = true;
      });
    });


  }
}






