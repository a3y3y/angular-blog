import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] | undefined = undefined;
  pSub!: Subscription;
  searchStr = "";

  constructor(
    private postsService: PostsService,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      console.log()
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  remove(id: string) {
    this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts?.filter(post => post.id !== id)
    })
    this.alert.warning("Пост был удален")
  }

}
