import React, { useState, useRef } from 'react';
import { ICodeInputProps } from './interfaces';

export const CodeInput = ({ onValueChange }: ICodeInputProps): JSX.Element => {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''));
  const refs = useRef(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.slice(0, 1); // Aceita apenas um caractere
    setCodes(newCodes);

    const codeJoined = newCodes.join('');
    onValueChange(codeJoined);

    if (value.length > 0 && index < 5) {
      refs.current[index + 1].focus();
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (pasteData.length <= 6) {
      const newCodes = [...codes];
      pasteData.split('').forEach((char: string, index: number) => {
        newCodes[index] = char;
        if (index < 5) {
          refs.current[index + 1].focus();
        }
      });
      setCodes(newCodes);
      const codeJoined = newCodes.join('');
      onValueChange(codeJoined);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && index > 0 && codes[index] === '') {
      refs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center items-center">
      {codes.map((code, index) => (
        <input
          key={index}
          className="w-12 h-12 text-center text-2xl border rounded mx-2"
          type="text"
          maxLength={1}
          value={code}
          onChange={(e) => handleChange(index, e.target.value.toUpperCase())}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          ref={(el) => (refs.current[index] = el)}
        />
      ))}
    </div>
  );
};
