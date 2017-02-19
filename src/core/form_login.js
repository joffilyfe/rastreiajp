import API from './endpoint.js';
import Request from '../util/request.js';

export default class FormLogin {
  constructor() {
    this.container = document.querySelector('#login');
    this.form = document.querySelector('#form-login');
    this.token = localStorage.getItem('tokenTracker');
  }

  build() {
    this.toggleContainer();
    this.form.addEventListener('submit', (e) => { this.getToken(e); });
  }

  getToken(event) {
    event.preventDefault();
    let params = {
      usuario: `${this.form.getElementsByTagName('input')[0].value}`,
      senha: `${this.form.getElementsByTagName('input')[1].value}`,
      cidade: 'jpa'
    };

    if (!params.usuario.trim() || !params.senha.trim()) {
      alert('Por favor, informe um login e senha válidos');
      return;
    }

    let request = new Request();
    request.post(API.LOGIN, params, (data) => {
      let response = JSON.parse(data);
      if (!!response.Token) {
        this.setToken(response.Token);
        this.toggleContainer();
      }
    });
  }

  isSigned() {
    if (!!this.token) {
      return true;
    }

    return false;
  }

  toggleContainer() {
    if (this.isSigned()) {
      this.container.style.display = 'none';
    } else {
      this.container.style.display = 'block';
    }
  }

  setToken(token) {
    localStorage.setItem('tokenTracker', token);
    this.token = token;
  }

}
