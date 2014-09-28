# ledmatrix

> node-webkit and web Application for controlling a led matrix and also playing snake game.

## Building

We currently only support the full install on 64 bits Linux as we are dealing with a `postinstall` script specifically for Linux distributions to be able to provide a correct use of node-serialport along with node-webkit. Fork it to help us expand to other architectures!

First, install the dependencies:

```sh
$ npm install
```
then you can build the project for the web or for node-webkit.

For the web:

```sh
$ NODE_ENV=web webpack -p
```

For nodewebkit:
```sh
$ NODE_ENV=nodewebkit webpack -p
```


## Related

Building `ledmatrix` was extremely fun. We ([MateusZitelli](https://www.github.com/MateusZitelli) and i) had only 2 days to build this (including assembling the Arduino project, soldering the board and etc) and what i can tell is that building all of the software on top of node-webkit with the front end components powered by ReactJS along with the Flux pattern was really easy (the easiest part). You should **definitely** go check what are the technologies behind this.

See:

- [rogerwang/node-webkit](https://www.github.com/rogerwang/node-webkit) - for building the desktop application using web tools
- [facebook/react](https://www.github.com/facebook/react) - for creating the UI
- [facebook/flux](https://www.github.com/facebook/flux) - for managing data, events and UI state
- [MateusZitelli/arduino-led-matrix](https://www.github.com/MateusZitelli/arduino-led-matrix) - Arduino code and sketch for the matrix
- [cirocosta/yaspm](https://www.github.com/cirocosta/yaspm) - dealing nicely in a node-way with node-serialport
- [cirocosta/react-matrix](https://www.github.com/cirocosta/react-matrix) - representing in SVG a given matrix
- [cirocosta/matrix-snake](https://www.github.com/cirocosta/matrix-snake) - playing Snake game with a matrix.
