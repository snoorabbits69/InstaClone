import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import GetUsers from '../hooks/GetUsers';
import GetUser from './../hooks/GetUser';
import GetUserfromId from '../hooks/GetUserfromId';
export default function Message() {
  return (
  <div className="flex justify-around gap-20 ">
Message
  </div>
  )
}
