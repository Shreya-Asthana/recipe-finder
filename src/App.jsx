import React, { useState } from 'react';
import axios from 'axios';

import './App.css'
const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const app_id = 'd6b958aa';
  const app_key = '248fad2e565e3d02a39aa8fc29396f4a';

  const searchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=0&to=10`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="App">
      <div className="main">
        <p className="title">Discover Delicious Recipes...
          <br/><div id='sub'>Simply enter an ingredient or dish name, and let our app curate a diverse collection of recipes tailored to your preferences.
            <br/>Say goodbye to the hassle of meal planning and hello to the joy of effortless cooking 👩🏽‍🍳</div>
        </p>
       
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a food item..."
          />
          <button type="submit" className="search">Search</button>
        </form>
        {loading && <h3 style={{color:'wheat'}}>Loading...</h3>}
      </div>
      
      {error && <p>{error}</p>}
      <div className="card_container">
        {recipes.map(({ recipe }) => (
          <div className="card" key={recipe.uri} style={{ border: '1px solid #ddd', padding: '20px' }}>
            <h2>{recipe.label}</h2>
            <div className="content">
            <div className="c1">
            <img src={recipe.image} alt={recipe.label} style={{ width: '70', borderRadius:'5%'}} />
            <p><span className="dt">Calories:</span> {recipe.calories.toFixed(2)}</p>
            <p><span className="dt">Diet Labels:</span> {recipe.dietLabels.join(', ')}</p>
            <p><span className="dt">Health Labels:</span> {recipe.healthLabels.join(', ')}</p>
            </div>
            <div className="c2">
            <p className="dt">Ingredients:</p>
            <ul>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            
            </div>
            </div>
            <button className="btn"><a href={recipe.url} target="_blank" rel="noopener noreferrer">Get Recipe</a></button> 
            
          </div>
          
        ))}
        <p className="typewriter" style={{color:'wheat',fontSize:'14px'}}>🍽 Find Your Next Favorite Dish 🍛</p>
      </div>
    </div>
  );
};

export default App;
