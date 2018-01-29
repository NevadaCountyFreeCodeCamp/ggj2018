//Menu Audio
class AudioBehavior extends Sup.Behavior {
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("music1", 1.0, { loop: true })
  introMusicPlayer = new Sup.Audio.SoundPlayer("musicintro", 1.0, { loop: false })
  
  awake() {

      // ... When entering the game, from some behavior ...
      this.introMusicPlayer.play();
      let gamemusic = this.inGameMusicPlayer  
    
      function playgamemusic() {
       gamemusic.play();
      }
    
      Sup.setTimeout(3700, playgamemusic);
  }
  
  onDestroy() {
    this.inGameMusicPlayer.stop(); 
    this.introMusicPlayer.stop();
  }
}
Sup.registerBehavior(AudioBehavior);


//Used for in level music
class InGameAudioBehavior extends Sup.Behavior {
  awake() {
    AudioBehavior.prototype.destroy;
    let inGameMusicPlayer = new Sup.Audio.SoundPlayer("music1", 1.0, { loop: true });
    function playgamemusic() {
       inGameMusicPlayer.play();
      }
    
      Sup.setTimeout(1000, playgamemusic);
  }
}
Sup.registerBehavior(InGameAudioBehavior);