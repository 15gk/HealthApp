// appointments.js
let slots = [
    { "_id":"23",
      "doctorId": "doc-001",
      "token": "23",
      "date": "2023-11-08",
      "startTime": "09:00",
      "endTime": "09:30",
      "status": "available"
    },
    {
      "_id":"2",
      "doctorId": "doc-001",
      "token": "2",
      "date": "2023-11-08",
      "startTime": "09:30",
      "endTime": "10:00",
      "status": "available"
    },
    {
      "_id":"3",
      "doctorId": "doc-001",
      "token": "3",
      "date": "2023-11-08",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "available"
    },
    // ... More slots
    {
      "_id":"10",
      "doctorId": "doc-001",
      "token": "10",
      "date": "2023-11-08",
      "startTime": "12:30",
      "endTime": "13:00",
      "status": "booked"
    }
   
  ];
  
  module.exports = slots;
  

 