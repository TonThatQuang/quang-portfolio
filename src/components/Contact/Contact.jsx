import "./Contact.css";
import { MdOutlineMailOutline } from "react-icons/md";

function Contact() {
    return (
        <div
            className="contact"
            onClick={() =>
                window.open(
                    "mailto:quangton178@gmail.com"
                )
            }
        >

            <MdOutlineMailOutline className="contact-icon" />

            <span>Contact Me</span>

        </div>
    );
}

export default Contact;