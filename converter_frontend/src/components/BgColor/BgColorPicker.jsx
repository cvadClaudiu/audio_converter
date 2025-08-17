import { useState, useEffect } from 'react';

const BgColorPicker = (defaultColor = '#000000') => {
    const [bgColor, setBgColor] = useState(() =>
        localStorage.getItem('bgColor') || defaultColor
    );

    useEffect(() => {
        localStorage.setItem('bgColor', bgColor);
    }, [bgColor]);

    return [bgColor, setBgColor];
};

export default BgColorPicker;
