import { CommentService } from './../Services/comment.service';
import { Post } from '../models/Post';
import { PostService } from './../Services/post.service';
import { FormBuilder,FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  PostForm!: FormGroup;
  post :Post={
    idPost:0,
    descPost:"",
    dateCreation: new Date('2024-03-04'),
    imagePost:"",
    likes:0,
    dislikes:0,
    commentText:"",
    isDisliked:false,
    isLiked:false

  };

  constructor(private fb: FormBuilder,private PostService:PostService, private CommentService: CommentService, private router: Router) { }

  ngOnInit() {
    // Initialize the form and define the form controls with validators
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


  addPost(): void {
    if (this.PostForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('descPost', this.PostForm.get('descPost')?.value);
      formData.append('dateCreation', this.PostForm.get('dateCreation')?.value);

      this.PostService.addPost(formData).subscribe(() => {
        alert("Post added successfully!");
        this.PostForm.reset();
        this.selectedFile = null;
        this.router.navigate(['/get']); 

      }, error => {
        alert("An error occurred while adding the post.");
        console.error(error);
      });
    } else {
      alert("Please fill in all the required fields correctly and select an image.");

    }
  }
  

    }


