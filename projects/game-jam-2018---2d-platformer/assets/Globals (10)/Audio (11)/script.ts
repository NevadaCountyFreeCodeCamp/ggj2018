//Menu Audio
class AudioBehavior extends Sup.Behavior {
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("music1", 1.0, { loop: true })
  introMusicPlayer = new Sup.Audio.SoundPlayer("musicintro", 1.0, { loop: false })
  
  awake() {
    Sup.Storage.set("mute", "false")

      // ... When entering the game, from some behavior ...
      this.introMusicPlayer.play();
      let gamemusic = this.inGameMusicPlayer  
    
      function playgamemusic() {
       gamemusic.play();
      }
        Sup.setTimeout(3700, playgamemusic);
  }
  update(){
   let gamemusic = this.inGameMusicPlayer
    function playgamemusic() {
       gamemusic.play();
      }
    
    if (Sup.Storage.get("mute") == "true") {
         gamemusic.setVolume(0)    
    //the unmute here is not working on the startup menu for some reason...
    } else if (Sup.Storage.get("mute") == "false") {     
         gamemusic.setVolume(1.0)              
  }
    //Sup.log(Sup.Storage.get("mute"))
  }
  
  onDestroy() {
    this.inGameMusicPlayer.stop(); 
    this.introMusicPlayer.stop();
  }
}

Sup.registerBehavior(AudioBehavior);


//Used for in level music
class InGameAudioBehavior extends Sup.Behavior {
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("music1", 1.0, { loop: true });
  awake() {
    //AudioBehavior.prototype.destroy; 
    
    let gamemusic = this.inGameMusicPlayer
        function playgamemusic() {
       gamemusic.play();
      }
    
    Sup.setTimeout(500, playgamemusic)

  }
  onDestroy() {
    this.inGameMusicPlayer.stop(); 
  }
  
  
  update() {
    let gamemusic = this.inGameMusicPlayer
    function playgamemusic() {
       gamemusic.play();
      }
    
    if (Sup.Storage.get("mute") == "true") {
         gamemusic.setVolume(0)
    } else if (Sup.Storage.get("mute") == "false") {     
         gamemusic.setVolume(1.0)              
  } 
  }
}
Sup.registerBehavior(InGameAudioBehavior);

