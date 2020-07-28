import React from 'react'
import Card from 'react-bootstrap/Card'

const Home = props => {


    return (
        <>
            <div className="home__body">
                <Card className="home__box">
                    <Card.Header>Priority Techniques:</Card.Header>
                    <Card.Body className="home__techniques">
                        <Card className="home__techniques--card">
                            arm-bar
                        </Card>
                        <Card className="home__techniques--card">
                            triangle
                        </Card>
                        <Card className="home__techniques--card">
                            Full Guard
                        </Card>
                        <Card className="home__techniques--card">
                            Scissor Sweep
                        </Card>
                    </Card.Body>

                </Card>
                <Card className="home__box">
                    <Card.Header className="home__session--header">
                        <div>
                            24 July, 2020
                        </div>
                        <div>
                            Length: 2 hours
                        </div>
                    </Card.Header>
                    <Card.Body className="home__session--body">
                        Operation Hot Mother. I'm afraid I'm with Michael on this one. The guy runs a prison, he can have any piece of ass he wants. He's a regular Freddie Wilson, that one. Oh, I can just taste those meaty leading man parts in my mouth. I didn't mean who… I meant… her?
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Home 