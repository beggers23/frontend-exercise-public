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

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});


// Github Users
new Autocomplete(document.getElementById('gh-user'), {
  endpoint: 'https://api.github.com/search/users',
  getUserData: async (query, endpoint, numOfResults) => { // * Created a new async function to get data from an external API and return data in the proper format for the new component to read it the same way as the old.
    const response = await fetch(`${endpoint}?q=${query}&per_page=${numOfResults}`)
    const json = await response.json();

    const data = json.items.map(users => ({
      text: users.login,
      value: users.id,
    }));

    return data;
  },
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});

let count = -1;
let currentNode = '';
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keyup', (e) => {
    const location = e.target.parentNode.id;

    if (location !== currentNode) {
      count = -1;
      currentNode = e.target.parentNode.id;
    }
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) { // Limits logic to only run for 3 keys
      const resultEl = e.target.parentNode.querySelector('.results');
      if (resultEl.childNodes.length > 0) {
        const results = resultEl.childNodes;
        if (e.keyCode === 38 && (count > -1 && count <= results.length - 1)) {
          // ! If Up Arrow is pressed
          count--;
          if (count > -1) {
            results[count].classList.add('highlighted');
          }
          results[count + 1].classList.remove('highlighted');
        } else if (e.keyCode == 40 && (count >= -1 && count < results.length - 1)) { 
          // ! If Down Arrow is pressed
          count++;
          results[count].classList.add('highlighted');
          if (count > 0) {
            results[count - 1].classList.remove('highlighted');
          }
        } else if(e.keyCode === 13 && count > -1) {
          // ! If Enter Key Is Pressed
          const res = results[count].dataset.value;
          const resultString = (location === 'gh-user') ? `selected github user id: ${res}` : `selected state: ${res}`;
          console.log(resultString);
        }
      }
    }
  })
})