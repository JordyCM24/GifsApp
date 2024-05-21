import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = "MNS8n6OfoxmSBGb6Mk1t2PBB98XZwCvc"
  private serviceUrl: string = "https://api.giphy.com/v1/gifs"

  constructor(private _http: HttpClient) { 
    this.loadLocalStorage();
  }

  get tagHistory() {
    return [...this._tagsHistory];
  }

  private organizedHistory(tag:string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag: string):void {
    if(tag.length === 0) return;
    this.organizedHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this._http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe(res => {

      this.gifList = res.data;

      //console.log(res);
    });

    //'https://api.giphy.com/v1/gifs/search?api_key=MNS8n6OfoxmSBGb6Mk1t2PBB98XZwCvc&q=valorant&limit=10'


  }


}
