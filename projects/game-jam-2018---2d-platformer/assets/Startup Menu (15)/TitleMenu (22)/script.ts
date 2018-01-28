class TitleMenuBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if (Sup.Input.wasKeyJustPressed("SPACE")) Sup.loadScene("Level1/Scene");
  }
}
Sup.registerBehavior(TitleMenuBehavior);
