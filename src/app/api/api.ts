import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ResourceType } from '../types/ResourceType';
import { SøknadApiData } from '../types/SøknadApiData';
import { Søknadstype } from '../types/SøknadFormData';
import { getApiUrlByResourceType, sendMultipartPostRequest } from '../utils/apiUtils';

export const getSøker = (søknadstype: Søknadstype) =>
    axios.get(getApiUrlByResourceType(søknadstype, ResourceType.SØKER), axiosConfig);

export const sendApplication = (søknadstype: Søknadstype, data: SøknadApiData) =>
    axios.post(getApiUrlByResourceType(søknadstype, ResourceType.SEND_DOKUMENTER), data, axiosConfig);

export const uploadFile = (søknadstype: Søknadstype, file: File) => {
    const formData = new FormData();
    formData.append('vedlegg', file);
    return sendMultipartPostRequest(getApiUrlByResourceType(søknadstype, ResourceType.VEDLEGG), formData);
};
export const deleteFile = (url: string) => axios.delete(url, axiosConfig);
