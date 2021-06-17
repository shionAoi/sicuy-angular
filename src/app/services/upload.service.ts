import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private httpClient: HttpClient,
                private sessionService: SessionService) {
    }

    uploadFile(file: File, belonging: string): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('belonging', belonging)
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${ this.sessionService.getToken() }`
        })
        return this.httpClient.post<any>(environment.FILE_ENDPOINT, formData, { headers: headers })
    }

    uploadImage(file: File, belonging: string): Observable<any> {
        const formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('belonging', belonging)
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${ this.sessionService.getToken() }`
        })
        return this.httpClient.post<any>(environment.PHOTO_ENDPOINT, formData, { headers: headers })
    }
}
