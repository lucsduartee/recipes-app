import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import RestoreIcon from '@material-ui/icons/Restore';
import DetailPage from '../components/DetailPage';
import GlobalContext from '../context/GlobalContext';
import Footer from '../components/Footer';
import '../css/Recomendations.css';

function FoodPage(props) {
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const history = useHistory();
  const { getLocal, progress, done } = useContext(GlobalContext);
  console.log('comidasdone', done);
  const [api, saveApi] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const resolve = await response.json();
      saveApi(resolve.meals);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const resolve = await response.json();
      setRecomendations(resolve);
      getLocal(id, 'meals');
    })();
  }, []);

  const nameandMeasures = () => {
    const ingredientandMeasures = [];
    const NUMBER_TWEENTY = 20;
    for (let index = 1; index < NUMBER_TWEENTY; index += 1) {
      const str = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      if (api[0][str] !== '' && api[0][str] !== null) {
        ingredientandMeasures.push(`${api[0][str]} - ${api[0][measure]}`);
      }
    }
    return ingredientandMeasures;
  };

  const saveLocal = () => {
    const doneProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (doneProgress !== null) {
      const localProgress = { ...doneProgress,
        meals:
         { ...doneProgress.meals, [id]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(localProgress));
    }
    history.push(`/comidas/${id}/in-progress`);
  };

  if (loading) return <h1>loading</h1>;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <DetailPage
      api={ api[0] }
      nameandMeasure={ nameandMeasures }
      recomendations={ recomendations }
      url={ url }
      />
      <div className={ done ? 'hidden' : 'visible' }>
        <Button
          onClick={ () => saveLocal() }
          type="button"
          variant="contained"
          color={progress ? "secondary" : "primary" }
          endIcon={progress ? <RestoreIcon /> : <PlayCircleFilledIcon /> }
          sx={{
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          { progress
            ? 'Continuar Receita'
            : 'Iniciar Receita' }
        </Button>
      </div>
      <Footer />
    </Container>
  );
}

FoodPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodPage;
