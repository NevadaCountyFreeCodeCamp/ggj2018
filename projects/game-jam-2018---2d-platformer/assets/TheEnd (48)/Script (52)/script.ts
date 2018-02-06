class TheEndBehavior extends Sup.Behavior {
  awake() {
    let scoreTextRenderer = Sup.getActor("Score").textRenderer
    let score = Sup.Storage.get("score")
    scoreTextRenderer.setText("Score: "+score)
    Sup.log(Sup.Storage.get("score"))
  }

  update() {
    
  }
}
Sup.registerBehavior(TheEndBehavior);
