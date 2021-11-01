import React from 'react'
import SlideCalendar from './components/slideCalendar';
import SlideMessage from './components/slideMessage';
import NameInput from './components/NameInput';
import AirtablAPI from './components/AirtableAPI';



function ATCalendar() {
    return(  

        <div>
            <SlideMessage/>
            <SlideCalendar/> 
                        <NameInput/>
        </div>
            

    ) 

    
        
    
}

export default ATCalendar