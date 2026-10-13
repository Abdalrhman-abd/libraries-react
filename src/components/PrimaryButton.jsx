import React from 'react'

const PrimaryButton = (props) => {
  return (
    <>
        <button type={props.type} id={props.id} onClick={props.onClick} className='w-[150px] bg-[#BC0000] text-white decoration-0 text-center p-3 mt-4 rounded-4xl cursor-pointer hover:bg-red-400 hover:scale-99 active:scale-95 inline-block'>{props.text}</button>
    </>
  )
}

export default PrimaryButton