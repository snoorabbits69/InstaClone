import React from 'react'
import Mychat from './Mychat'
export default function Mychats() {
    const data = [
        {name:'Rey Jhon',time:'just now', message: 'Hey there! Are you finish creating the chat app?', active: true},
        {name:'Cherry Ann',time:'12:00', message: 'Hello? Are you available tonight?'},
        {name:'Lalaine',time:'yesterday', message: 'I\'m thingking of resigning'},
        {name:'Princess',time:'1 day ago', message: 'I found a job :)'},
        {name:'Charm',time:'1 day ago', message: 'Can you me some chocolates?'},
        {name:'Garen',time:'1 day ago', message: 'I\'m the bravest of all kind'},
      ]
      return (
        <div className="p-1">
            {
                data.map((item, index) => (
                    <Mychat
                        message={item.message}
                        time={item.time} 
                        name={item.name} 
                        active={item.active}
                    key={index}
                    />
                ))
            }
        </div>
    )
}
