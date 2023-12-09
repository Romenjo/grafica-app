// MySlider.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function valuetext(value: number) {
  return `${value}%`;
}

const MySlider = ({ onChange, onDragEnd }) => {
  const handleSliderChange = (event, value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleDragEnd = () => {
    if (onDragEnd) {
      onDragEnd();
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Saturation"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={100}
        onChange={handleSliderChange}
        onMouseUp={handleDragEnd}
      />
    </Box>
  );
};

export default MySlider;
