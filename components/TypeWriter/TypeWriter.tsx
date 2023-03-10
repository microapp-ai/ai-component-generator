import React, { useState, useEffect } from 'react';
import { Title } from '@mantine/core';

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  delay?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  texts,
  speed = 100,
  delay = 1000,
}) => {
  const [text, setText] = useState<string>('Create a ');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(speed);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      const prefix = 'Create a ';
      const visibleText = fullText.substring(
        0,
        text.length - prefix.length + 1
      );

      if (!isDeleting) {
        // typing animation
        setText(prefix + visibleText);
      } else {
        // deleting animation
        setText(text.substring(0, text.length - 1));
      }

      // determine typing speed
      setTypingSpeed(isDeleting ? speed / 2 : speed);

      if (!isDeleting && text === prefix + fullText) {
        // start deleting animation
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === prefix) {
        // go to next word
        setLoopNum(loopNum + 1);
        setIsDeleting(false);
      }
    };

    const typeInterval = setTimeout(handleType, typingSpeed);

    return () => {
      clearTimeout(typeInterval);
    };
  }, [text, isDeleting, loopNum, speed, delay, texts, typingSpeed]);

  return (
    <Title order={1} align="center" weight="bold" size={60}>
      {text}
    </Title>
  );
};

export default TypeWriter;
