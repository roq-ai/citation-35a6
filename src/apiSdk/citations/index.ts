import axios from 'axios';
import queryString from 'query-string';
import { CitationInterface, CitationGetQueryInterface } from 'interfaces/citation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCitations = async (
  query?: CitationGetQueryInterface,
): Promise<PaginatedInterface<CitationInterface>> => {
  const response = await axios.get('/api/citations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCitation = async (citation: CitationInterface) => {
  const response = await axios.post('/api/citations', citation);
  return response.data;
};

export const updateCitationById = async (id: string, citation: CitationInterface) => {
  const response = await axios.put(`/api/citations/${id}`, citation);
  return response.data;
};

export const getCitationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/citations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCitationById = async (id: string) => {
  const response = await axios.delete(`/api/citations/${id}`);
  return response.data;
};
