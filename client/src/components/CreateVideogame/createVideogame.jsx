import React from "react";
import Footer from "../Home/footer";
import s from "./createVideogame.module.scss";

const CreateVideogame = () => {
  return (
    <div>
      <section className={s.contenedorPrincipal}>
        <form>
        <h2>Create a video game.</h2>

          <div className={s.campo}>
            <label>Name: </label>
            <input type="text" placeholder="Type a name..."/>
          </div>

          <div className={s.campo}>
            <label>Description: </label>
            <textarea placeholder="About the videogame..."/>
          </div>

          <div className={s.campo}>
            <label>Releasd: </label>
            <input type="date"/>
          </div>

          <div className={s.campo}>
            <label>Image: </label>
            <input type="text" placeholder="Enlace de la imagen"/>
          </div>

          <div className={s.campo}>
            <label>Rating: </label>
            <input type="range" min='1' max='5' step='0.1'/>
          </div>

          <div className={s.campo}>
            <label>Genres: </label>
            <select>
              <option value='action'>Action</option>
              <option value='adventure' >Adventure</option>
            </select>
          </div>

          <div className={s.campo}>
            <label>Platforms</label>
            <select>
              <option value='ps2'>PS2</option>
              <option value='ps3' >PS3</option>
            </select> 
          </div>

          <div className={s.campo}>
            <input type='submit' className={s.submit} value='Create'/>
          </div>

        </form>
      </section>

      <Footer />
    </div>
  );
};

export default CreateVideogame;
