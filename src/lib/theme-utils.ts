
export type Theme = 'light' | 'dark';
export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';

// Define color palettes for each zodiac element and theme
export const zodiacElementThemes: Record<ZodiacElement, Record<Theme, Record<string, string>>> = {
  fire: {
    light: {
      '--primary': '13 100% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '35 100% 55%',
      '--accent-foreground': '35 80% 20%',
      '--background': '35 80% 98%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(255,210,171,0.7) 0%, rgba(255,183,122,0.7) 100%)'
    },
    dark: {
      '--primary': '13 100% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '35 80% 55%',
      '--accent-foreground': '0 0% 98%',
      '--background': '13 30% 10%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(71,35,10,0.9) 0%, rgba(51,25,7,0.9) 100%)'
    }
  },
  earth: {
    light: {
      '--primary': '120 40% 45%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '80 60% 60%',
      '--accent-foreground': '80 80% 20%',
      '--background': '80 30% 97%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(215,240,180,0.7) 0%, rgba(190,230,150,0.7) 100%)'
    },
    dark: {
      '--primary': '120 40% 45%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '80 60% 40%',
      '--accent-foreground': '0 0% 98%',
      '--background': '120 30% 10%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(20,60,20,0.9) 0%, rgba(10,40,10,0.9) 100%)'
    }
  },
  air: {
    light: {
      '--primary': '200 80% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '180 60% 60%',
      '--accent-foreground': '180 80% 20%',
      '--background': '180 30% 97%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(180,230,240,0.7) 0%, rgba(150,210,230,0.7) 100%)'
    },
    dark: {
      '--primary': '200 80% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '180 60% 40%',
      '--accent-foreground': '0 0% 98%',
      '--background': '200 30% 10%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(10,30,60,0.9) 0%, rgba(5,20,40,0.9) 100%)'
    }
  },
  water: {
    light: {
      '--primary': '260 40% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '260 30% 88%',
      '--accent-foreground': '260 80% 20%',
      '--background': '260 30% 98%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(224,215,246,0.7) 0%, rgba(200,190,240,0.7) 100%)'
    },
    dark: {
      '--primary': '260 40% 50%',
      '--primary-foreground': '0 0% 98%',
      '--accent': '260 30% 40%',
      '--accent-foreground': '0 0% 98%',
      '--background': '260 30% 10%',
      '--cosmos-gradient': 'linear-gradient(225deg, rgba(30,20,60,0.9) 0%, rgba(20,10,40,0.9) 100%)'
    }
  }
};

// Map zodiac signs to their elements
export const zodiacSignToElement: Record<string, ZodiacElement> = {
  'Aries': 'fire',
  'Leo': 'fire',
  'Sagittarius': 'fire',
  'Taurus': 'earth',
  'Virgo': 'earth',
  'Capricorn': 'earth',
  'Gemini': 'air',
  'Libra': 'air',
  'Aquarius': 'air',
  'Cancer': 'water',
  'Scorpio': 'water',
  'Pisces': 'water'
};

// Get element from sun sign
export function getElementFromSunSign(sunSign: string): ZodiacElement {
  return zodiacSignToElement[sunSign] || 'water';
}
