import React from 'react'
import Image from 'next/image'

const merchDesigns = [
  { model: '/assets/3d/t_shirt.glb', thumbnail: '/assets/merch_cover/tshirt.png' },
  { model: '/assets/3d/cap.glb', thumbnail: '/assets/merch_cover/cap.png' },
  { model: '/assets/3d/hoodie.glb', thumbnail: '/assets/merch_cover/hoodie.webp' },
  { model: '/assets/3d/cup.glb', thumbnail: '/assets/merch_cover/cup_1.png' },
]

const MerchTypeSidebar = ({ onSelect, selectedModel }) => {
  return (
    <div className="fixed left-24 z-50 top-[10vh] bottom-4 h-max max-h-[60%]  p-2 w-[14vw] md:w-[6%] bg-gray-900 rounded-[10px] bg-opacity-75 overflow-y-auto flex flex-col items-center">
      {merchDesigns.map((design, index) => (
        <button
          key={index}
          onClick={() => onSelect(design.model)}
          className={`w-full mb-2 p-1 rounded-lg transition-all ${selectedModel === design.model ? 'bg-green-800' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
       
          <Image
            src={design.thumbnail}
            alt={`Merch ${index + 1}`}
            width={500} // Adjust the width as per your layout requirement
            height={500} // Adjust the height as per your layout requirement
            className="rounded-md object-cover w-full h-auto"
          />

        </button>
      ))}
    </div>
  )
}


export default MerchTypeSidebar
