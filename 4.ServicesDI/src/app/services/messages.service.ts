import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getMessages(): IMessage[] {
    return [
      { id: 1, text: 'Hello' },
      { id: 2, text: 'World' },
      { id: 3, text: 'Hello World' },
    ];
  }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiUrl);
  }
}
