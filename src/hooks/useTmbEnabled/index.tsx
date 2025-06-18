import useAuthContext from '@site/src/hooks/useAuthContext';

/**
 * Hook to get TMB (Third-party Marketplace Business) enabled status from auth context
 * @returns {[boolean, boolean]} A tuple containing [isTmbEnabled, isLoading]
 */
const useTmbEnabled = (): [boolean, boolean] => {
  const authContext = useAuthContext();

  // Default values if auth context is not available
  const is_tmb_enabled_ff = authContext?.is_tmb_enabled_ff ?? false;
  const isTmbLoading = authContext?.isTmbLoading ?? false;

  return [is_tmb_enabled_ff, isTmbLoading];
};

export default useTmbEnabled;
