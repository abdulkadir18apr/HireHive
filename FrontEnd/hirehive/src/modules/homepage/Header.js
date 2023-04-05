import React from 'react'
import "./css/header.css"

export default function Header() {
    return (
        <header>
            <div className="header__content">
                <div className="intro">
                    <h1>
                        Made placement process easy with HireHive - Your ultimate job search
                        platform
                    </h1>
                    <p>
                        Hire-Hive is designed to streamline your placement process by
                        providing you with the most relevant job listings that match profile
                        and clean UI to search filter and apply for different roles.We
                        believe that finding your dream job should be effortless, and that's
                        what we strive to achieve with HireHive
                    </p>
                </div>
                <div className="stickers">
                    <div className="header__element">
                        <i className="fa fa-duotone fa-search fa-2xl"></i>
                        <p>100+</p>
                        <p>Verified Recruiters</p>
                    </div>
                    <div className="header__element">
                        <i className="fa-solid fa-briefcase fa-2xl"></i>
                        <p>500+</p>
                        <p>Jobs Posted</p>
                    </div>
                    <div className="header__element">
                        <i className="fa-sharp fa-solid fa-graduation-cap fa-2xl"></i>
                        <p>1k+</p>
                        <p>Graduates</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
