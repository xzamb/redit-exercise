import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h3>About us:</h3>
            <p>
            We are a company dedicated to providing insurance products that provide quality protection with value pricing. We wish to establish a successful partnership with our clients, our staff members, and our insurance companies, that respect the interests and goals of each party.

            Success will be measured by our clients choosing us because of their belief in our ability to meet or exceed their expectations of price, service, and expertise.
            </p>
            
            <div className="home__buttons">
                <h4>Select a table:</h4>
                <ul>
                    <li>
                        <Link to="/tables/0">Countries</Link>
                    </li>
                    <li>
                        <Link to="/tables/1">Vehicles</Link>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Home;