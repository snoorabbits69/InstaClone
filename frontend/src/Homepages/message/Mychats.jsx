import React, { useEffect, useState } from 'react'
import Mychat from './Mychat'
import { useDispatch, useSelector} from 'react-redux';
import { FetchChatRoutes } from '../../../utils/ApiRoutes';
import axios from 'axios';
import GetChats from '../../hooks/GetChats';

export default function Mychats() {
const state=useSelector((state)=>state.user)
const chatstate=useSelector((state)=>state.chat)
const dispatch=useDispatch()
let {chats,loading}=GetChats(1)




      return (
        <div className="p-1">
            {
               loading?"Loading":chats.map((item, i) => (
                    <Mychat chats={item} key={i}/>
                ))
            }
        </div>
    )
}
