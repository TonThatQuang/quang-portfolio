import "./Card.css";

import Banner from "./Banner";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import Social from "./Social";
import ProfileInfo from "./ProfileInfo";
import SocialLinks from "./SocialLinks";
import MusicPlayer from "../Music/MusicPlayer";
import Contact from "../Contact/Contact";
import GamePresence from "./GamePresence";
import ProfileEffect from "./ProfileEffect";
import Clock from "../Clock/Clock";


function Card() {

    return (

        <div className="card">

            <Banner />
            <div className="banner-overlay"></div>
            <Avatar />

            <ProfileEffect />

            <UserInfo />

            <Social />

            <ProfileInfo />

            <SocialLinks />

            <MusicPlayer />

            <GamePresence />
            
            <Clock />
            
            <Contact />

        </div>

    );

}

export default Card;