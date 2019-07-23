# gridbeam-csg

GridBeam using constructive solid geometry (CSG)

```shell
npm install --save gridbeam-csg
```

## usage

### `GridBeam = require('gridbeam-csg')`

### `{ Beam } = GridBeam(csg)

where `csg` is from [`@jscad/csd`](https://github.com/jscad/csg.js#readme)

### `beam = Beam(options)`

`options`:

- `position`: array tuple of `[x, y, z]`
- `direction`: enum of `'x'`, `'y'`, or `'z'`
- `length`: integer

## license

The Apache License

Copyright &copy; 2018 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
