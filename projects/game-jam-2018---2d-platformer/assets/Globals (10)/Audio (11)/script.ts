class AudioBehavior extends Sup.Behavior {
  awake() {
    let inGameMusicPlayer = new Sup.Audio.SoundPlayer("music1", 1.0, { loop: true });
    let introMusicPlayer = new Sup.Audio.SoundPlayer("musicintro", 1.0, { loop: false });

      // ... When entering the game, from some behavior ...
      introMusicPlayer.play();
      
      function playgamemusic() {
       inGameMusicPlayer.play();
      }
    
      Sup.setTimeout(3500, playgamemusic);
       
      // ... Entering Game
      if (Sup.Input.wasKeyJustPressed("SPACE")) {
        introMusicPlayer.stop()
      }
      
  }
  
  update() {
 
  }
}
Sup.registerBehavior(AudioBehavior);
