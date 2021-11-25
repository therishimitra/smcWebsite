import React from 'react'
import {useSpring, animated} from 'react-spring';
import Grid from '@mui/material/Grid';

const noteStyle = {
    background: '#e7dcc8',
    color: 'white',
    padding: '1.5rem'

}

const embedStyle = {
    background: "transparent",
    border: ""
    
  };

function SlideCalendar() {

    const slideStyle = useSpring({
        from: {
            opacity: 0,
            marginRight:-500
        },
        to:{
            opacity: 1,
            marginRight:0
        }
    });


    return (
    
    <animated.div style={slideStyle}>
        <div style={noteStyle}>
            <br></br>
            <Grid container spacing={0}>
            <Grid item xs={12}>
            <iframe class="airtable-embed" 
                src="https://airtable.com/embed/shr7XfOauvLgRzajc?backgroundColor=red"
                frameborder="0"
                sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                loading="lazy"
                onmousewheel=""
                width="50%" 
                height="533"
                style={embedStyle}
                
            />
            </Grid>
            </Grid>
            
        </div>
    </animated.div>
           
    )
}

export default SlideCalendar
