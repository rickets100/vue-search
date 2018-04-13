import axios from 'axios';

const endpoint = 'http://www.recipepuppy.com/api/';

let RecipePuppy = {
  async search(query) {
    return await axios.get(endpoint, { params: query });
  }
}

export default RecipePuppy;
