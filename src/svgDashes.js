/* eslint-disable prettier/prettier */
import React, {useState} from "react";

const RADIUS = 0;

function SvgDashes({
  radius = RADIUS,
  isQuarterCircle = false
}) {
  const [key, setKey] = useState(0);

  // useEffect(() => {
  //   console.log(key, value, radius)
  //   setKey(key + 1)
  // }, [value, radius])

  return (
    <div 
    style={{      
        position: "absolute",
        overflow: "visible",
        width: 2 * radius,
        height: 2 * radius,
        // width: 2 * radius,
        // height: 2 * radius,
      }}>
        <svg key={key}
        viewBox={(isQuarterCircle ? 
          radius + " 0 " :
            "0 0 ") + 2 * radius + " " + 2 * radius}
        >
          <defs>
            <g id={"r"+radius} style={{stroke: "black"}}>
                <line x1={radius - 10} x2={radius - 1} />
                <line x1={-(radius - 10)} x2={-(radius - 1)} />
                <line y1={radius - 10} y2={radius - 1} />
                <line y1={-(radius - 10)} y2={-(radius - 1)} />
            </g>
          </defs>
          <g transform={"translate(" + radius + " " + radius + ")"}>
            <use xlinkHref={"#r" + radius} transform="rotate( 0)"/>
            <use xlinkHref={"#r" + radius} transform="rotate( 5)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(10)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(15)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(20)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(25)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(30)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(35)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(40)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(45)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(50)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(55)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(60)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(65)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(70)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(75)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(80)"/>
            <use xlinkHref={"#r" + radius} transform="rotate(85)"/>
          </g>
        </svg>
      </div>
  );
};

export default SvgDashes;
