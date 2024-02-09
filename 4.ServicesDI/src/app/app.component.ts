import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MessagesService } from './services/messages.service';
import { Message } from './interfaces/message.interface';
import { Post } from './interfaces/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '4.ServicesDI';

  messages: Message[] = this.messagesService.getMessages() || [];

  posts$: Observable<Post[]> | any = [];

  loading: boolean = false;

  constructor(private messagesService: MessagesService) {
    this.messagesService.getMessages();
  }

  //this is like an useEffect without dependencies
  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.messagesService.getPosts().subscribe({
      next: (response: Post[]) => {
        this.loading = false;
        console.log(response);
        return (this.posts$ = response);
      },
      error(e: HttpErrorResponse) {
        return console.log(e);
      },
      complete: () => {
        // setTimeout(() => {
        this.loading = true;
        // }, 3000);
        console.log('complete');
      },
    });
  }
}
