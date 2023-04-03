# react-angle-range

> a react angle picker

## Install

git clone https://github.com/jrehm135/react-angle-range.git

## Usage

```jsx
import React, { Component } from 'react';
import AngleRange from 'react-angle-range';

class Example extends Component {
  render() {
    return (
      <AngleRange
        // required
        value = {{ from: 0, to: 90 }}
        onChange = {({ from = 0, to = 90 }) => {}}
        
        // optional
        isDisabled = {false}
        radius = {150}
        handlerRangeRadiusOffset = {30}
        handlerRadius = {10}
        min = {0}
        max = {359}
        isQuarterCircle = {false}
        displayDashes = {false}
      />
    )
  }
}
```

## Params



### Required

- #### value : { from: `number`[`degress`], to: `number`[`degress`] }
The value is the controlled range given by the parent components.
Notice that the numbers will be considered as degrees (and not as radiants) and are between 0 to 360.

- #### onChange : `funcion({ from, to })`
The function receives `{ from, to }` as its arument as calculated from the picker.


### Optional
- #### isDisabled : `boolean` (default: `false`)
Controls whether the controller is disabled or enabled. When the controller is disabled, handles are not draggable.

- #### radius : `number`[`px`] (default: `150`)
Radius of the full range.

- #### handlerRangeRadiusOffset : `number`[`px`]  (default: `30`)
Distance of the angle handler from the full range.

- #### handlerRadius : `number`[`px`]  (default: `10`)
Radius of the angle handler.

- #### min : `number`[`degress`]  (default: `0`)
Minimal value for the range (minimal `value.from`).

- #### max : `number`[`degress`]  (default: `359`)
Maximal value for the range (minimal `value.from`).

- #### isQuarterCircle : `boolean` (default: `false`)
Create a full range of only 0 until 90 degrees. 
The range will be the top-right range. 

- #### displayDashes : `boolean` (default: `true`)
Displays 10px dash marks every 5 degrees

### classes
All the styles of the internal components are configurable via the next names.
- root
- rootBoundaries
- fullRange
- relativeAxis
- axisCenter
- centerAngleHandler
- offsetAngleHandler
- offsetsSegment
- offsetsSegmentRemove

## License

MIT © [jrehm135](https://github.com/jrehm135)
