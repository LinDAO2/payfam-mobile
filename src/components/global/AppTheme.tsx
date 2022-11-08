import React, {FC, ReactNode} from 'react';
import {
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
  //   MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

interface Props {
  children: ReactNode;
}
const theme = {
  ...MD3LightTheme,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    brandPrimary: '#373ae6ff',
    brandPrimaryLight: '#047cfdff',
    brandSecondary: '#fddd3eff',
    brandSecondaryLight: '#f9e969ff',
  },
  fonts: {
    ...MD3LightTheme.fonts,
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme();

const AppTheme: FC<Props> = ({children}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default AppTheme;
