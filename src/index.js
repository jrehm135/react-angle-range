import React, { useState, useCallback, useEffect, useRef } from "react";
import { useMouse } from "react-use";

import SvgDashes from "./svgDashes";

const HANDLER_RADIUS = 10;
const DEFAULT_HANDLER_RADIUS_OFFSET = 10;
const RADIUS = 0;

const radiansToDegrees = radians =>
  parseInt(((radians * 180) / Math.PI).toFixed(0), 10);

const degreesToRadians = degress => (degress * Math.PI) / 180;

function AngleRange({
  value = 0,
  onChange = (event) => {},
  isDisabled = false,
  isQuarterCircle = false,
  displayDashes = true,
  radius = RADIUS,
  handlerRangeRadiusOffset = DEFAULT_HANDLER_RADIUS_OFFSET,
  handlerRadius = HANDLER_RADIUS,
  min = 0,
  max = 359
}) {

  const getHandlerXY = useCallback(
    (angle, handlerRadiusOffset) => {
      const alpha = angle % 360;
      const x =
        (radius + handlerRadiusOffset) * Math.sin(degreesToRadians(alpha));
      const y =
        -(radius + handlerRadiusOffset) * Math.cos(degreesToRadians(alpha));
      return { x, y };
    },
    [radius]
  );

  const [centerHandler, setCenterHandler] = useState({
    ...getHandlerXY(value, handlerRangeRadiusOffset),
    angle: value
  });

  const [isCenterHandlerActive, setIsCenterHandlerActive] = useState(false);

  const centerHandlerEl = useRef(null);
  const axisCenterEl = useRef(null);

  const { elX, elY } = useMouse(axisCenterEl);

  const onCenterAngleHandlerMouseDown = useCallback(
    (e) => {
      if (isDisabled) {
        return;
      }
      setIsCenterHandlerActive(true);
      document.addEventListener(
        "mouseup", (event) => {
          setIsCenterHandlerActive(false);
        },{ once: true }
      )
    },
    [setIsCenterHandlerActive, centerHandler.angle, isDisabled]
  );

  const getAbsoluteAngle = useCallback(() => {
    let theta =
      Math.round(elY) !== 0 // avoid dividing by 0
        ? radiansToDegrees(Math.atan(elX / -elY))
        : 90;

    if (elY > 0 || elX < 0) {
      theta += 180;
    }
    if (elY < 0 && elX < 0) {
      theta += 180;
    }
    return theta;
  }, [elX, elY]);

  const onMouseMove = useCallback(
    (e) => {
      if (isDisabled) {
        return;
      }
      let updatedCenterAngle;
      if (isCenterHandlerActive) {
        updatedCenterAngle = getAbsoluteAngle();
        if (updatedCenterAngle < min || updatedCenterAngle > max) {
          updatedCenterAngle = centerHandler.angle;
        }
        const { x: xCenter, y: yCenter } = getHandlerXY(
          updatedCenterAngle,
          handlerRangeRadiusOffset
        );
        setCenterHandler({ x: xCenter, y: yCenter, angle: updatedCenterAngle });
      }

      if(updatedCenterAngle){
        onChange(updatedCenterAngle);
      }
    },
    [
      isDisabled,
      isCenterHandlerActive,
      getAbsoluteAngle,
      min,
      max,
      getHandlerXY,
      handlerRangeRadiusOffset,
      centerHandler.angle,
      onChange
    ]
  );

  useEffect(() => {
    setCenterHandler({
      ...getHandlerXY(value, handlerRangeRadiusOffset),
      angle: value
    })
  }, [value])
  
  return (
    <div
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        margin: "0px",
        display: "inline-block",
        cursor:
          isCenterHandlerActive
            ? "move"
            : "auto"
      }}
    >
      <div
        style={{
          border: "1px solid black",
          overflow: "hidden",
          position: "relative",
          width: isQuarterCircle ? radius : 2 * radius,
          height: isQuarterCircle ? radius : 2 * radius,
          borderRadius: 2 * radius,
          borderBottomRightRadius: isQuarterCircle ? 0 : 2 * radius,
          borderBottomLeftRadius: isQuarterCircle ? 0 : 2 * radius,
          borderTopLeftRadius: isQuarterCircle ? 0 : 2 * radius,
          margin: Math.max(handlerRangeRadiusOffset, 0)
        }}
      >
        {displayDashes && <SvgDashes radius={radius} isQuarterCircle={isQuarterCircle} />}
        
        <div
        style={{
          width: isQuarterCircle ? radius : 2 * radius,
          height: isQuarterCircle ? radius : 2 * radius,
        }}
      >
        <svg style={{
            width: isQuarterCircle ? radius : 2 * radius,
            height: isQuarterCircle ? radius : 2 * radius,
          }}>
          <line
            x1={(isQuarterCircle ? 0 : radius)}
            y1={radius}
            x2={centerHandler.x + (isQuarterCircle ? 0 : radius)}
            y2={centerHandler.y + radius}
            stroke="red"
            strokeWidth={5}
          />
        </svg>
      </div>
      </div>

      <div
        style={{         
          position: "absolute",
          top: radius + Math.max(handlerRangeRadiusOffset, 0),
          left:
            (isQuarterCircle ? 0 : radius) +
            Math.max(handlerRangeRadiusOffset, 0)
        }}
      >
        <div ref={axisCenterEl} style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderRadius: 6,
          backgroundColor: "black",
          padding: 6,
          paddingTop: 5,
          paddingLeft: 5,
          bottom: -6,
          right: -6
          }}/>

        <div
          ref={centerHandlerEl}
          style={{
            backgroundColor: "purple",
            position: "absolute",
            cursor: "drag",
            userSelect: "none",
            width: 2 * handlerRadius,
            height: 2 * handlerRadius,
            borderRadius: 2 * handlerRadius,
            transform: `translate(${centerHandler.x -
              handlerRadius}px, ${centerHandler.y - handlerRadius}px)`,
            opacity: isCenterHandlerActive ? 0.5 : 1,
            cursor: isCenterHandlerActive ? "move" : "pointer"
          }}
          onMouseDown={onCenterAngleHandlerMouseDown}
        />
      </div>
    </div>
  );
};

export default AngleRange;
