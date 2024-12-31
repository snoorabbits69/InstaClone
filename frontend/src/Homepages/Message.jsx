import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';




export default function Message() {
  const state = useSelector((state) => state.user);

  return (
    <div className="flex gap-20 lg:ml-96">
      <input
        type="text"/>
      <button >Send</button>
    </div>
  );
}
