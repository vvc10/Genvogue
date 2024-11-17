import { RiEdit2Line } from 'react-icons/ri';
import { BiSolidVideoRecording } from "react-icons/bi";
import { TbBackground } from "react-icons/tb";
import { IoIosMore } from "react-icons/io";
import { useState } from 'react';
import { FiCodesandbox } from "react-icons/fi";
import MerchTypeSidebar from '../components/MerchTypeSidebar'
export default function Sidebar({ color, setColor, background, setBackground, onSelect, selectedModel }) {
    const [selectedOption, setSelectedOption] = useState(''); // For tracking selected action

    // Handle button click actions
    const handleButtonClick = (option, e) => {
        e.stopPropagation(); // Prevent event propagation if needed
        setSelectedOption(option === selectedOption ? '' : option); // Toggle if clicked twice
    };

    return (
        <div>
            {/* Sidebar */}
            <div className="designsidebar fixed left-6 top-[10vh] w-fit bg-opacity-80 rounded-r-lg flex flex-col gap-4 items-center shadow-lg z-50">
                <SidebarButton
                    icon={<RiEdit2Line />}
                    //   label="Edit"
                    isActive={selectedOption === 'Edit'}
                    onClick={(e) => handleButtonClick('Edit', e)}
                />
                <SidebarButton
                    icon={<TbBackground />}
                    //   label="Background"
                    isActive={selectedOption === 'Background'}
                    onClick={(e) => handleButtonClick('Background', e)}
                />
                <SidebarButton
                    icon={<BiSolidVideoRecording />}
                    //   label="Videos"
                    isActive={selectedOption === 'Videos'}
                    onClick={(e) => handleButtonClick('Videos', e)}
                />

                <SidebarButton
                    icon={<FiCodesandbox />}
                    //   label="More"
                    isActive={selectedOption === 'models'}
                    onClick={(e) => handleButtonClick('models', e)}
                />
                
                <SidebarButton
                    icon={<IoIosMore />}
                    //   label="More"
                    isActive={selectedOption === 'More'}
                    onClick={(e) => handleButtonClick('More', e)}
                />

            </div>

            {/* Conditional Components */}
            {selectedOption === 'Edit' && <EditBar color={color} setColor={setColor} />}
            {selectedOption === 'Videos' && <VideoBar />}
            {selectedOption === 'Background' && <BgBar background={background} setBackground={setBackground} />}
            {selectedOption === 'models' && <ModelBar onSelect={onSelect} selectedModel={selectedModel} />}
        </div>
    );
}

// Sidebar button component with active state styling
function SidebarButton({ icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`editbtn flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-lg w-fit text-white ${isActive ? 'bg-green-700' : 'bg-gray-800 hover:bg-gray-700'
                } transition duration-200 ease-in-out`}
            style={{ zIndex: 100 }} // Ensure it's on top of other elements
        >
            <div className="text-[22px]">{icon}</div>
            <label className="text-xs font-medium">{label}</label>
        </button>
    );
}

