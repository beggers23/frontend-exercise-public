export default class Autocomplete {
  constructor(rootEl, options = {}) {
    this.rootEl = rootEl;
    this.options = {
      numOfResults: 10,
      data: [],
      ...options,
    };

    this.init();
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  async getResults(query, data) { // * Updated this function to run asynchronously
    if (!query) return [];
    if(this.options.endpoint !== undefined) { // ! Added this conditional to run the logic supplied on component construction
      data = await this.options.getUserData(query, this.options.endpoint, this.options.numOfResults);
    }
    // Filter for matching strings
    return data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });
  }

  onQueryChange(query) {
    // Get data for the dropdown
    this.getResults(query, this.options.data).then((res) => { // * Forced this function to continue once the async this.getResults call completed so it would wait for a response from the github api.
      res = res.slice(0, this.options.numOfResults);
      this.updateDropdown(res);
    });
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      el.classList.add('result');
      el.textContent = result.text;
      el.setAttribute('data-value', result.value); // ! Popped this little attribue in for the front end return of data
      // Pass the value to the onSelect callback
      el.addEventListener('click', () => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'search');
    inputEl.setAttribute('name', 'query');
    inputEl.setAttribute('autocomplete', 'off');

    inputEl.addEventListener('input',
      event => this.onQueryChange(event.target.value));
    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    this.listEl.classList.add('results');
    this.rootEl.appendChild(this.listEl);
  }
}
