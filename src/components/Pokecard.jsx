import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

function Pokecard({ pokemon, type_1, type_2, url_image, defense, attack }) {
  const [animatedState, setAnimatedState] = useState(true);
  const [cssStyles, setCssStyles] = useState({});
  const [beforeStyles, setBeforeStyles] = useState({
    backgroundPosition: `50% 50%`,
  });
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
      beforeStyles={beforeStyles}
      afterStyles={afterStyles}
      style={cssStyles}
      className={animatedState ? 'animated' : 'active'}
      onMouseMove={(e) => handleMove(e)}
      onMouseLeave={() => setTimeout(() => (setAnimatedState(true), 2000))}
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
const StyledLi = styled.li`
  & {
    --color1: rgb(0, 231, 255);
    --color2: rgb(255, 0, 231);
    width: 71.5vw;
    height: 100vw;
    /* width: clamp(200px, 61vh, 18vw); */
    /* height: clamp(280px, 85vh, 25.2vw); */
    @media screen and (min-width: 600px) {
      /* width: 61vh;
      height: 85vh;
      max-width: 500px;
      max-height: 700px; */
      width: clamp(12.9vw, 61vh, 18vw);
      height: clamp(18vw, 85vh, 25.2vw);
    }

    position: relative;
    overflow: hidden;
    margin: 20px;
    overflow: hidden;
    z-index: 10;
    touch-action: none;

    border-radius: 5% / 3.5%;
    box-shadow: -5px -5px 5px -5px var(--color1), 5px 5px 5px -5px var(--color2),
      -7px -7px 10px -5px transparent, 7px 7px 10px -5px transparent,
      0 0 5px 0px rgba(255, 255, 255, 0), 0 55px 35px -20px rgba(0, 0, 0, 0.5);

    transition: transform 0.5s ease, box-shadow 0.2s ease;
    will-change: transform, filter;

    background-color: #040712;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    transform-origin: center;
  }
  &:hover {
    box-shadow: -20px -20px 30px -25px var(--color1),
      20px 20px 30px -25px var(--color2), -7px -7px 10px -5px var(--color1),
      7px 7px 10px -5px var(--color2), 0 0 13px 4px rgba(255, 255, 255, 0.3),
      0 55px 35px -20px rgba(0, 0, 0, 0.5);
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    opacity: 0.5;
    mix-blend-mode: color-dodge;
    transition: all 0.33s ease;
  }
  &:before {
    background-position: 50% 50%;
    background-size: 300% 300%;
    background-image: linear-gradient(
      115deg,
      transparent 0%,
      var(--color1) 25%,
      transparent 47%,
      transparent 53%,
      var(--color2) 75%,
      transparent 100%
    );
    opacity: 0.5;
    filter: brightness(0.5) contrast(1);
    z-index: 1;
  }
  &:after {
    opacity: 1;
    background-image: url('https://assets.codepen.io/13471/sparkles.gif'),
      url(https://assets.codepen.io/13471/holo.png),
      linear-gradient(
        125deg,
        #ff008450 15%,
        #fca40040 30%,
        #ffff0030 40%,
        #00ff8a20 60%,
        #00cfff40 70%,
        #cc4cfa50 85%
      );
    background-position: 50% 50%;
    background-size: 160%;
    background-blend-mode: overlay;
    z-index: 2;
    filter: brightness(1) contrast(1);
    transition: all 0.33s ease;
    mix-blend-mode: color-dodge;
    opacity: 0.75;
  }
  &.active:after,
  &:hover:after {
    filter: brightness(1) contrast(1);
    opacity: 1;
    ${(props) => props.afterStyles}
  }
  &.active:before,
  &:hover:before {
    animation: none;
    background-image: linear-gradient(
      110deg,
      transparent 25%,
      var(--color1) 48%,
      var(--color2) 52%,
      transparent 75%
    );
    ${(props) => props.beforeStyles}
    background-size: 250% 250%;
    opacity: 0.88;
    filter: brightness(0.66) contrast(1.33);
    transition: none;
  }
  &.active:before,
  &:hover::before,
  &.active:after,
  &:hover:after {
    animation: none;
    transition: none;
  }
  &.animated {
    transition: none;
    animation: holoCard 12s ease 0s 1;
    &:before {
      transition: none;
      animation: holoGradient 12s ease 0s 1;
    }
    &:after {
      transition: none;
      animation: holoSparkle 12s ease 0s 1;
    }
  }
  @keyframes holoSparkle {
    0%,
    100% {
      opacity: 0.75;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(1.25);
    }
    5%,
    8% {
      opacity: 1;
      background-position: 40% 40%;
      filter: brightness(0.8) contrast(1.2);
    }
    13%,
    16% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(1.2) contrast(0.8);
    }
    35%,
    38% {
      opacity: 1;
      background-position: 60% 60%;
      filter: brightness(1) contrast(1);
    }
    55% {
      opacity: 0.33;
      background-position: 45% 45%;
      filter: brightness(1.2) contrast(1.25);
    }
  }

  @keyframes holoGradient {
    0%,
    100% {
      opacity: 0.5;
      background-position: 50% 50%;
      filter: brightness(0.5) contrast(1);
    }
    5%,
    9% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
    13%,
    17% {
      background-position: 0% 0%;
      opacity: 0.88;
    }
    35%,
    39% {
      background-position: 100% 100%;
      opacity: 1;
      filter: brightness(0.5) contrast(1);
    }
    55% {
      background-position: 0% 0%;
      opacity: 1;
      filter: brightness(0.75) contrast(1.25);
    }
  }

  @keyframes holoCard {
    0%,
    100% {
      transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
    }
    5%,
    8% {
      transform: rotateZ(0deg) rotateX(6deg) rotateY(-20deg);
    }
    13%,
    16% {
      transform: rotateZ(0deg) rotateX(-9deg) rotateY(32deg);
    }
    35%,
    38% {
      transform: rotateZ(3deg) rotateX(12deg) rotateY(20deg);
    }
    55% {
      transform: rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg);
    }
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  p,
  span {
    color: white;
  }
  .stats {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: black 2px solid;
    border-radius: 10px;
    margin-top: 2px;
    padding-right: 30px;
    padding-left: 30px;
    font-size: 10px;
  }
`;
export default Pokecard;
