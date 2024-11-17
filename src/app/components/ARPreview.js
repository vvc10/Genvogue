import React from 'react'

const ARPreview = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AR Preview</h3>
        <p>Scan the QR code below to view your design in AR on your mobile device.</p>
        <div className="bg-white p-4 inline-block rounded-md">
          <img src="/placeholder.svg?height=200&width=200&text=AR+QR+Code" alt="AR QR Code" className="w-40 h-40" />
        </div>
      </div>
    )
  }
  

export default ARPreview
