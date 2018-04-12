import axios from 'axios';

const endpoint = 'http://www.recipepuppy.com/api/';

// axios.get('/user', {
//     params: {
//       i: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

let RecipePuppy = {
  async search(query) {
    return await axios.get(endpoint, { params: query });
  }
}

export default RecipePuppy;
