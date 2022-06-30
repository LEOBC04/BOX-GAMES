import html from '../../assets/html.png';
import css from '../../assets/css.png';
import sass from '../../assets/sass.png';
import js from '../../assets/js.png';
import react from '../../assets/react.png';
import redux from '../../assets/redux.png';
import node from '../../assets/node.png';
import express from '../../assets/express.png';
import postgres from '../../assets/postgres.png';
import sequelize from '../../assets/sequelize.png';
import s from "./home.module.scss";
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer>
      <h4>Made with:</h4>
      <div className={s.skills}>
        <img src={html} alt='html'/>
        <img src={sass} alt='sass'/>
        <img src={css} alt='css'/>
        <img src={js} alt='js'/>
        <img src={react} alt='react'/>
        <img src={redux} alt='redux'/>
        <img src={node} alt='node'/>
        <img src={express} alt='express'/>
        <img src={postgres} alt='postgres'/>
        <img src={sequelize} alt='sequelize'/>
      </div>
    </footer> 
    </div>
  );
}

export default Footer;
