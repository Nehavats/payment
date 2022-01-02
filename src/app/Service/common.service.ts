import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
   url = '/assets/Data/card.json';

  constructor(private _httpService: HttpClient) { }

  getResponse(){
    return this._httpService.get(this.url);
  }
}
