import React, { FC } from 'react';
import { MainLayout } from '@/layouts';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({
  children,
}): React.ReactElement => <MainLayout>{children}</MainLayout>;

export default LayoutProvider;
