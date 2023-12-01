import React from 'react'

function SubmitButton({name}) {
  return (

      <button
        className="group relative rounded-md inline-block text-sm font-medium text-gray-900 focus:outline-none focus:ring active:text-gray-500"
        type="submit"
      >
        <span className="absolute rounded-md inset-0 border-2 border-dashed border-black"></span>
        <span className="block border-2 font-mono rounded-md border-solid border-black bg-white px-12 py-3 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
          {name}
        </span>
      </button>
  )
}

export default SubmitButton