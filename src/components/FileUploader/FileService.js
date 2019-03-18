import service from './Service.js';

export class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post('/api/files/upload', data);
    }
}