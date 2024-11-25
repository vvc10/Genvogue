import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import AIDesignSuggestion from './AIDesignSuggestion';
import TextureGenerator from './TextureGenerator';
import GradientGenerator from './GradientGenerator';
import TextCustomization from './TextCustomization';
import { Switch } from './ui/switch';

const DesignCustom = () => {
  const [activeColor, setActiveColor] = useState('#ff0000');
  const [activeGradient, setActiveGradient] = useState({ color1: '#ff0000', color2: '#0000ff', angle: 0 });
  const [useGradient, setUseGradient] = useState(false);
  const [customText, setCustomText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0.5 });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedTexture, setGeneratedTexture] = useState(null);
  const [useTexture, setUseTexture] = useState(false);

  const ImageUpload = ({ onImageUpload }) => {
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageUpload(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="space-y-4">
        <Label htmlFor="imageUpload">Upload Image</Label>
        <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    );
  };

  const applyDesign = (design) => {
    // Simulate design application
    console.log("Applying design:", design);
  };

  return (
    <div>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Design Customization</h2>
        <Tabs defaultValue="color">
          <TabsList className="mb-4">
            <TabsTrigger value="color">Color</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="texture">Texture</TabsTrigger>
            <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
          </TabsList>
          <TabsContent value="color">
            <div className="space-y-4">
              <Label htmlFor="colorPicker">Choose a color</Label>
              <Input
                id="colorPicker"
                type="color"
                value={activeColor}
                onChange={(e) => setActiveColor(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </TabsContent>
          <TabsContent value="gradient">
            <GradientGenerator onChange={setActiveGradient} />
            <div className="mt-4">
              <Switch
                id="useGradient"
                checked={useGradient}
                onCheckedChange={setUseGradient}
              />
              <Label htmlFor="useGradient" className="ml-2">
                Use gradient
              </Label>
            </div>
          </TabsContent>
          <TabsContent value="text">
            <TextCustomization
              text={customText}
              setText={setCustomText}
              textPosition={textPosition}
              setTextPosition={setTextPosition}
            />
          </TabsContent>
          <TabsContent value="image">
            <ImageUpload onImageUpload={setUploadedImage} />
          </TabsContent>
          <TabsContent value="texture">
            <TextureGenerator onTextureGenerate={(texture) => {
              setGeneratedTexture(texture);
              setUseTexture(true);
            }} />
            <div className="mt-4">
              <Switch
                id="useTexture"
                checked={useTexture}
                onCheckedChange={setUseTexture}
              />
              <Label htmlFor="useTexture" className="ml-2">
                Use generated texture
              </Label>
            </div>
          </TabsContent>
          <TabsContent value="ai">
            <AIDesignSuggestion onApply={applyDesign} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignCustom;
