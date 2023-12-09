import React from 'react';

interface InstructionProps {
  instructions: string[];
}

const Instruction: React.FC<InstructionProps> = ({ instructions }) => {
  return (
    <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
      {instructions.map((instruction, index) => (
        <p key={index}>
          <strong>{index + 1}.</strong> {instruction}
        </p>
      ))}
    </div>
  );
};

export default Instruction;
