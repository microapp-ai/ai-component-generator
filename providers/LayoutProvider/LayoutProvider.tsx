import React, { FC } from 'react';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({
  children,
}): React.ReactElement => (
  <>{children}</>
);

export default LayoutProvider;
