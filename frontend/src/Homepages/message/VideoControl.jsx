import React from 'react'

export default function VideoControl({ icon, onClick, active = true, danger = false }) {

    return  <button
      onClick={onClick}
      className={`p-3 rounded-full transition-all duration-300 ${
        active
          ? danger
            ? "bg-vidcall-danger text-white hover:bg-red-600"
            : "bg-white/10 text-white hover:bg-white/20"
          : "bg-vidcall-danger/90 text-white hover:bg-vidcall-danger"
      }`}
    >
      {icon}
    </button>
}