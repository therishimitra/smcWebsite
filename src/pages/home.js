import React from 'react'
import SlideCalendar from '../components/slideCalendar';
import SlideMessage from '../components/slideMessage';
import NameInput from '../components/NameInput';




function home() {
    return(  

        <div>
            <SlideMessage/>
            <SlideCalendar/> 
            <NameInput/>
        </div>
            

    ) 
   
}

export default home