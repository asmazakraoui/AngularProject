import { ReactService } from './../Services/react.service';
//import { React, TypeReact } from './../models/react';
import { CommentService } from './../Services/comment.service';
import { Component } from '@angular/core';
import { PostService } from './../Services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment';
import { Post } from '../models/Post';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [MessageService, ConfirmationService]

})

export class PostComponent {
   comments: Comment[] = [];
  token!: any;
   errorMsg = '';
  action = '';
  searchdescPost: string;
  searchKeyword: string = '';
  postDialog: boolean = false;
  PostForm!: FormGroup;

  posts!: Post[];

  post!: Post;

  selectedPosts!: Post[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private fb: FormBuilder, private PostService: PostService ,private ReactService: ReactService, private router: Router,
    private CommentService: CommentService,    private route: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService

    ) { }
  ngOnInit(): void {
    this.getAllPosts();
    this.PostForm = this.fb.group({
      descPost: ['', Validators.required],
      dateCreation: ['', Validators.required],
      imagePost: ['', Validators.required],

    });
  }
  selectedFile: File | null = null;
  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }
   getImageUrl(post: Post): string {
    return `http://localhost/Uploads/Images/${post.imagePost}`;
  }

  getAllPosts(): void {
    this.PostService.findAll().subscribe(
      data => {
        this.posts = data;
       },
      error => {
        console.error('Error getting carpools:', error);
        // Handle errors
      }
    );
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



openNew() {
  //@ts-ignore
  this.post = {};
  this.submitted = false;
  this.postDialog = true;
  this.action = "create"

}

deleteSelectedPosts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected posts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.posts = this.posts.filter((val) => !this.selectedPosts?.includes(val));
          this.selectedPosts = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Posts Deleted', life: 3000 });
      }
  });
}

editPost(post: Post) {
  this.post = { ...post };
  this.postDialog = true;
  this.action = "update"
}

deletePost(post: Post) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + post.descPost + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PostService.deletePost(post.idPost).subscribe(() : void => {
          this.getAllPosts();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Deleted', life: 3000 });
        });
          //@ts-ignore
          this.post = {};
      }
  });
}

hideDialog() {
  this.postDialog = false;
  this.submitted = false;
}

savePost() {
  this.submitted = true;

     const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('descPost', this.post.descPost);
    //@ts-ignore
    formData.append('dateCreation', this.post.dateCreation);

    this.PostService.addPost(formData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Created', life: 3000 });
      this.PostForm.reset();
      this.selectedFile = null;
      this.getAllPosts();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Post Created', life: 1000 });
      console.error(error);
    });

      // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });

      this.posts = [...this.posts];
      this.postDialog = false;
      //@ts-ignore
      this.post = {};
      this.action =""
}
updatePost() {
  this.submitted = true;

     const formData = new FormData();
    formData.append('file', this.selectedFile  );
    formData.append('descPost', this.post.descPost);
    //@ts-ignore
    formData.append('dateCreation', this.post.dateCreation);

    this.PostService.updatePost(this.post.idPost,formData).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });
      this.PostForm.reset();
      this.selectedFile = null;
      this.getAllPosts();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 1000 });
      console.error(error);
    });


      this.posts = [...this.posts];
      this.postDialog = false;
      //@ts-ignore
      this.post = {};
      this.action =""
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.posts.length; i++) {
    //@ts-ignore
      if (this.posts[i].id  == id) {
          index = i;
          break;
      }
  }

  return index;
}

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}



}
