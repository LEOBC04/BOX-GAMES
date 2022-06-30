import React from 'react';
import s from "./home.module.scss";


const Aside = () => {
  return (
    <div>
      <aside>
          <nav className={s.orders}>
            <h3>Order by:</h3>
            <ul>
              <li><button>(A-Z)</button></li>
              <li><button>(Z-A)</button></li>
              <li><button>Rating (max-min)</button></li>
              <li><button>Rating (min-max)</button></li>
              <li><button>Reset</button></li>
            </ul>
          </nav>

          <nav className={s.filters}>
            <h3>Filter by:</h3>
            <select className={s.genre}>
              <option value="all">All</option>
              <option value="rpg">RPG</option>
              <option value="casual">Casual</option>
            </select>

            <select className={s.type}>
              <option value="all">All</option>
              <option value="existing">Existing</option>
              <option value="created">Created</option>
            </select>
            <button>Reset</button>
          </nav>
        </aside>
    </div>
  );
}

export default Aside;