// EditBar component
function EditBar({ color, setColor }) {
    return (
        <div className="editbar flex flex-col items-center px-2 py-3 fixed bottom-4 left-24 top-[10vh] h-fit rounded-[10px] bg-gray-900 bg-opacity-70 backdrop-blur-md gap-4 z-50">
            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7FFF7', '#FF8C42'].map((clr) => (
                <div
                    key={clr}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${color === clr ? 'outline outline-2 outline-green-500' : ''
                        }`}
                    style={{ backgroundColor: clr }}
                    onClick={() => setColor(clr)}
                />
            ))}
        </div>
    );
}

function ModelBar({  onSelect, selectedModel}) {
    return (
        <>
            <MerchTypeSidebar onSelect={onSelect} selectedModel={selectedModel} />
        </>
    );
}

// VideoBar component (Empty for now, add content as needed)
function VideoBar() {
    return (
        <div className="editbar flex flex-col items-center px-2 py-3 fixed bottom-4 left-24 top-[20vh] h-fit rounded-[10px] bg-gray-900 bg-opacity-70 backdrop-blur-md gap-4 z-50">
            {/* Add video-related controls here */}
            <p className="text-white">Video Controls</p>
        </div>
    );
}


function BgBar({ background, setBackground }) {
    const [hovered, setHovered] = useState(null);

    // List of gradient options (with some cool variations)
    const gradientOptions = [
        'linear-gradient(to right, #FF6B6B, #F7FFF7)',
        'linear-gradient(to right, #4ECDC4, #45B7D1)',
        'linear-gradient(to right, #F7FFF7, #FF8C42)',
        'linear-gradient(to bottom right, #1e2a47, #3a506b)',
        'linear-gradient(to bottom right, #F5F7FB, #e4e9f0)',
        'linear-gradient(45deg, #f06, transparent)',
    ];

    // Texture options (use images with filters)
    const textureOptions = [
        '/assets/textures/bg3d.png',
        '/assets/textures/bg3d2.png',
        '/assets/textures/bg3d2.jpg',
        '/assets/textures/bg3d3.jpg',
    ];

    // Custom function for adding a cool parallax hover effect
    const handleHoverEffect = (e, texture) => {
        if (hovered !== texture) {
            setHovered(texture);
        }
    };

    const handleGradientClick = (gradient) => {
        setBackground(gradient);
    };

    const handleTextureClick = (texture) => {
        setBackground(`url(${texture})`);
    };

    return (
        <div className="editbar flex flex-col items-center px-2 py-2 fixed bottom-4 left-24 top-[10vh] bg-gray-900 bg-opacity-70 backdrop-blur-md h-fit rounded-[10px] gap-6 z-50">
            {/* Gradient Selection with Hover Effects */}
            <div className="flex flex-col items-center px-0 py-0 rounded-[10px]  gap-4 z-50">

                {gradientOptions.map((gradient, index) => (
                    <div
                        key={index}
                        className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${background === gradient ? 'outline outline-4 outline-green-500' : ''
                            }`}
                        style={{ background: gradient }}
                        onClick={() => handleGradientClick(gradient)}
                        onMouseEnter={(e) => handleHoverEffect(e, gradient)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div
                            className={`w-full h-full rounded-full transition-all ${hovered === gradient ? "scale-110 blur-sm" : ""
                                }`}
                            style={{ filter: hovered === gradient ? 'brightness(1.2)' : 'none' }}
                        />
                    </div>
                ))}
            </div>
            <div className='h-[1px] w-[90%] bg-gray-700'> </div>
            {/* Texture Selection with Parallax Hover Effects */}
            <div className="flex flex-col items-center px-0 py-0  h-fit rounded-[10px]  gap-4 z-50">
                {textureOptions.map((texture, index) => (
                    <div
                        key={index}
                        className="relative group w-6 h-6 rounded-full overflow-hidden cursor-pointer transition-transform duration-500"
                        onClick={() => handleTextureClick(texture)}
                        onMouseEnter={(e) => handleHoverEffect(e, texture)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div
                            className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${hovered === texture ? 'scale-110' : ''
                                }`}
                            style={{
                                backgroundImage: `url(${texture})`,
                                filter: hovered === texture ? 'brightness(1.2)' : 'none',
                            }}
                        />
                        <div
                            className={`absolute inset-0 bg-black bg-opacity-50 rounded-full transition-all duration-300 ${hovered === texture ? 'opacity-60' : 'opacity-0'
                                }`}
                        ></div>
                    </div>
                ))}
            </div>

            {/* Add More Aesthetic Styles (for Next Level) */}
            {/* <div className="flex flex-col items-center mt-8 gap-4">
        <button
          className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8C42] text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-lg transition-transform hover:scale-110 hover:shadow-2xl focus:outline-none"
          onClick={() => alert('More skins coming soon!')}
        >
          ✨ More Skins
        </button>
        <button
          className="bg-gradient-to-r from-[#4ECDC4] to-[#45B7D1] text-white text-sm font-semibold py-2 px-6 rounded-xl shadow-lg transition-transform hover:scale-110 hover:shadow-2xl focus:outline-none"
          onClick={() => alert('Check out more effects!')}
        >
          🌀 Dynamic Effects
        </button>
      </div> */}
        </div>
    );
}



 