import { ReactService } from './../Services/react.service';
//import { React, TypeReact } from './../models/react';
import { CommentService } from './../Services/comment.service';
import { Component } from '@angular/core';
import { PostService } from './../Services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment';
import { Post } from '../models/Post';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent {
  Posts: Post[] = [];
  comments: Comment[] = [];
  token!: any;
  posts: Post[] = [];
  errorMsg = '';
  searchdescPost: string;
  searchKeyword: string = '';
  
  constructor(private PostService: PostService ,private ReactService: ReactService, private router: Router,
    private CommentService: CommentService,    private route: ActivatedRoute

    ) { }
  ngOnInit(): void {
    this.getAllPosts();
  }
  
   getImageUrl(post: Post): string {
    return `http://localhost/Uploads/Images/${post.imagePost}`;
  }
  
  getAllPosts(): void { 
    this.PostService.findAll().subscribe(
      data => {
        this.Posts = data;
      },
      error => {
        console.error('Error getting carpools:', error);
        // Handle errors
      }
    );
  }

    addPost(): void {
      this.router.navigate(['/addPost']);
    }

    deletePost(id:number): void {
      this.PostService.deletePost(id).subscribe(() : void => {
        this.getAllPosts();
      });
    }


    /*deletePost(id: number): void {
      this.CommentService.deleteCommentsByPostId(id).subscribe(() => {
        this.ReactService.deleteReactsByPostId(id).subscribe(() => {
          this.PostService.deletePost(id).subscribe(() => {
            this.getAllPosts(); // Mettez à jour la liste des posts après la suppression
          });
        });
      });
    }*/
    
   updatePost(id: number): void {
      this.router.navigate(['/updatePost', id]);
    }

searchPost(): void {
  //s'assurant que ce n'est pas juste des espaces vides
  if (this.searchKeyword.trim() !== '') {
    this.PostService.searchPost(this.searchKeyword).subscribe(
      data => {
        this.Posts = data;
        console.log('Search results:', data);
      },
      error => {
        console.error('Erreur lors de la recherche des taks', error);
      }
    );
  } else {
    // Empty search keyword, get all user stories
    this.getAllPosts();
  }
}

  
}
