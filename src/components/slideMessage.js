import React from 'react'
import {useSpring, animated} from 'react-spring';

const noteStyle = {
    background: '#ff6961',
    color: 'white',
    padding: '1.5rem'

}

function SlideMessage() {

    const slideStyle = useSpring({
        from: {
            opacity: 0,
            marginLeft:-500
        },
        to:{
            opacity: 1,
            marginLeft:0
        }
    });


    return (
    
    <animated.div style={slideStyle}>
        <div style={noteStyle}>
            <h1>
                Note:
            </h1>
            <h3>
                Please review the calendar below before booking your SMC time to see availability of rooms. Click on the 'Room Schedules' tab to view schedules for specific rooms.
            </h3>
        </div>
    </animated.div>
           
    )
}

export default SlideMessage
