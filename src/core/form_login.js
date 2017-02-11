import API from './endpoint.js';
import Request from '../util/request.js';

export default class FormLogin {
  constructor() {
    this.form = document.querySelector('#form-login');
    this.response = null;
  }

  build() {
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
      console.log('Informe um usuário senha');
      return;
    }

    let request = new Request();
    request.post(API.LOGIN, params, (data) => {
      // #TODO: Build a User and set a Cookie or localStorage
      console.log(JSON.parse(data));
    });
  }

}
