import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HighlightResponse } from "./highlight-response.interface";


@Injectable({
    providedIn: 'root',
})
export class HighlightProvider {

    private readonly HIGHLIGHT_PATH: string = '/highlight'

    constructor(private http: HttpClient) { }

    getHighlights(text: string): Observable<HighlightResponse[]> {
        return this.http.get<HighlightResponse[]>(environment.BACKEND_BASE_PATH + this.HIGHLIGHT_PATH, {
            params: {
                text: text
            },
        })
    }
}