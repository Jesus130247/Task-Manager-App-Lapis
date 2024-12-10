import styles from './Card.module.css';
import { useState } from 'react';

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate?: string;
  };
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onUpdateCard: (id: number, updatedFields: { title?: string; description?: string }) => void;
}

export default function Card({ card, onStatusChange, onDelete, onUpdateCard }: CardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newDescription, setNewDescription] = useState(card.description);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    onStatusChange(card.id, newStatus); 
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  };

  const handleTitleBlur = () => {
    onUpdateCard(card.id, { title: newTitle });
    setIsEditingTitle(false);
  };

  const handleDescriptionBlur = () => {
    onUpdateCard(card.id, { description: newDescription });
    setIsEditingDescription(false);
  };

  return (
    <div className={styles.card}>
      <span
        className={styles.deleteButton}
        onClick={() => onDelete(card.id)}
      >
        ×
      </span>
      
      {isEditingTitle ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
        />
      ) : (
        <h3 onClick={handleTitleClick}>{card.title}</h3>
      )}

      {isEditingDescription ? (
        <textarea
          value={newDescription}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          autoFocus
          maxLength={300}
        />
      ) : (
        <p onClick={handleDescriptionClick}>{card.description}</p>
      )}

      {card.dueDate && <span>Due: {card.dueDate}</span>}

      <div className="status">
        <span>Status: </span>
        <select
          value={card.status}
          onChange={handleStatusChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
