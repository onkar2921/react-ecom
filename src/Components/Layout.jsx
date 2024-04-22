import React from 'react'
import "../CSS/Layout.css"
export default function Layout(props) {
  return (
   <>
   <div className="flex items-center justify-center p-10 flex-col border  w-full h-full ">
    <h2 className='m-4 text-4xl font-bold'>{props.title}</h2>
    <p className='m-2 text-xl font-semibold'>{props.para}</p>
   </div>
   </>
  )
}
