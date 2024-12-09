import './App.css';
import Cards from './components/Cards/Cards';
import { useEffect, useState } from 'react';
import CreateCard from './components/CreateCard/CreateCard';
import Login from './components/Login/Login';
import { getUserFromLocalStorage } from './utils/auth_services';
import { DeleteCard, getCardsFromDatabase, updateCard } from './utils/user_cards';

function  App() {
  const [cards, setCards] = useState<any[]>([]);
  const [user, setUser] = useState(getUserFromLocalStorage())

  useEffect(() => {
    const fetchCards = async () => {
      if (user) {
        try {
          const fetchedCards = await getCardsFromDatabase(user?.id); 
          setCards(fetchedCards); 
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      }
    };

    fetchCards(); 
  }, [user]);

  const addCard = (newCard: any) => {
    setCards([...cards, newCard]);
  };

  const updateCardStatus = (card_id: number, status: string) => {
    updateCard({card_id, status})
    setCards(cards.map(card => {
      return card.id === card_id ? { ...card, status: status } : card
    }
    ));
  };

  const updateCardDetails = (card_id: number, updatedFields: { title?: string; description?: string }) => {
    updateCard({card_id, updatedFields})
    setCards(cards.map(card => 
      card.id === card_id ? { ...card, ...updatedFields } : card
    ));
  };

  const deleteCard = (card_id: number) => {
    DeleteCard(card_id)
    setCards(cards.filter(card => card.id !== card_id));
  };

  return (
    <>
    <h1>Task Manager</h1>
    <div className="App">

    <section className="login">
        <Login user={user} setUser={setUser} setCards={setCards} />
      </section>

      <section className="create-card-section">
        <h2>Create a New Card</h2>
        <CreateCard addCard={addCard} user={user}/>
      </section>

      <section className="cards-section">
        <h2>To Do</h2>
        <Cards
          cards={cards.filter(card => card.status === 'To Do')}
          onStatusChange={updateCardStatus}
          onDelete={deleteCard}
          onUpdateCard={updateCardDetails} 
          />
      </section>

      <section className="cards-section">
        <h2>In Progress</h2>
        <Cards
          cards={cards.filter(card => card.status === 'In Progress')}
          onStatusChange={updateCardStatus}
          onDelete={deleteCard}
          onUpdateCard={updateCardDetails} 
          />
      </section>

      <section className="cards-section">
        <h2>Done</h2>
        <Cards
          cards={cards.filter(card => card.status === 'Completed')}
          onStatusChange={updateCardStatus}
          onDelete={deleteCard}
          onUpdateCard={updateCardDetails} 
          />
      </section>


    </div>
  </>
  );
}

export default App;
