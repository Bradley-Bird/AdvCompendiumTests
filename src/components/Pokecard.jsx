import React from 'react';
import { useState } from 'react';
import { StyledLi } from './StyledComponents/StyledLi';

function Pokecard({ pokemon, type_1, type_2, url_image, defense, attack }) {
  const [animatedState, setAnimatedState] = useState(true);
  const [cssStyles, setCssStyles] = useState({});
  const [beforeStyles, setBeforeStyles] = useState({});
  const [afterStyles, setAfterStyles] = useState({});
  const handleMove = (e) => {
    e.preventDefault();
    const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    setAnimatedState(false);
    // console.log(pos);
    //math for mouse position
    const l = pos[0];
    const t = pos[1];
    const h = e.target.clientHeight;
    const w = e.target.clientWidth;
    const px = Math.abs(Math.floor((100 / w) * l) - 100);
    const py = Math.abs(Math.floor((100 / h) * t) - 100);
    const pa = 50 - px + (50 - py);
    //math for gradient/background position
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;
    const px_spark = 50 + (px - 50) / 7;
    const py_spark = 50 + (py - 50) / 7;
    const p_opc = 20 + Math.abs(pa) * 1.5;

    const ty = ((tp - 50) / 2) * -1;
    const tx = ((lp - 50) / 1.5) * 0.5;
    //css to apply for active card
    const grad_pos = { backgroundPosition: `${lp}% ${tp}%;` };
    const sprk_pos = { backgroundPosition: `${px_spark}% ${py_spark}%;` };
    const opc = { opacity: `${p_opc / 100};` };
    const tf = { transform: `rotateX(${ty}deg) rotateY(${tx}deg)` };
    setBeforeStyles(grad_pos);
    setAfterStyles(sprk_pos, opc);
    setCssStyles(tf);
  };
  return (
    <StyledLi
      style={cssStyles}
      className={animatedState ? 'animated' : 'active'}
      onMouseMove={(e) => handleMove(e)}
      onMouseLeave={() => setTimeout(() => (setAnimatedState(true), 2500))}
    >
      <img className="img" src={url_image} alt={`An image of a${pokemon}`} />

      <span>{pokemon.toUpperCase()}</span>
      <div className="stats">
        <p>Type 1: {type_1}</p>
        <p>Type 2: {type_2}</p>
        <p>Attack:{attack}</p>
        <p>Defense:{defense}</p>
      </div>
    </StyledLi>
  );
}

export default Pokecard;
