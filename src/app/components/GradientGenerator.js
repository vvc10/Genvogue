import React from 'react'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Slider } from './ui/slider'

const GradientGenerator = ({ onChange }) => {
    const [color1, setColor1] = useState('#ff0000')
    const [color2, setColor2] = useState('#0000ff')
    const [angle, setAngle] = useState(0)
  
    useEffect(() => {
      onChange({ color1, color2, angle })
    }, [color1, color2, angle, onChange])
  
    return (
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div>
            <Label htmlFor="color1">Color 1</Label>
            <Input
              id="color1"
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <Label htmlFor="color2">Color 2</Label>
            <Input
              id="color2"
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="angle">Angle: {angle}°</Label>
          <Slider
            id="angle"
            min={0}
            max={360}
            step={1}
            value={[angle]}
            onValueChange={([value]) => setAngle(value)}
          />
        </div>
      </div>
    )
  }

export default GradientGenerator
