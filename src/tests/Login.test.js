import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

const CORRECT_EMAIL = 'email@mail.com';
const CORRECT_PASSWORD = '1234567';
const INCORRECT_EMAIL_1 = 'email@mail';
const INCORRECT_EMAIL_2 = 'email.com';
const INCORRECT_PASSWORD = '123456';

describe('2 - Crie todos os elementos que devem respeitar'
  + 'os atributos descritos no protótipo para a tela de login', () => {
  afterEach(() => {
    cleanup();
  });
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(emailInput).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve'
 + ' conseguir escrever seu email no input de email', () => {
  afterEach(() => {
    cleanup();
  });
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, CORRECT_EMAIL);

    expect(emailInput).toHaveValue(CORRECT_EMAIL);
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa'
+ 'deve conseguir escrever sua senha no input de senha', () => {
  afterEach(() => {
    cleanup();
  });
  it('É possível escrever a senha', () => {
    renderWithRouter(<App />);

    const password = screen.getByTestId(PASSWORD_INPUT);
    userEvent.type(password, CORRECT_PASSWORD);

    expect(password).toHaveValue(CORRECT_PASSWORD);
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário'
+ 'só seja válido após um email válido e uma senha de mais'
+ ' de 6 caracteres serem preenchidos', () => {
  afterEach(() => {
    cleanup();
  });
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, INCORRECT_EMAIL_1);
    userEvent.type(password, CORRECT_PASSWORD);
    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, INCORRECT_EMAIL_2);
    expect(submitBtn).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, INCORRECT_PASSWORD);
    expect(submitBtn).toBeDisabled();

    expect(submitBtn).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisabled();

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);

    expect(submitBtn).not.toBeDisabled();
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão, '
  + 'identificados pelas chaves mealsToken e cocktailsToken', () => {
  afterEach(() => {
    cleanup();
  });
  it('Após a submissão mealsToken e cocktailsToken devem estar '
  + 'salvos em localStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    let mealsToken = localStorage.getItem('mealsToken');
    let cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe(null);
    expect(cocktailsToken).toBe(null);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);

    userEvent.click(submitBtn);

    mealsToken = localStorage.getItem('mealsToken');
    cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave'
+ ' user após a submissão', () => {
  afterEach(() => {
    cleanup();
  });
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisabled();

    let user = JSON.parse(localStorage.getItem('user'));
    expect(user).toBe(null);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);
    userEvent.click(submitBtn);

    user = JSON.parse(localStorage.getItem('user'));
    expect(user).toStrictEqual({ email: CORRECT_EMAIL });
  });
});

describe('8 - Redirecione a pessoa usuária para a tela principal '
+ 'de receitas de comidas após a submissão e validação com sucesso do login', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submitBtn = screen.getByTestId(LOGIN_SUBMIT_BTN);

    expect(submitBtn).toBeDisabled();

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toBe(null);

    userEvent.type(emailInput, CORRECT_EMAIL);
    userEvent.type(password, CORRECT_PASSWORD);
    userEvent.click(submitBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });
});
