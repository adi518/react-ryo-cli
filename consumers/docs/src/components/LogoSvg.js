import React from 'react';
import styled from 'styled-components';

/* https://ivanceras.github.io/svgbob-editor/
                      __                                    ___
________  ____  _____/ /_      _______  ______        _____/ (_)
/ ___/ _ \/ __ \/ ___/ _ /_____/ ___/ / / / __ \______/ ___/ / /
/ /  /  __/ /_/ / /__/ /_/_____/ /  / /_/ / /_/ /_____/ /__/ / /
/_/   \___/\__,_/\___/\__/     /_/   \__, /\____/      \___/_/_/
                                 /____/
*/

// https://css-tricks.com/scale-svg/
const StyledLogoSvg = styled.svg.attrs({
  viewBox: '0 0 544 112',
  xmlns: 'http://www.w3.org/2000/svg'
})`
  display: block;

  line,
  path,
  circle,
  rect,
  polygon {
    stroke: var(--color-purple);
    stroke-width: 2;
    stroke-opacity: 1;
    fill-opacity: 1;
    stroke-linecap: round;
    stroke-linejoin: miter;
  }

  text {
    fill: var(--color-purple);
  }

  .broken {
    stroke-dasharray: 8;
  }

  .filled {
    fill: black;
  }

  .bg_filled {
    fill: white;
  }

  .nofill {
    // fill: white;
  }

  text {
    font-family: monospace;
  }

  .end_marked_arrow {
    marker-end: url(#arrow);
  }
  .start_marked_arrow {
    marker-start: url(#arrow);
  }

  .end_marked_diamond {
    marker-end: url(#diamond);
  }
  .start_marked_diamond {
    marker-start: url(#diamond);
  }

  .end_marked_circle {
    marker-end: url(#circle);
  }
  .start_marked_circle {
    marker-start: url(#circle);
  }

  .end_marked_open_circle {
    marker-end: url(#open_circle);
  }
  .start_marked_open_circle {
    marker-start: url(#open_circle);
  }

  .end_marked_big_open_circle {
    marker-end: url(#big_open_circle);
  }
  .start_marked_big_open_circle {
    marker-start: url(#big_open_circle);
  }
`;

