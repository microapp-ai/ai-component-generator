import { FC, useState } from 'react';
import { Button, Flex, Input, Title } from '@mantine/core';

const Newsletter: FC = () => {
  const [email, setEmail] = useState('');

  return (
    <Flex justify="center" align="center" direction="column" mt={108}>
      <Title order={2} align="center" mb={24}>
        📩 Get the best of Microapps, directly in your inbox
      </Title>
      <Input
        w={376}
        radius="sm"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button color="dark" w={376} radius="sm" mt={16}>
        Subscribe to the newsletter
      </Button>
    </Flex>
  );
};

export default Newsletter;
