import axios, { AxiosResponse } from 'axios';
import { IFormFilter } from '../models/FormFilter';

export const getRickAndMortyCharacters = (
  filter: IFormFilter
): Promise<AxiosResponse> => {
  const url = `${process.env.REACT_APP_RICK_AND_MORTY_API}/character`;
  return axios.get(url, {
    params: filter,
  });
};