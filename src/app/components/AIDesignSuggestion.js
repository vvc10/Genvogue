"useclient";

import React from 'react'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { Button } from "@/app/components/ui/button"
import { Wand2, Loader2 } from 'lucide-react'
 

const AIDesignSuggestion = ({ onApply }) => {
    const [loading, setLoading] = useState(false)
    const [suggestion, setSuggestion] = useState(null)
  
    const generateSuggestion = () => {
      setLoading(true)
      // Simulating AI suggestion generation
      setTimeout(() => {
        const newSuggestion = {
          color: tinycolor.random().toHexString(),
          text: "AI-generated design",
          layout: Math.random() > 0.5 ? "centered" : "offset",
          font: Math.random() > 0.5 ? "serif" : "sans-serif",
        }
        setSuggestion(newSuggestion)
        setLoading(false)
      }, 2000)
    }
  
    return (
      <div className="space-y-4">
        <Button onClick={generateSuggestion} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate AI Suggestion
            </>
          )}
        </Button>
        {suggestion && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div
              className="w-full h-32 rounded-md mb-2"
              style={{ backgroundColor: suggestion.color }}
            ></div>
            <p className="text-sm mb-2">Text: {suggestion.text}</p>~~
            <p className="text-sm mb-2">Layout: {suggestion.layout}</p>
            <p className="text-sm mb-4">Font: {suggestion.font}</p>
            <Button onClick={() => onApply(suggestion)}>Apply Suggestion</Button>
          </div>
        )}
      </div>
    )
  }
  

export default AIDesignSuggestion
