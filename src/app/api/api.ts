import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ApplicationApiData } from '../types/ApplicationApiData';
import { ApplicationType } from '../types/ApplicationType';
import { ResourceType } from '../types/ResourceType';
import { getApiUrlByResourceType, sendMultipartPostRequest } from '../utils/apiUtils';

export const getSøker = (søknadstype: ApplicationType) =>
    axios.get(getApiUrlByResourceType(søknadstype, ResourceType.SØKER), axiosConfig);

export const sendApplication = (søknadstype: ApplicationType, data: ApplicationApiData) =>
    axios.post(getApiUrlByResourceType(søknadstype, ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const uploadFile = (søknadstype: ApplicationType, file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrlByResourceType(søknadstype, ResourceType.VEDLEGG), formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
