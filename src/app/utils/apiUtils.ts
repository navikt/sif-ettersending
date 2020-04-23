import axios, { AxiosError } from 'axios';
import HttpStatus from 'http-status-codes';
import axiosConfig from '../config/axiosConfig';
import { ApplicationType } from '../types/ApplicationType';
import { ResourceType } from '../types/ResourceType';
import { getEnvironmentVariable } from './envUtils';

export const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' }, ...axiosConfig };

export const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, multipartConfig);
};

export const isForbidden = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.FORBIDDEN;

export const isUnauthorized = ({ response }: AxiosError) =>
    response !== undefined && response.status === HttpStatus.UNAUTHORIZED;

export const getApiUrlByResourceType = (søknadstype: ApplicationType, resourceType: ResourceType) => {
    switch (søknadstype) {
        case ApplicationType.pleiepenger:
            return `${getEnvironmentVariable('API_URL_PLEIEPENGER')}/${resourceType}`;
        case ApplicationType.omsorgspenger:
            return `${getEnvironmentVariable('API_URL_OMSORGSPENGER')}/${resourceType}`;
        default:
            return `${getEnvironmentVariable('API_URL')}/${resourceType}`;
    }
};

export const getApiUrl = (resourceType: ResourceType) => `${getEnvironmentVariable('API_URL')}/${resourceType}`;