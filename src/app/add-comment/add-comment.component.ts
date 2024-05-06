import { PostService } from './../Services/post.service';
import { CommentService } from './../Services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Comment } from './../models/comment';
import { Post } from './../models/Post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  CommentForm!: FormGroup;
  comments: Comment[] = [];
  idPost: number;
  commentText: string = '';
  posts: Post[] = [];

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private CommentService: CommentService,
    private router: Router,
    private PostService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPost = +params['idPost']; // Assuming 'idPost' is the parameter name
    });
  
      this.CommentForm = this.fb.group({
        descCmnt: ['', Validators.required],
       // dateCmnt: ['', Validators.required],
       // idPost: [null, Validators.required]  // Add this line to define the 'idPost' control
      });
    
      // Assuming you want to load posts when the component is initialized
      this.loadPosts();
  }

  loadPosts(): void {
    this.PostService.findAll().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  length=0;
  descCmnts:string='';

  onWrite(event:any){
    let regex = /^[a-zA-Z0-9]$/; 
      if (regex.test(event.key) && this.length<70|| event.key===" " && this.length<100) {
        this.length++;
      }else if(event.key === "Backspace" && this.descCmnts.length == 1){
       this.length--;
      }else if(event.key === "Backspace" && this.descCmnts.length > 0){
        this.length--;
      }
      else{
        event.preventDefault();
  
      }
  }
  post:any;
  isLoading=false;

  getPostById() {
    this.PostService.getPostById(this.idPost).subscribe(
      (response) => {
        this.post = response; // Remove .body
        this.post['numberComments'] = this.post.comment.length;
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }
  

 


 createComment() {
  console.log('Form validity:', this.CommentForm.valid);

  if (this.CommentForm.invalid) { // Check if the form is invalid
    return;
  }

  const descCmnt = this.CommentForm.get('descCmnt').value; // Get the value of descCmnt field

  // Assuming this.idPost is already defined somewhere in your component

  this.CommentService.createComment(this.idPost, descCmnt).subscribe(
    (response) => {
      // Reset form values and fetch updated data
      this.CommentForm.reset();
      this.getPostById();
      this.isLoading = false;
    },
    (error) => {
      console.error('Error creating comment:', error);
        this.isLoading = false;
    }
  );
  this.isLoading = true;
}


navigateToPostPage(idPost: number) {
  this.router.navigate(['/post', idPost]);
}



}
