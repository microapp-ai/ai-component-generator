import React, { FC, useEffect, useState } from 'react';
import { Flex, Text } from '@mantine/core';
import { useStyles } from './style';

interface TextItem {
  text: string;
  duration: number;
}

interface LoadingTextChangerProps {
  texts: TextItem[];
}

const LoadingTextChanger: FC<LoadingTextChangerProps> = ({ texts }) => {
  const { classes } = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const changeText = () => {
      if (currentIndex === texts.length - 1) {
        return;
      }

      setFadeOut(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFadeOut(false);
      }, 1000);
    };

    const timer = setTimeout(() => {
      changeText();
    }, texts[currentIndex].duration * 1000);

    return () => clearTimeout(timer);
  }, [texts, currentIndex]);

  return (
    <Flex
      justify="center"
      align="center"
      px="md"
      py="sm"
      className={classes.container}
    >
      <Text className={fadeOut ? classes.textFadeOut : classes.text}>
        {texts[currentIndex].text}
      </Text>
    </Flex>
  );
};

export default LoadingTextChanger;
