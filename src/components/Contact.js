function Contact () {
    return (
        <section className="contact">
            <form>
                <li>
                    <label>Name</label><input type="text"></input>
                </li>
                <li>
                    <label>Surname</label><input type="text"></input>
                </li>
                <li>
                    <label>E-Mail</label><input type="text"></input>
                </li>
                <li>
                    <textarea className="Message-Box" placeholder="Write here your message"></textarea>
                </li>
                <button type="submit">SUBMIT</button>
            </form>
        </section>
    )
}

export default Contact;