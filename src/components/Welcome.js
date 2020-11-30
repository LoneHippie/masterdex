import React from 'react';
import '../styles/_welcome.scss';

const Welcome = () => {

    function closeWelcome() {
        document.getElementById('welcome').style.display = "none";
    };
    
    return (
        <section className="welcome" id="welcome">

            <article className="welcome-container">
                <h1 className="welcome-container--title">WELCOME&nbsp;TRAINER</h1>
                <p className="welcome-container--paragraph">
                    Welcome to Masterdex, a handly detailed pokedex webapp! Here you can find detailed information on any pokemon from every generation either by search or browsing. If this is your first time using Masterdex, please read the instructions below before hitting continue.
                </p>
                <h2 className="welcome-container--instruction-title">SEARCHING</h2>
                <ul className="welcome-container__instruction-list">
                    <li className="welcome-container__instruction-list--item">
                        To find a specific pokemon, just enter a name in the search bar
                    </li>
                    <li className="welcome-container__instruction-list--item">
                        You can also use the search bar to show all pokemon that match a certain type by searching for that type by name, eg. "fire", "fighting", "fairy"
                    </li>
                    <li className="welcome-container__instruction-list--item">
                        At the bottom of the screen you can also show all pokemon from a specific game generation by simply selecting that generation from the list
                    </li>
                    <li className="welcome-container__instruction-list--item">
                        To show more pokemon in sequential order, just click the "SHOW MORE" button
                    </li>
                </ul>
                <h2 className="welcome-container--instruction-title">DETAILED&nbsp;INFO</h2>
                <ul className="welcome-container__instruction-list">
                    <li className="welcome-container__instruction-list--item">
                        To get detailed info about any pokemon, click the card displayed on screen to open a full display of that pokemon's details, moves and stats
                    </li>
                    <li className="welcome-container__instruction-list--item">
                        NOTE: abilities and moves for generation 8 pokemon are currently unavailable
                    </li>
                </ul>

                <div className="welcome-container__btn" onClick={closeWelcome}>
                    Continue
                </div>
            </article>

            <div className="welcome-blur"></div>

        </section>
    );
};

export default Welcome;