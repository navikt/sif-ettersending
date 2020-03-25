import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ResourceType } from '../types/ResourceType';
import { SøknadApiData } from '../types/SøknadApiData';
import { getApiUrlByResourceType, sendMultipartPostRequest } from '../utils/apiUtils';

export const getSøker = () => axios.get(getApiUrlByResourceType(ResourceType.SØKER), axiosConfig);

export const sendApplication = (data: SøknadApiData) =>
    axios.post(getApiUrlByResourceType(ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrlByResourceType(ResourceType.VEDLEGG), formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
