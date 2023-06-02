import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AccountConfirmedPage() {
  const history = useHistory();

  useEffect(() => {
    // Vérifier si l'URL actuelle commence par "http://localhost:8000"
    if (window.location.href.startsWith('http://localhost:8000')) {
      // Rediriger vers la page d'accueil
      history.push('/home');
    }
  }, [history]);

  return (
    <div>
      <h1>Confirmation réussie</h1>
      <p>Votre compte a été confirmé avec succès.</p>
    </div>
  );
}

export default AccountConfirmedPage;
