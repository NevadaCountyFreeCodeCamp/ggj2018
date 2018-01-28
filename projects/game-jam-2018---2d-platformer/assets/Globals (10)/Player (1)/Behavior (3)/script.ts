Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  platformBodies: Sup.ArcadePhysics2D.Body[] = [];
  ladderBodies: Sup.ArcadePhysics2D.Body[] = [];

  awake() {
    // We get and store all the bodies in two arrays, one for each group
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.platformBodies.push(platformActor.arcadeBody2D);
    let ladderActors = Sup.getActor("Ladders").getChildren();
    for (let ladderActor of ladderActors) this.platformBodies.push(ladderActor.arcadeBody2D);
  }
  
  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    
    /*
    This is a start are trying to get oneway platforms. Multi line comment starts with 
    
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    
    // Then we'll check for collision with one-way platforms,
    // ... but only when falling! That's the trick.
    let touchPlatforms = false;
    if (velocity.y < 0) {
      let position = this.actor.getLocalPosition();
      // We must change the size of the player body so only the feet are checked
      // To do so, we decrease the height of the body and adapt the offset
      this.actor.arcadeBody2D.setSize(1.5, 0.4);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.2 });
      // Then we override the body position using the current actor position
      this.actor.arcadeBody2D.warpPosition(position);

      // Now, check against every platform
      for (let platformBody of this.platformBodies) {
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, platformBody);
        if (this.actor.arcadeBody2D.getTouches().bottom) {
          touchPlatforms = true;
          velocity.y = 0;
          break;
        }
      }

      // Once done, reset the body to its full size
      position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(1.5, 1.8);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0.9 });
      this.actor.arcadeBody2D.warpPosition(position);
    }
    */

    
    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;
    
    let thisLocation = this.actor.arcadeBody2D.getOffset;
    let onLadder = this.ladderBodies;
    
    //Sup.log(`#{thisLocation} #{onLadder}`)
   /* 
    if (onLadder) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }
      this.actor.arcadeBody2D.setVelocity(velocity);
    */
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }

    if (Sup.Input.isKeyDown("SPACE")) {
      this.actor.spriteRenderer.setAnimation("Attack");
    }
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
}
Sup.registerBehavior(PlayerBehavior);
