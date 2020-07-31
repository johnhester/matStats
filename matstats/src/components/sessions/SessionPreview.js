import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


const SessionPreview = props => {
    

    return (
        <>
            <Card className="session__preview--card">
                <Card.Header className="session__preview--header">
                    <Card className="session__preview--date">
                        {props.formatDates(props.session.date)}
                    </Card>
                    <Link to={`/sessions/${props.session.id}`}>
                        <Button>
                            Details
                        </Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    {props.session.notes}
                </Card.Body>
            </Card>
        </>
    )

}


export default SessionPreview