import axios from 'axios';

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: process.env.REACT_APP_KAKAO_REST_API_KEY,
  },
});

export default Kakao;
