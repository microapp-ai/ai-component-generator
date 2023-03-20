import React, { FC, useEffect, useState } from 'react';
import { Box, Flex, Text } from '@mantine/core';
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
    <Box className={classes.container}>
      <Flex
        justify="center"
        align="center"
        px="md"
        py="sm"
        className={fadeOut ? classes.boxFadeOut : classes.box}
      >
        <Text>{texts[currentIndex].text}</Text>
      </Flex>
    </Box>
  );
};

export default LoadingTextChanger;
