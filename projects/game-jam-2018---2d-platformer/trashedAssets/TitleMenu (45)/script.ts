class TitleMenuBehavior extends Sup.Behavior {
  
  awake() {
    Sup.Storage.set("warp", "1");
  }

  update() {
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      // Start level 1;
      Sup.Storage.set("warp", "1");
      Sup.loadScene("Level1/Scene"); 
    }
    else {
    // Warp to level
    let textEntered = Sup.Input.getTextEntered();
    if (textEntered.length > 0 && textEntered.match('^[0-9]') ) { 
        // ... Save level warped to
        Sup.Storage.set("warp", textEntered);      
        let warpTo = "Level"+textEntered+"/Scene"
        Sup.loadScene(warpTo) }
    }
    // Toggle mute
    if (Sup.Input.wasKeyJustPressed("M")) {
      Sup.Storage.set("mute", "true"); 
    }
  }
}
Sup.registerBehavior(TitleMenuBehavior);
