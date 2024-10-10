import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ToDoApp = () => {
    const [listeTaches, setListeTaches] = useState([]);
    const [nouvelleTache, setNouvelleTache] = useState('');

    useEffect(() => {
        const recupererTaches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setListeTaches(response.data);
            } catch (erreur) {
                console.error('Erreur lors du chargement des tâches :', erreur);
            }
        };
        recupererTaches();
    }, []);

    const ajouterTache = async () => {
        if (nouvelleTache.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/tasks', { title: nouvelleTache });
                setListeTaches(prevTaches => [...prevTaches, response.data]);
                setNouvelleTache('');
            } catch (erreur) {
                console.error('Erreur lors de l\'ajout de la tâche :', erreur);
            }
        }
    };

    const supprimerTache = async (idTache) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${idTache}`);
            setListeTaches(prevTaches => prevTaches.filter(tache => tache._id !== idTache));
        } catch (erreur) {
            console.error('Erreur lors de la suppression de la tâche :', erreur);
        }
    };

    return (
        <div className="todo-container">
            <h2>Ma Liste de Tâches !///!</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={nouvelleTache}
                    onChange={(e) => setNouvelleTache(e.target.value)}
                    placeholder="Entrez une nouvelle tâche"
                    className="task-input"
                />
                <button onClick={ajouterTache} className="add-button">Ajouter Tâche</button>
            </div>
            <ul className="task-list">
                {listeTaches.map(tache => (
                    <li key={tache._id} className="task-item">
                        {tache.title}
                        <button onClick={() => supprimerTache(tache._id)} className="remove-button">
                            Retirer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoApp;
