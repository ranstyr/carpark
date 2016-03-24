angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

 .controller('record', function($scope, Sounds, $ionicPlatform) {

    var getSounds = function() {
      console.log('getSounds called');
      Sounds.get().then(function(sounds) {
        console.dir(sounds);
        $scope.sounds = sounds;
      });
    }

    $scope.$on('$ionicView.enter', function(){
      console.log('enter');
      getSounds();
    });

    $scope.play = function(x) {
      console.log('play', x);
      Sounds.play(x);
    }

    $scope.delete = function(x) {
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

    $scope.cordova = {loaded:false};

   var captureError = function(e) {
     console.log('captureError' ,e);
   }

   var captureSuccess = function(e) {
     console.log('captureSuccess');console.dir(e);
     $scope.sound.file = e[0].localURL;
     $scope.sound.filePath = e[0].fullPath;
   }


   var data = {
     rec: ""
   };
   $scope.record = function(){
       function onSuccess(){
         alert("recordingSuccess")
       }

       function onError(err){
         alert("code" + err.code + '\n' +
           'message + err.message');
       }
       var src = "myrecording.wav";
       var mediaRec = new Media(src, onSuccess, onError);

       // Record audio
       mediaRec.startRecord();

       // Stop recording after 10 sec
       var recTime = 0;
       var recInterval = setInterval(function() {
         recTime = recTime + 1;
         //setAudioPosition(recTime + " sec");
         if (recTime >= 3) {
           clearInterval(recInterval);
           mediaRec.stopRecord();
           mediaRec.play();
         }
       }, 1000);

   }

   $scope.stopRecording = function(){
     console.log('stop');
     data.rec.stopRecord();
   }

   $scope.playRecording = function(){
     console.log('play');
     data.rec.play();
   }

   $scope.logDuration = function(){
     console.log(data.rec.getDuration());
   }

  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
