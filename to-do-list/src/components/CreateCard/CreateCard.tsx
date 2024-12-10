import React, { useState } from 'react';
import styles from './CreateCard.module.css';
import { createCard, nextVal } from '../../utils/user_cards';

export default function CreateCard({ addCard, user }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');  
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let id = await nextVal()
    if (user) {
      const newCard = {
        id: Number(id)+1,
        title,
        description,
        status,
        dueDate
      };
      addCard(newCard);
      createCard(newCard)
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      setMessage("");
    } else {
      setMessage("Must login to create a card");
    }
  };
  

  return (
    <>
    <div style={{color: 'red'}}>{message}</div>
    <form onSubmit={handleSubmit} className={styles.CreateCard}>
      <label>Title</label>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        maxLength={300}
      />

      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label>Due Date (optional)</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        />

      <button type="submit">Create Card</button>
    </form>
    </>
  );
}
