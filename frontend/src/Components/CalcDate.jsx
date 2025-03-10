import React from 'react'

export default function CalcDate({date}) {
    if (!date) {
        return "";
    }

    let currentDate = new Date();
    let msgDate = new Date(date);
    let sendTime = Math.floor((currentDate - msgDate) / 1000); 

    if (sendTime < 60) {
        return sendTime +'s'; 
    } else if (sendTime < 3600) {
        return Math.floor(sendTime / 60) + 'm '; 
    } else if (sendTime < 86400) {
        return Math.floor(sendTime / 3600) + 'hrs '; 
    } else {
        return Math.floor(sendTime / 86400) + 'days '; 
    }
}
