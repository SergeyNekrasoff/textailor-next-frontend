/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.vue'],
  darkMode: 'dark', // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xss: { min: '0', max: '428px' },
      xs: { min: '429px', max: '767px' },
      s: { min: '768px', max: '1023px' },
      m: '1024px',
      lg: '1320px',
      xl: '1840px'
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--vt-c-white)',
      white_soft: 'var(--vt-c-white-soft)',
      white_mute: 'var(--vt-c-white-mute)',

      black: 'var(--vt-c-black)',
      black_pure: 'var(--vt-c-black-pure)',
      black_soft: 'var(--vt-c-black-soft)',
      black_mute: 'var(--vt-c-black-mute)',
      black_flash: 'var(--vt-c-black-flash)',

      indigo: 'var(--vt-c-indigo)',
      indigo_soft: 'var(--vt-c-indigo-soft)',
      indigo_light: 'var(--vt-c-indigo-light)',

      gray: 'var(--vt-c-gray)',
      gray_light_1: 'var(--vt-c-gray-light-1)',
      gray_light_2: 'var(--vt-c-gray-light-2)',
      gray_light_3: 'var(--vt-c-gray-light-3)',
      gray_light_4: 'var(--vt-c-gray-light-4)',
      gray_light_5: 'var(--vt-c-gray-light-5)',
      gray_dark_1: 'var(--vt-c-gray-dark-1)',
      gray_dark_2: 'var(--vt-c-gray-dark-2)',
      gray_dark_3: 'var(--vt-c-gray-dark-3)',
      gray_dark_4: 'var(--vt-c-gray-dark-4)',
      gray_dark_5: 'var(--vt-c-gray-dark-5)',

      divider_light_1: 'var(--vt-c-divider-light-1)',
      divider_light_2: 'var(--vt-c-divider-light-1)',
      divider_dark_1: 'var(--vt-c-divider-dark-1)',
      divider_dark_2: 'var(--vt-c-divider-dark-2)',

      text_light_1: 'var(-vt-c-text-light-1)',
      text_light_2: 'var(-vt-c-text-light-2)',
      text_light_3: 'var(-vt-c-text-light-3)',
      text_light_4: 'var(-vt-c-text-light-4)',
      text_light_code: 'var(--vt-c-text-light-code)',

      text_dark_1: 'var(--vt-c-text-dark-1)',
      text_dark_2: 'var(--vt-c-text-dark-2)',
      text_dark_3: 'var(--vt-c-text-dark-3)',
      text_dark_4: 'var(--vt-c-text-dark-4)',
      text_dark_code: 'var(--vt-c-text-dark-code)',

      green: 'var(--vt-c-green)',
      green_light: 'var(--vt-c-green-light)',
      green_lighter: 'var(--vt-c-green-lighter)',
      green_dark: 'var(--vt-c-green-dark)',
      green_darker: 'var(--vt-c-green-darker)',

      blue: 'var(--vt-c-blue)',
      blue_light: 'var(--vt-c-blue-light)',
      blue_lighter: 'var(--vt-c-blue-lighter)',
      blue_dark: 'var(--vt-c-blue-dark)',
      blue_darker: 'var(--vt-c-blue-darker)',

      yellow: 'var(--vt-c-yellow)',
      yellow_light: 'var(--vt-c-yellow-light)',
      yellow_lighter: 'var(--vt-c-yellow-lighter)',
      yellow_dark: 'var(--vt-c-yellow-dark)',
      yellow_darker: 'var(--vt-c-yellow-darker)',

      red: 'var(--vt-c-red)',
      red_light: 'var(--vt-c-red-light)',
      red_lighter: 'var(--vt-c-red-lighter)',
      red_dark: 'var(--vt-c-red-dark)',
      red_darker: 'var(--vt-c-red-darker)',

      purple: 'var(--vt-c-purple)',
      purple_light: 'var(--vt-c-purple-light)',
      purple_lighter: 'var(--vt-c-purple-lighter)',
      purple_dark: 'var(--vt-c-purple-dark)',
      purple_darker: 'var(--vt-c-purple-darker)',

      tt: '#bf492e',
      ff: '#263643'
    }
  },
  plugins: []
}
