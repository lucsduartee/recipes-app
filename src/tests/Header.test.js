import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Header from '../components/Header';
import Login from '../pages/Login';

const PROFILE_TOP_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';

describe('9 - Implemente os elementos do header na tela principal de receitas,'
  + 'respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    renderWithRouter(<Header />);

    const profileTopBtn = screen.getByTestId(PROFILE_TOP_BTN);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchTopBtn).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil,'
  + 'um título e um ícone para a busca, caso exista no protótipo (hasNoHeader)', () => {
  const hasNoHeader = () => {

  };

  it('Não tem header na tela de login', () => {
    renderWithRouter(<Login />);
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeNull();
    expect(getByTestId(PAGE_TITLE)).not.toBeInTheDocument();
    expect(getByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771');
    hasNoHeader();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/178319');
    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52771/in-progress');
    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    hasNoHeader();
  });
});

describe('10 - Implemente um ícone para a tela de perfil,'
  + 'um título e um ícone para a busca, caso exista no protótipo (hasHeader)', () => {
  const hasHeader = (title, withSearchButton = true) => {
    const profileTopBtn = screen.getByTestId(PROFILE_TOP_BTN);
    expect(profileTopBtn).toHaveAttribute('src', 'profileIcon');
    expect(screen.getByTestId(PAGE_TITLE).textContent).toBe(title);

    if (withSearchButton) {
      const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
      expect(searchTopBtn).toHaveAttribute('src', 'searchIcon');
    } else {
      expect(screen.getByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
    }
  };

  it('Header tem os ícones corretos na tela de principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    hasHeader('Comidas');
  });

  it('Header tem os ícones corretos na tela de principal de receitas de bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    hasHeader('Bebidas');
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    hasHeader('Explorar', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    hasHeader('Explorar Comidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    hasHeader('Explorar Bebidas', false);
  });

  it('Header tem os ícones corretos na tela de explorar comidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header tem os ícones corretos na tela de explorar bebidas por ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');
    hasHeader('Explorar Ingredientes', false);
  });

  it('Header tem os ícones corretos na tela de explorar'
    + 'comidas por local de origem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
    hasHeader('Explorar Origem');
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    hasHeader('Perfil', false);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    hasHeader('Receitas Feitas', false);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
    hasHeader('Receitas Favoritas', false);
  });
});

describe('11 - Redirecione a pessoa usuária para a tela de perfil'
  + ' ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const pageTitle = screen.getByTestId(PAGE_TITLE).textContent;
    expect(pageTitle).toBe('Comidas');

    const profileTopBtn = screen.getByTestId(PROFILE_TOP_BTN);
    userEvent.click(profileTopBtn);

    expect(pageTitle).toBe('Perfil');
  });
});

describe('12 - Desenvolva o botão de busca que, ao ser clicado,'
  + 'a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);
    expect(searchInput).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchTopBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
