import React, { useEffect, useState } from 'react';
import './Contact.css'
import { useDevice } from "../Context/DeviceContext.js";

function Contact () {

    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const { isMobile } = useDevice();

    function composeEmail() {
        const mailtoLink = `mailto:rubeneg27@gmail.com?subject=${subject}&body=${message}`;
    
        window.location.href = mailtoLink;
    }

    useEffect(() => {
        if (isMobile) {
            alert("Contact not working on mobile. Please, use my email rubeneg27@gmail.com");
        }
    }, [isMobile]);

    return (
        <section className={isMobile ? "contactMobile" : "contact"}>
            <form>

                <li>
                    <label className='popUpText'>Subject</label>
                    <input 
                    type="text"
                    placeholder='Subject of the email'
                    onChange={(e) => setSubject(encodeURIComponent(e.target.value))}
                    ></input>
                </li>
                <li>
                    <label className='popUpText'>Message</label>
                    <textarea 
                    className="Message-Box" 
                    placeholder="Write here your message"
                    onChange={(e) => setMessage(encodeURIComponent(e.target.value))}
                    ></textarea>
                </li>
                <button className="custombtn" onClick={composeEmail}>Send mail</button>
            </form>
        </section>
    )
}

export default Contact;