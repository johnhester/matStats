import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const SessionPreview = props => {
    
    const formatDates = (sessionDate) => {
        //creating date format
        const preferredFormat = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'}
        const dateFormat = new Intl.DateTimeFormat('en-Us', preferredFormat)         

         return dateFormat.format(new Date(sessionDate))        

    }

    return (
        <>
            <Card className="session__preview--card">
                <Card.Header className="session__preview--header">
                    <Card className="session__preview--date">
                        {formatDates(props.session.date)}
                    </Card>
                    <Button>
                        Details
                    </Button>
                </Card.Header>
                <Card.Body>
                    {props.session.notes}
                </Card.Body>
            </Card>
        </>
    )

}


export default SessionPreview