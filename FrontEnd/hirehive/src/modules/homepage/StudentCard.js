import React from 'react'
import img1 from "./img/img1.jpg"
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";

import "./css/card.css"



export default function StudentCard() {
    return (
        <div className="outer_card">
            <div className="studentCard">
                <input type="radio" name="dot" id="one" />
                <input type="radio" name="dot" id="two" />
                <div className="main-card">
                    <div className="cards">
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image2" src={img1} />
                                </div>
                                <div className="details">
                                    <div className="name">Andrew Neil</div>
                                    <div className="job">Web Designer</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image1" src={img2} />
                                </div>
                                <div className="details">
                                    <div className="name">Jasmine Carter</div>
                                    <div className="job">UI Designer</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image" src={img3} />
                                </div>
                                <div className="details">
                                    <div className="name">Justin Chung</div>
                                    <div className="job">Web Devloper</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image" src={img4} />
                                </div>
                                <div className="details">
                                    <div className="name">Appolo Reef</div>
                                    <div className="job">Web Designer</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image" src={img4} />
                                </div>
                                <div className="details">
                                    <div className="name">Adrina Calvo</div>
                                    <div className="job">UI Designer</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="content">
                                <div className="img">
                                    <img alt="student-image" src={img3} />
                                </div>
                                <div className="details">
                                    <div className="name">Nicole Lewis</div>
                                    <div className="job">Web Devloper</div>
                                </div>
                                <div className="media-icons">
                                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a href="/"><i className="fab fa-twitter"></i></a>
                                    <a href="/"><i className="fab fa-instagram"></i></a>
                                    <a href="/"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button">
                    <label for="one" className=" active one"></label>
                    <label for="two" className="two"></label>
                </div>
            </div>
        </div>
    )
}
