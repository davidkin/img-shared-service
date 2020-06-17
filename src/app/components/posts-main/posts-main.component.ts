import { Component, OnInit } from '@angular/core';
import { PostApiService } from 'src/app/shared/services/post-api.service';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-posts-main',
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.scss']
})
export class PostsMainComponent implements OnInit {
  public posts: IPost[];

  constructor(
    private postApi: PostApiService,
    private toastService: ToasterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postApi.getPosts().subscribe(
      (data: IPost[] ) => (this.posts = data),
      err => this.toastService.openSnackBar(`The ${err}`, 'ERROR')
    );
  }

  openDialog() {
    this.dialog.open(PopupComponent, {
      data: {
        post: this.posts[this.posts.length - 1]
      }
    });
  }

}
