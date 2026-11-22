function Contact() {
    return (
        <div className="page">

            <section className="section">
                <div className="container">

                    <span className="eyebrow">CONTACT US</span>

                    <h1>Let's Talk.</h1>

                    <p className="muted">
                        Have a question, suggestion, or need help?
                        Send us a message and we'll get back to you.
                    </p>

                    <div
                        className="card"
                        style={{
                            maxWidth: "700px",
                            padding: "30px",
                            marginTop: "35px"
                        }}
                    >

                        <div className="form-group">
                            <label className="label">Name</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label">Email</label>
                            <input
                                className="input"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label">Message</label>
                            <textarea
                                className="textarea"
                                rows="6"
                                placeholder="Write your message..."
                            />
                        </div>

                        <button className="btn btn-primary">
                            Send Message
                        </button>

                    </div>

                </div>
            </section>

        </div>
    );
}

export default Contact;