const LogoSvg = () => (
  <StyledLogoSvg>
    <defs>
      <marker
        id="arrow"
        markerHeight="7"
        markerWidth="7"
        orient="auto-start-reverse"
        refX="4"
        refY="2"
        viewBox="-2 -2 8 8"
      >
        <polygon points="0,0 0,4 4,2 0,0"></polygon>
      </marker>
      <marker
        id="diamond"
        markerHeight="7"
        markerWidth="7"
        orient="auto-start-reverse"
        refX="4"
        refY="2"
        viewBox="-2 -2 8 8"
      >
        <polygon points="0,2 2,0 4,2 2,4 0,2"></polygon>
      </marker>
      <marker
        id="circle"
        markerHeight="7"
        markerWidth="7"
        orient="auto-start-reverse"
        refX="4"
        refY="4"
        viewBox="0 0 8 8"
      >
        <circle className="filled" cx="4" cy="4" r="2"></circle>
      </marker>
      <marker
        id="open_circle"
        markerHeight="7"
        markerWidth="7"
        orient="auto-start-reverse"
        refX="4"
        refY="4"
        viewBox="0 0 8 8"
      >
        <circle className="bg_filled" cx="4" cy="4" r="2"></circle>
      </marker>
      <marker
        id="big_open_circle"
        markerHeight="7"
        markerWidth="7"
        orient="auto-start-reverse"
        refX="4"
        refY="4"
        viewBox="0 0 8 8"
      >
        <circle className="bg_filled" cx="4" cy="4" r="3"></circle>
      </marker>
    </defs>
    <line className="solid" x1="72" x2="80" y1="48" y2="48"></line>
    <text x="114" y="76">
      ,
    </text>
    <text x="322" y="76">
      ,
    </text>
    <g>
      <line className="solid" x1="200" x2="216" y1="16" y2="16"></line>
      <line className="solid" x1="216" x2="208" y1="16" y2="32"></line>
      <line className="solid" x1="208" x2="224" y1="32" y2="32"></line>
      <line className="solid" x1="224" x2="200" y1="32" y2="80"></line>
      <line className="solid" x1="216" x2="264" y1="48" y2="48"></line>
      <line className="solid" x1="152" x2="192" y1="32" y2="32"></line>
      <line className="solid" x1="200" x2="176" y1="16" y2="64"></line>
      <line className="solid" x1="152" x2="128" y1="32" y2="80"></line>
      <line className="solid" x1="160" x2="184" y1="48" y2="48"></line>
      <line className="solid" x1="160" x2="152" y1="48" y2="64"></line>
      <line className="solid" x1="152" x2="176" y1="64" y2="64"></line>
      <line className="solid" x1="120" x2="128" y1="80" y2="80"></line>
      <line className="solid" x1="136" x2="144" y1="64" y2="80"></line>
      <line className="solid" x1="144" x2="168" y1="80" y2="80"></line>
      <line className="solid" x1="176" x2="168" y1="64" y2="80"></line>
      <line className="solid" x1="176" x2="184" y1="64" y2="80"></line>
      <line className="solid" x1="184" x2="200" y1="80" y2="80"></line>
      <line className="solid" x1="272" x2="328" y1="32" y2="32"></line>
      <line className="solid" x1="272" x2="248" y1="32" y2="80"></line>
      <line className="solid" x1="328" x2="312" y1="32" y2="64"></line>
      <line className="solid" x1="344" x2="392" y1="32" y2="32"></line>
      <line className="solid" x1="344" x2="328" y1="32" y2="64"></line>
      <line className="solid" x1="360" x2="336" y1="32" y2="80"></line>
      <line className="solid" x1="392" x2="400" y1="32" y2="48"></line>
      <line className="solid" x1="400" x2="448" y1="48" y2="48"></line>
      <line className="solid" x1="312" x2="328" y1="64" y2="64"></line>
      <line className="solid" x1="400" x2="384" y1="48" y2="80"></line>
      <line className="solid" x1="344" x2="352" y1="64" y2="80"></line>
      <line className="solid" x1="352" x2="384" y1="80" y2="80"></line>
      <line className="solid" x1="456" x2="496" y1="32" y2="32"></line>
      <line className="solid" x1="504" x2="480" y1="16" y2="64"></line>
      <line className="solid" x1="456" x2="440" y1="32" y2="64"></line>
      <line className="solid" x1="464" x2="488" y1="48" y2="48"></line>
      <line className="solid" x1="392" x2="440" y1="64" y2="64"></line>
      <line className="solid" x1="464" x2="456" y1="48" y2="64"></line>
      <line className="solid" x1="456" x2="480" y1="64" y2="64"></line>
      <line className="solid" x1="440" x2="448" y1="64" y2="80"></line>
      <line className="solid" x1="200" x2="208" y1="48" y2="48"></line>
      <line className="solid" x1="200" x2="192" y1="48" y2="64"></line>
      <line className="solid" x1="192" x2="256" y1="64" y2="64"></line>
      <line className="solid" x1="280" x2="304" y1="48" y2="48"></line>
      <line className="solid" x1="312" x2="296" y1="32" y2="64"></line>
      <line className="solid" x1="280" x2="264" y1="48" y2="80"></line>
      <line className="solid" x1="248" x2="264" y1="80" y2="80"></line>
      <line className="solid" x1="296" x2="304" y1="64" y2="80"></line>
      <line className="solid" x1="304" x2="320" y1="80" y2="80"></line>
      <line className="solid" x1="512" x2="488" y1="32" y2="80"></line>
      <line className="solid" x1="448" x2="504" y1="80" y2="80"></line>
      <line className="solid" x1="480" x2="472" y1="64" y2="80"></line>
      <line className="solid" x1="296" x2="288" y1="80" y2="96"></line>
      <line className="solid" x1="288" x2="328" y1="96" y2="96"></line>
      <line className="solid" x1="336" x2="328" y1="80" y2="96"></line>
      <line className="solid" x1="504" x2="528" y1="16" y2="16"></line>
      <path className="nofill" d="M 520,16 A 16,16 0,0,0 520,32"></path>
      <line className="solid" x1="520" x2="528" y1="32" y2="32"></line>
      <path className="nofill" d="M 528,16 A 16,16 0,0,1 528,32"></path>
      <line className="solid" x1="528" x2="504" y1="32" y2="80"></line>
      <line className="solid" x1="24" x2="88" y1="32" y2="32"></line>
      <line className="solid" x1="24" x2="0" y1="32" y2="80"></line>
      <line className="solid" x1="88" x2="96" y1="32" y2="48"></line>
      <line className="solid" x1="104" x2="136" y1="32" y2="32"></line>
      <line className="solid" x1="104" x2="80" y1="32" y2="80"></line>
      <line className="solid" x1="136" x2="144" y1="32" y2="48"></line>
      <line className="solid" x1="72" x2="88" y1="64" y2="64"></line>
      <line className="solid" x1="88" x2="96" y1="64" y2="80"></line>
      <line className="solid" x1="96" x2="112" y1="80" y2="80"></line>
      <line className="solid" x1="32" x2="56" y1="48" y2="48"></line>
      <line className="solid" x1="64" x2="48" y1="32" y2="64"></line>
      <line className="solid" x1="32" x2="16" y1="48" y2="80"></line>
      <line className="solid" x1="0" x2="16" y1="80" y2="80"></line>
      <line className="solid" x1="48" x2="56" y1="64" y2="80"></line>
      <line className="solid" x1="56" x2="80" y1="80" y2="80"></line>
    </g>
    <g>
      <line className="solid" x1="112" x2="128" y1="48" y2="48"></line>
      <line className="solid" x1="112" x2="104" y1="48" y2="64"></line>
      <line className="solid" x1="104" x2="120" y1="64" y2="64"></line>
      <line className="solid" x1="128" x2="120" y1="48" y2="64"></line>
    </g>
    <g>
      <line className="solid" x1="368" x2="384" y1="48" y2="48"></line>
      <line className="solid" x1="368" x2="360" y1="48" y2="64"></line>
      <line className="solid" x1="360" x2="376" y1="64" y2="64"></line>
      <line className="solid" x1="384" x2="376" y1="48" y2="64"></line>
    </g>
  </StyledLogoSvg>
);

export default LogoSvg;
