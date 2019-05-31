import React, { Component } from 'react';
import { FileService } from './FileService';

export class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.fileService = new FileService();
    }
    componentDidMount() {
        console.log("userDescription");
        this.setState({
            userName: this.props.currentUser
          });
      }
    handleUploadFile = (currentUser,event) => {
        const data = new FormData();
        //using File API to get chosen file
        let file = event.target.files[0];
        console.log("Uploading file", event.target.files[0]);
        data.append('file', event.target.files[0]);
        data.append('name', 'my_file');
        data.append('description', 'this file is uploaded by young padawan');
        data.append('currentUser',currentUser)
        let self = this;
        //calling async Promise and handling response or error situation
        this.fileService.uploadFileToServer(data).then((response) => {
            console.log("File " + file.name + " is uploaded");
            console.log(response.data.fileDownloadUri);
            this.props.updateAvatar(response.data.fileDownloadUri);
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
    };
   
    render() {
       let currentUser=this.props.currentUser;
        return (
            <div>
                <input type="file" onChange={(e) => this.handleUploadFile(currentUser, e)} /> 
            </div>
        )
    }
}