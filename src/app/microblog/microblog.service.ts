import { Injectable } from '@angular/core';
import { MicroblogPost } from '../shared/models/microblog-post.model';
import { Subject } from 'rxjs';
import { MicroblogComment } from '../shared/models/microblog-comment.model';

@Injectable()
export class MicroblogService {
  constructor() {}

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

  public setMicroblogData(posts: MicroblogPost[]) {
    this.posts = posts;
    this.postsChange.next(this.posts);
  }

  public onAddNewPost(post: MicroblogPost) {
    const newPosts = this.posts;
    newPosts.push(post);
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
  }

  public onDeletePost(postId: number) {
    const newPosts = this.posts.filter((el) => {
      el.id !== postId;
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

  public onCommentPost(postId: number, comment: MicroblogComment) {
    const newPosts = this.posts;
    const postIndex = newPosts.findIndex((el) => el.id === postId);
    if (postIndex !== -1) {
      newPosts[postIndex].comments.push(comment);
    }
    this.posts = newPosts;
    this.postsChange.next(this.posts.slice());
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

  public onEditComment(postId: number, comment: MicroblogComment) {
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
  }
}
