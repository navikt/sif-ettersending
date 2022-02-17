import axios, { AxiosError } from 'axios';
import HttpStatus from 'http-status-codes';
import { ResourceType } from '../types/ResourceType';
import { getEnvironmentVariable } from './envUtils';

export const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

export const sendMultipartPostRequest = (url: string, formData: FormData) => axios.post(url, formData, multipartConfig);

export const isForbidden = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.FORBIDDEN;

export const isUnauthorized = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.UNAUTHORIZED;

export const getApiUrl = (resourceType: ResourceType) =>
    `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
