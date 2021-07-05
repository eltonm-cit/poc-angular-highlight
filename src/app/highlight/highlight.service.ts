import { Injectable } from "@angular/core";
import { HighlightResponse } from "./highlight-response.interface";
import { catchError, tap } from 'rxjs/operators'
import { HighlightProvider } from "./highlight.provider";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root',
})
export class HighlightService {

    constructor(private highlightProvider: HighlightProvider) { }


    public getHighlights(text: string): Observable<HighlightResponse[]> {
        return this.highlightProvider.getHighlights(text)
            .pipe(
                tap(_ => console.log('Fetched highlights')),
                catchError(e => {
                    console.error(e)
                    throw e
                })
            )
    }
}