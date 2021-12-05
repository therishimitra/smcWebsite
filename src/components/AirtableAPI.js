import * as React from "react";

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn6GGT4mwqMtlaF'}).base('appnYYXKxbNxYmalz');

base('Events').create([
  {
    "fields": {
      "Event Name": "Test444", //Need to be changed for a new record to be created
      "Start Time": "2021-11-22T14:00:00.000Z",
      "Proposed End Time": "2021-11-22T15:00:00.000Z",
      "🚪 Room(s)": [
        "124 SMC (Edit 4)"
      ],
      "Class": [
        "recvOZ6BIE4yb6y8q"
      ],
      "Event Type": "Class 📚",
      "Faculty": [
        "rec8IcpvcTE2shAfe"
      ],
      "Students": [
        "recAXAHAZV2zjzm41"
      ],
      "Status": "Booked ✅"
    }
  },
  {
    "fields": {
      "Event Name": "Music Marketing & Promotion",
      "Start Time": "2021-11-22T14:30:00.000Z",
      "Proposed End Time": "2021-11-22T16:00:00.000Z",
      "🚪 Room(s)": [
        "104 SMC (Classroom)"
      ],
      "Class": [
        "recuBEQ8CyKCIW8JN"
      ],
      "Event Type": "Class 📚",
      "Faculty": [
        "rec2mdimTDkynR5qz"
      ],
      "Status": "Booked ✅",
      "Location": [
        "recAQPTqQbRmFc9Oe"
      ],
      "For a Class?": true,
      "Intent of Use": "Academic 🎓"
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function (record) {
    console.log(record.getId());
  });
});
