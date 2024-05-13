import { useState } from 'react';

export interface IToggleProps {
    onToggle: ( isEnabled: boolean ) => void;
}

export function Toggle({ onToggle }: IToggleProps) {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        onToggle(!isEnabled);
    };

    return (
        <button
            onClick={toggleSwitch}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isEnabled ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
                }`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out`}></div>
        </button>
    );
}

export default Toggle;
