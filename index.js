/* eslint-disable no-new */
import 'babel-polyfill';
import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation,
}));

const stateAuto = new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});


// Github Users
const ghAuto = new Autocomplete(document.getElementById('gh-user'), {
  endpoint: 'https://api.github.com/search/users',
  getUserData: async (query, endpoint, numOfResults) => {
    const response = await fetch(`${endpoint}?q=${query}&per_page=${numOfResults}`)
    const json = await response.json();
    return json.items;
  },
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});

stateAuto.rootEl.addEventListener('keyup', (e) => {
  console.log(stateAuto.rootEl.childNodes);
})