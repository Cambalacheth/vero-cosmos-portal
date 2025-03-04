
// Tarot card data including names, meanings, and placeholder images
export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  meaningUpright: string[];
  meaningReversed: string[];
  description: string;
  imageUrl: string;
}

// Sample tarot deck with placeholder images
// You can replace the imageUrl with actual card images later
export const tarotDeck: TarotCard[] = [
  // Major Arcana
  {
    id: 'the-fool',
    name: 'El Loco',
    arcana: 'major',
    number: 0,
    meaningUpright: ['Nuevos comienzos', 'Aventura', 'Potencial'],
    meaningReversed: ['Imprudencia', 'Riesgo', 'Despreocupación'],
    description: 'El Loco representa nuevos comienzos, aventura y potencial ilimitado.',
    imageUrl: 'https://via.placeholder.com/300x500/e0d8c0/000000?text=El+Loco'
  },
  {
    id: 'the-magician',
    name: 'El Mago',
    arcana: 'major',
    number: 1,
    meaningUpright: ['Manifestación', 'Poder', 'Acción'],
    meaningReversed: ['Manipulación', 'Inseguridad', 'Talentos sin usar'],
    description: 'El Mago representa la manifestación, el poder personal y la capacidad de transformar ideas en realidad.',
    imageUrl: 'https://via.placeholder.com/300x500/e0d8c0/000000?text=El+Mago'
  },
  {
    id: 'the-high-priestess',
    name: 'La Sacerdotisa',
    arcana: 'major',
    number: 2,
    meaningUpright: ['Intuición', 'Sabiduría inconsciente', 'Misterio'],
    meaningReversed: ['Secretos', 'Información no revelada', 'Desconexión'],
    description: 'La Sacerdotisa representa la intuición, los misterios y la sabiduría oculta.',
    imageUrl: 'https://via.placeholder.com/300x500/e0d8c0/000000?text=La+Sacerdotisa'
  },
  // Add more Major Arcana cards...
  
  // Minor Arcana - Wands (just a few examples)
  {
    id: 'ace-of-wands',
    name: 'As de Bastos',
    arcana: 'minor',
    suit: 'wands',
    number: 1,
    meaningUpright: ['Inspiración', 'Creatividad', 'Nuevas oportunidades'],
    meaningReversed: ['Retrasos', 'Falta de dirección', 'Desmotivación'],
    description: 'El As de Bastos representa el inicio de nuevas ideas y oportunidades creativas.',
    imageUrl: 'https://via.placeholder.com/300x500/e0d8c0/000000?text=As+de+Bastos'
  },
  {
    id: 'two-of-wands',
    name: 'Dos de Bastos',
    arcana: 'minor',
    suit: 'wands',
    number: 2,
    meaningUpright: ['Planificación', 'Decisiones', 'Visión de futuro'],
    meaningReversed: ['Miedo a lo desconocido', 'Indecisión', 'Falta de planificación'],
    description: 'El Dos de Bastos representa la planificación, las decisiones y una visión de futuro.',
    imageUrl: 'https://via.placeholder.com/300x500/e0d8c0/000000?text=Dos+de+Bastos'
  },
  // Add more cards for each suit...
];

// Get a specific card by ID
export const getCardById = (id: string): TarotCard | undefined => {
  return tarotDeck.find(card => card.id === id);
};

// Shuffle the deck and draw a specific number of cards
export const drawCards = (count: number, allowReversed: boolean = true): { card: TarotCard, isReversed: boolean }[] => {
  // Create a copy of the deck to shuffle
  const shuffledDeck = [...tarotDeck].sort(() => Math.random() - 0.5);
  
  // Draw the specified number of cards
  return shuffledDeck.slice(0, count).map(card => ({
    card,
    isReversed: allowReversed ? Math.random() > 0.5 : false
  }));
};

// Get cards grouped by arcana type
export const getCardsByArcana = () => {
  const majorArcana = tarotDeck.filter(card => card.arcana === 'major');
  const wands = tarotDeck.filter(card => card.suit === 'wands');
  const cups = tarotDeck.filter(card => card.suit === 'cups');
  const swords = tarotDeck.filter(card => card.suit === 'swords');
  const pentacles = tarotDeck.filter(card => card.suit === 'pentacles');
  
  return { majorArcana, wands, cups, swords, pentacles };
};
