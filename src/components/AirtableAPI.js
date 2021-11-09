import * as React from 'react';
import Airtable from 'airtable';
import { useEffect } from 'react';

//Needs to be integrated with other forms

const base = new Airtable({apiKey: "keyn6GGT4mwqMtlaF"}).base('appw5uy7KwYsJqmBr')

function AirtableAPI() {

    useEffect(() => {
      base("Events")
        .select()
        .eachPage((records, fetchNextPage) =>{
            console.log(records);
            fetchNextPage();
        });

    },[]);
        
  return <div></div>
}

export default AirtableAPI;