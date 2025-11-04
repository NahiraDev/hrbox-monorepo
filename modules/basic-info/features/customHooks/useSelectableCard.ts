import { useState, useEffect } from 'react';

export const useSelectableCard = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setSelectedCardIndex(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
  };

  return { selectedCardIndex, handleCardClick };
};
