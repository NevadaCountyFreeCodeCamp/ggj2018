# Global Game Jam 2018 - Jimbo

![](img/title.png)
![](img/ingame.png)

2D Platformer built with [Superpowers](https://github.com/superpowers/superpowers-core)!

# Build

```
docker build -t super .
```

# Run

```
docker run -p 4237:4237 -p 4238:4238 --rm --name=super -v "$(pwd)"/projects:/superpowers/projects -it super
```

# About Superpowers:

http://docs.superpowers-html5.com/en/getting-started/first-project
