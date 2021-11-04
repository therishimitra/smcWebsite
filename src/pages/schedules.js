import React from 'react'
import ReactDOM from 'react-dom';   

import SlideCalendarRec from '../components/slideCalendarRec';
import SlideCalendarReh from '../components/slideCalendarReh';
import SlideCalendarCollab from '../components/slideCalendarCollab';

import SlideMessageRec from '../components/slideMessageRec';
import SlideMessageReh from '../components/slideMessageReh';
import SlideMessageCollab from '../components/slideMessageCollab';

//testing


function schedules() {
    return(  

        <div>
            <SlideMessageRec/>
            hey
            <SlideCalendarRec/>
            <SlideMessageReh/> 
            <SlideCalendarReh/>
            <SlideMessageCollab/>
            <SlideCalendarCollab/>
        </div>
            

    ) 

    
        
    
}

export default schedules