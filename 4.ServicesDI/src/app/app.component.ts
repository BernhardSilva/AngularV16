import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from './interfaces/message.interface';
import { Post } from './interfaces/post.interface';
import { MessagesService } from './services/messages.service';

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
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource!: MatTableDataSource<Post>;
  pagination: number[] = [];
  idFilter: string = '';
  titleFilter: string = '';
  rut: string = '';

  constructor(private messagesService: MessagesService) {
    this.messagesService.getMessages();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //this is like an useEffect without dependencies
  applyIdFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: Post, filter: string) => {
      return data.id.toString().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTitleFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: Post, filter: string) => {
      return data.title.includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.messagesService.getPosts().subscribe({
      next: (response: Post[]) => {
        this.loading = false;
        if (!this.dataSource) {
          this.dataSource = new MatTableDataSource(response);
          const thresholds = [5, 10, 15];
          thresholds.forEach((value) => {
            if (response.length > value) {
              this.pagination.push(value);
            }
          });
        } else {
          this.dataSource.data = response;
        }
        if (this.dataSource.data.length > 0) {
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      },
      error(e: HttpErrorResponse) {
        return console.log(e);
      },
      complete: () => {
        this.loading = true;
        console.log('complete');
      },
    });
  }
}
