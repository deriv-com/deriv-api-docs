import React from 'react';
import { Fallback } from '../Fallback';
import ApiExplorerFeatures from './explorer';
import useAuthContext from '@site/src/hooks/useAuthContext';

export default function ApiExplorer() {
  const { siteActive } = useAuthContext();

  if (!siteActive) return <Fallback />;
  return <ApiExplorerFeatures />;
}
