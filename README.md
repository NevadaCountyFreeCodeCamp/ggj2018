# Build

```
docker build -t super .
```

# Run

```
docker run -p 4237:4237 -p 4238:4238 --rm --name=super -v "$(pwd)"/projects:/superpowers/projects -it super
```