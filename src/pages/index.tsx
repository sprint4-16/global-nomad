import { Dropdown, menuItem } from '@/components/Dropdown/Dropdown';
import { useState } from 'react';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<menuItem | null>(null);

  const handleSelect = (item: menuItem) => {
    setSelectedItem(item);
  };

  return (
    <>
      랜딩페이지
      <h1>Selected Item: {selectedItem ? selectedItem.itemText : 'None'}</h1>
      <Dropdown onSelect={handleSelect} />
    </>
  );
}
