import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const SessionHome = props => {


    return (        
        <>
            <div className="home__body">
                <Jumbotron>
                    <h3>Your Training Log</h3>
                </Jumbotron>
                <div>
                    <Button
                        type='button'
                        onClick={() => {props.history.push('/newSession')}}
                    >
                        New Session
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SessionHome