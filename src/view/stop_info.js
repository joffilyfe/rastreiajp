export default class StopInfo {
  constructor(items) {
    this.container = this.container ? this.container : document.querySelector('.stop-info');
    this.header = this.container.querySelector('.header');
    this.list = this.list ? this.list : document.querySelector('#bus-list');
    this.list.innerHTML = '';
    this.build(items);
  }

  build(items) {
    items.sort(this._order).forEach((item) => {
      this.list.appendChild(this.createItem(item));
    });

    this.container.style.display = 'block';

    this.header.addEventListener('click', () => {
      this.container.style.display = 'none';
    });
  }

  /*
  * Create item of list
  */
  createItem(obj) {
    const regex = /(\w+)[\s\t](\w*\d+)/i;
    let group = {total: 0, sentido: 1, linha: 2};
    let result = obj.codigo.match(regex);
    let item = document.createElement('li');


    if (!result) {
      return item;
    }

    item.textContent = `${result[group.linha]} - Destino: ${obj.descricaoSentido}`;

    return item;
  }


  /*
  * Function to sort items by code
  */
  _order(f, s) {
    let regex = /(\w+)[\s\t](\w*\d+)/i;
    let first = f.codigo.match(regex);
    let second = s.codigo.match(regex);
    return first[2] - second[2];
  }
}
