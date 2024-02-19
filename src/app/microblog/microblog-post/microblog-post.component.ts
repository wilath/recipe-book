import { Component, Input } from '@angular/core';
import { MicroblogPost } from '../../shared/models/microblog-post.model';

@Component({
  selector: 'app-microblog-post',
  templateUrl: './microblog-post.component.html',
  styleUrl: './microblog-post.component.scss',
})
export class MicroblogPostComponent {

  @Input() public microblogPost: MicroblogPost = {
    id:0,
    author: '',
    date: new Date(),
    title: '',
    content: [],
    image: '',
    likes: { quantity: 0, whoLiked: [] },
    comments: [
      {id:0, author: '', content: '', likes: { quantity: 0, whoLiked: [] } },
    ],
  };
}
