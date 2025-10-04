import type { MantineColorsTuple } from '@mantine/core';
import { createTheme } from '@mantine/core';

const millionBlue: MantineColorsTuple = [
  '#e8f1ff',
  '#c9dff7',
  '#a3c4ee',
  '#7da9e5',
  '#5c90dc',
  '#417cd4',
  '#2c6bc2',
  '#1a5ab0',
  '#0a4a9e',
  '#003d8e',
];

export const theme = createTheme({
  colors: {
    millionBlue,
  },
  primaryColor: 'millionBlue',
});