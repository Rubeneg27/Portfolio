import React, { useState } from 'react';

function Contact () {

    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");

    function composeEmail() {
        const mailtoLink = `mailto:rubeneg27@gmail.com?subject=${subject}&body=${message}`;
    
        window.location.href = mailtoLink;
    }

    return (
        <section className="contact">
            <form>

                <li>
                    <label>Subject</label>
                    <input 
                    type="text"
                    onChange={(e) => setSubject(encodeURIComponent(e.target.value))}
                    ></input>
                </li>
                <li>
                    <textarea 
                    className="Message-Box" 
                    placeholder="Write here your message"
                    onChange={(e) => setMessage(encodeURIComponent(e.target.value))}
                    ></textarea>
                </li>
                <button onClick={composeEmail}>Send mail</button>
            </form>
        </section>
    )
}

export default Contact;