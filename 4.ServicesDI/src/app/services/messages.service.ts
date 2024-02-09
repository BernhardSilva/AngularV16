import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getMessages(): Message[] {
    return [
      { id: 1, text: 'Hello' },
      { id: 2, text: 'World' },
      { id: 3, text: 'Hello World' },
    ];
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
