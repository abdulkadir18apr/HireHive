import React from 'react'

import "./css/recuiter.css"
export default function Recruiter() {
    return (
        <div className="recruiter">
            <h3 className="heading">
                More than <span>100</span> Recruiters
                trust <span>Hire-Hive</span>
            </h3>
            <div className="logos">
                <ul className="first-row">
                    <li>
                        <img
                            className="image" src={require('./img/Accenture-logo.png')}
                            alt="accenture"
                        />
                    </li>
                    <li>
                        <img className="image" src={require('./img/fico logo.png')} alt="fico" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/Gammastack.png')} alt="gammastack" />
                    </li>
                    <li>
                        <img
                            className="image"
                            src={require('./img/impetus_logo_Logo.jpg')}
                            alt="impetus"
                        />
                    </li>
                    <li>
                        <img
                            className="image"
                            src={require('./img/Tata_Consultancy_Services_Logo.svg.png')}
                            alt="TCS"
                        />
                    </li>
                    <li>
                        <img className="image" src={require('./img/LTI_Lets_solve.png')} alt="LTI" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/cleartrail.png')} alt="cleartrail" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/capgelogo.jpg')} alt="capgemini" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/infosys logo.png')} alt="infosys" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/cognizant.webp')} alt="cognizant" />
                    </li>
                    <li>
                        <img className="image" src={require('./img/systango.png')} alt="systango" />
                    </li>
                    <li>
                        <img
                            className="image"
                            src={require('./img/tech mahindra.png')}
                            alt="tech mahindra"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}
