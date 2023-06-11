import React, { createContext, useContext, useMemo } from 'react';

export type ForgeLocale = 'en' | 'hi';

const DEFAULT_LOCALE: ForgeLocale = 'en';

export type ForgeContextValue = {
  locale: ForgeLocale;
};

export const ForgeContext = createContext<ForgeContextValue>({
  locale: DEFAULT_LOCALE,
});

type ForgeProviderProps = {
  children?: React.ReactNode;
  /**
   * @deprecated Use `locale` instead.
   */
  value?: ForgeContextValue;
  locale?: ForgeLocale;
  // ssrEstimatedDeviceType?: 'mobile' | 'desktop';
};

export const ForgeContextProvider = ({ children, value, locale }: ForgeProviderProps) => {
  const contextValue = useMemo(
    () =>
      ({
        locale: locale ?? value?.locale ?? DEFAULT_LOCALE,
      } satisfies ForgeContextValue),
    [locale, value?.locale],
  );

  return <ForgeContext.Provider value={contextValue}>{children}</ForgeContext.Provider>;
};

export const useForgeContext = () => useContext(ForgeContext);
