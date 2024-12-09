import Card from '../Card/Card';

interface CardsProps {
  cards: any[];
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onUpdateCard: (id: number, updatedFields: { title?: string; description?: string }) => void;
}

export default function Cards({ cards, onStatusChange, onDelete, onUpdateCard }: CardsProps) {
  return (
    <div className="cards-container">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onUpdateCard={onUpdateCard} 
        />
      ))}
    </div>
  );
}
