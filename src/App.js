import './App.css';
import { YOUR_APP_ID, YOUR_APP_KEY } from './key';
import Axios from 'axios';
import { useState } from 'react';
import RecipeTile from './RecipeTile';


function App() {
  const [query, setquery] = useState('');
  const [recipes, setrecipes] = useState([]);
  const [healthLabel, sethealthLabel] = useState('vegan');


  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data)
  }
  const onSubmit = function (e) {
    e.preventDefault()
    getRecipes()
  }

  return (
    <div className="app">
      <h1>Food Recipe Plaza 🌭</h1>
      <form className='app__searchForm' onSubmit={onSubmit}>
        <input type='text' spellCheck="true" className='app__input' placeholder='enter ingridient' value={query} onChange={(e) => setquery(e.target.value)}></input>
        <input className='app__submit' value='Search' type='submit' />

        <select className='app__healthLabels'>
          <option onClick={() => sethealthLabel('vegan')}>
            vegan
          </option>
          <option onClick={() => sethealthLabel('vegetarian')}>
            vegetarian
          </option>
          <option onClick={() => sethealthLabel('alcohol-free')}>
            alcohol-free
          </option>
          <option onClick={() => sethealthLabel('low-sugar')}>
            low-sugar
          </option>
          <option onClick={() => sethealthLabel('No-oil-added')}>
            No-oil-added
          </option>
        </select>
      </form>

      <div className='app__recipes'>
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />;
        })}
      </div>
    </div >
  );
}

export default App;
