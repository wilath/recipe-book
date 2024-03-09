import { Injectable } from '@angular/core';
import { MicroblogPost } from '../shared/models/microblog-post.model';
import { Observable, Subject, defaultIfEmpty, map, tap } from 'rxjs';
import { Comment } from '../shared/models/microblog-comment.model';
import { RealTimeDatabaseService } from '../shared/real-time-database.service';
import { UserDataService } from '../user-panel/user-data.service';
import { UserNotification } from '../shared/enums/notifications.enum';

@Injectable()
export class MicroblogService   {
  constructor(private realTimeDatabaseService:RealTimeDatabaseService, private userDataService: UserDataService) {}
 

  public posts: MicroblogPost[] = [];

  public postsChange = new Subject<MicroblogPost[]>();

  public get getIdforNewPost(): number {
    if (this.posts.length === 0) {
      return 1;
    }
    const highestId = this.posts.reduce((highestId, currentPost) => {
      return currentPost.id > highestId ? currentPost.id : highestId;
    }, this.posts[0].id);

    return highestId + 1;
  }

  public setMicroblog():Observable<void> {
    return this.realTimeDatabaseService.fetchMicroblogData().pipe(
      map(postsToSet => {
        if(postsToSet){
      return postsToSet.map(
        post => {
          return new MicroblogPost(
            post.id,
            post.author,
            new Date(post.date),
            post.content,
            post.images ? post.images : new Array(),
            post.likes && post.likes.whoLiked ? post.likes : { quantity: post.likes.quantity? post.likes.quantity : 0, whoLiked: [] },
            post.comments ? post.comments.map(comment => {
              return {
                ...comment,
                likes: comment.likes && comment.likes.whoLiked ? comment.likes : { quantity: comment.likes.quantity? comment.likes.quantity : 0, whoLiked: [] },
                date: new Date(comment.date)
              };
            }) : new Array()
          );
        })} else { return []};
    }),tap(
      (postsToSet: MicroblogPost[]) => {
        if(postsToSet){
          this.posts = postsToSet;
          this.postsChange.next(this.posts.slice());
         }       
      },
    ),map(()=>{}));
  }

  public getMicroblogData(): MicroblogPost[]{
    return this.posts.slice();
  }

  public onAddNewPost(post: MicroblogPost) {
    const newPosts = this.posts;
    newPosts.push(post);
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onDeletePost(postId: number) {
    const newPosts = this.posts.filter((el) => {
      return el.id !== postId;
    });
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onEditPost(post: MicroblogPost) {
    const newPosts = this.posts.map((el) => {
      if (el.id === post.id) {
        return (el = post);
      } else {
        return el;
      }
    });
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onAddCommentToPost(postId: number, comment: Comment) {
    const newPosts = this.posts;
    const postIndex = newPosts.findIndex((el) => el.id === postId);
    if (postIndex !== -1) {
      newPosts[postIndex].comments.push(comment);
    }
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
    this.userDataService.setNotificationToUser(this.posts[postIndex].author, UserNotification.commentedPost, comment.author)
  }

  public onDeleteComment(postId: number, commentId: number) {
    const newPosts = this.posts;
    const postIndex = newPosts.findIndex((el) => el.id === postId);
    if (postIndex !== -1) {
      newPosts[postIndex].comments = newPosts[postIndex].comments.filter(
        (el) => el.id !== commentId
      );
    }
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onEditComment(postId: number, comment: Comment) {
    const newPosts = this.posts;
    const postIndex = newPosts.findIndex((el) => el.id === postId);

    if (postIndex !== -1) {
      newPosts[postIndex].comments = newPosts[postIndex].comments.map((el) => {
        if (el.id === comment.id) {
          return (el = comment);
        } else {
          return el;
        }
      });
    }
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onLikePost(postId: number, userEmail: string, add: boolean) {
      const newPosts = this.posts;
      const postIndex = newPosts.findIndex((el) => el.id === postId);
      if(postIndex !== -1) {
        switch (add){
          case true:
            newPosts[postIndex].likes.quantity++
            newPosts[postIndex].likes.whoLiked.push(userEmail)
          break;
          case false:
            newPosts[postIndex].likes.quantity--
            newPosts[postIndex].likes.whoLiked = newPosts[postIndex].likes.whoLiked.filter(el => el !== userEmail)
          break;
        }
      }
      this.posts = newPosts;
      this.postsChange.next(this.posts.slice());
      this.userDataService.setNotificationToUser(this.posts[postIndex].author, UserNotification.likedPost, userEmail)
  }

  public onLikeComment(postId: number, commentId: number, userEmail: string, add: boolean) {
    const newPosts = this.posts;
    const postIndex = newPosts.findIndex((el) => el.id === postId);
    const newCommentIndex = newPosts[postIndex].comments.findIndex( el => el.id === commentId)

    if(postIndex !== -1) {
      switch (add){
        case true:
          newPosts[postIndex].comments[newCommentIndex].likes.quantity++
          newPosts[postIndex].comments[newCommentIndex].likes.whoLiked.push(userEmail)
        break;
        case false:
          newPosts[postIndex].comments[newCommentIndex].likes.quantity--
          newPosts[postIndex].comments[newCommentIndex].likes.whoLiked = newPosts[postIndex].comments[newCommentIndex].likes.whoLiked.filter(el => el !== userEmail)
        break;
      }
    }
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
    this.userDataService.setNotificationToUser(this.posts[postIndex].comments[newCommentIndex].author, UserNotification.likedComment, userEmail)
  }

  public storeDatainDatabase(){
    this.realTimeDatabaseService.storeMicroblogData(this.posts)
  }
}
