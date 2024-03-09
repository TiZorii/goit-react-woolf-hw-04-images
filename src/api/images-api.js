import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const MY_KEY = '40880648-0c49830a119af18016c24c7ec';
axios.defaults.params = {
  key: MY_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImg = async (search, page) => {
  try {
    const { data } = await axios(`?q=${search}&page=${page}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
