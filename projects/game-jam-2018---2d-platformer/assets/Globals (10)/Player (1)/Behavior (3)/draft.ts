Sup.ArcadePhysics2D.setGravity(0, -0.02);

let warpedFrom = Sup.Storage.get("warp");
let currentLevel = parseInt(warpedFrom);

//Currenlty we only have five levels.  Change this value as we add more levels
let maxlevel = 5

let score = 0


class PlayerBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;
  attacking = false;
  crouching = false;
  
  // Jimbo Health
  health = 100;
  takeDamage(amount) {
    // Member variables are initialized when the behavior component is created.
    // You can access the behavior itself and its member variables through `this`.
    this.health -= amount;
    if (this.health <= 0) {
      // Die!
      this.actor.spriteRenderer.setAnimation("Die");
      this.actor.destroy();
      
    }
  }

  

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
    

    
    Sup.log(currentLevel)
    Sup.log(warpedFrom)
  
  }
  
  update() {
        
    let myname = this.actor.getName();
    //Sup.log(myname); 
    let parent = this.actor.getParent();
    //Sup.log(parent); <--- what I was messing with before
    


    //Load next level when all alive jimbos have touched Dino.
    
    let alivejimbos = Sup.getActor("Players").getChildren().slice(0, 10).length
    //Sup.log(alivejimbos);
    
    if (alivejimbos >= 2) {
     if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Dino").arcadeBody2D)) {
       this.actor.destroy(); 
       score+=10;
    }
    }
    

    
    if (alivejimbos == 1) {
      if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Dino").arcadeBody2D)) {
        if (currentLevel >= maxlevel) {
          score+=10;
          Sup.loadScene("TheEnd/Scene")
          Sup.Storage.set("score", score.toString())
        }
        else {
         score+=10;
        currentLevel++;  
        Sup.loadScene("Level"+currentLevel+"/Scene");
        Sup.Storage.set("score", score.toString());   
        }
      }
    }
    
    
    
    if (alivejimbos == 1) {
      if ((Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Pit").arcadeBody2D)) || (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Spike").arcadeBody2D))) { 
        Sup.loadScene("GameOver/Scene");
        Sup.Storage.set("score", score.toString());
      }
    }
    
    
    //Kill Jimbo
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Spike").arcadeBody2D)) {
        this.takeDamage("50")    
        }
    
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.getActor("Pit").arcadeBody2D)) {
        this.takeDamage("100")    
        }
        

  
    // Allow setting mute in game
    if (Sup.Storage.get("mute") == "true") {
      if (Sup.Input.wasKeyJustPressed("M")) {
      Sup.Storage.set("mute", "false"); 
    }
    } else if (Sup.Input.wasKeyJustPressed("M")) {
      Sup.Storage.set("mute", "true"); 
    }
  
    //collision
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    
    /*
    This is a start are trying to get oneway platforms.
    
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
        if ( !this.crouching && !this.attacking ) {
          if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
          else this.actor.spriteRenderer.setAnimation("Run");
        }
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }
    
    if (Sup.Input.isKeyDown("SPACE") ) {
      if ( !this.attacking ) {
        this.actor.spriteRenderer.setAnimation("Attack", true);
        this.attacking = true;
      }
    } else if ( this.attacking ) {
        this.actor.spriteRenderer.setAnimation("Idle", false);
        this.attacking = false;
      }

    if( Sup.Input.isKeyDown("DOWN") ) {
     if( !this.crouching ) {
      this.actor.spriteRenderer.setAnimation("Roll", true);
      this.crouching = true;
     }
    } else if( this.crouching ) {
      this.actor.spriteRenderer.setAnimation("Idle", false);
      this.crouching = false;
    }

    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  
  }
}
Sup.registerBehavior(PlayerBehavior);
