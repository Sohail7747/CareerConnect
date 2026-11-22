function About() {
    return (
        <div className="page">

            <section className="section">
                <div className="container">

                    <span className="eyebrow">ABOUT CARRERCONNECT</span>

                    <h1>Connecting Talent With Opportunity.</h1>

                    <p className="muted">
                        CarrerConnect is a modern job portal designed to connect
                        talented job seekers with companies and meaningful career
                        opportunities.
                    </p>

                    <div className="grid grid-3" style={{ marginTop: "40px" }}>

                        <div className="card category">
                            <h3>For Job Seekers</h3>
                            <p className="muted">
                                Discover jobs, apply to opportunities and manage
                                your applications in one place.
                            </p>
                        </div>

                        <div className="card category">
                            <h3>For Recruiters</h3>
                            <p className="muted">
                                Post jobs, discover talented candidates and
                                manage applications efficiently.
                            </p>
                        </div>

                        <div className="card category">
                            <h3>Our Mission</h3>
                            <p className="muted">
                                Make the job search and recruitment process
                                simpler, faster and more accessible.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
}

export default About;