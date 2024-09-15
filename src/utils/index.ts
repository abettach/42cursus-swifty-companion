import {fontFamily} from '../theme';

export const getFontFamily = (
  weight: 'regular' | 'bold' | 'regularItalic' | 'boldItalic',
) => {
  const selectedFontFamily = fontFamily.PT[weight];

  return selectedFontFamily;
};
