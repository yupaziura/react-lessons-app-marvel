import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
import MarvelService from './services/MarverService';


const marverService = new MarvelService();

// marverService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))
marverService.getCharacter(1011052).then(res => res.data.results.forEach(item => console.log(item.name)))


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

