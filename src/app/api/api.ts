import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ApplicationApiData, ApplicationApiDataPleiepenger } from '../types/ApplicationApiData';
import { ApplicationType } from '../types/ApplicationType';
import { ResourceType } from '../types/ResourceType';
import { getApiUrlByResourceType, sendMultipartPostRequest } from '../utils/apiUtils';

export const getSøker = (søknadstype: ApplicationType) =>
    axios.get(getApiUrlByResourceType(søknadstype, ResourceType.SØKER), axiosConfig);

export const sendApplicationToOmsorgspengerApi = (data: ApplicationApiData) =>
    axios.post(getApiUrlByResourceType(ApplicationType.omsorgspenger, ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const sendApplicationToPleiepengerApi = (data: ApplicationApiDataPleiepenger) =>
    axios.post(getApiUrlByResourceType(ApplicationType.pleiepenger, ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const uploadFile = (søknadstype: ApplicationType, file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrlByResourceType(søknadstype, ResourceType.VEDLEGG), formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
