import { PostService } from './../Services/post.service';
import { Post } from '../models/Post';
import { Component, OnInit } from '@angular/core';
//import { Post } from '../models/post';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { PostService } from '../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit{
  postForm!: FormGroup;
  id: any;

  constructor(private formBuilder: FormBuilder, private PostService: PostService, private activatedRoute: ActivatedRoute
    , private router: Router) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('ID:', this.id);  // Vérifie l'ID dans la console
    this.postForm = this.formBuilder.group({
      descPost: ['', Validators.required],
      dateCreation: ['', [Validators.required, Validators.min(0)]],
      imagePost: ['', Validators.required],
    });
  
    this.getPostById();
  }

  
  getPostById() {
    this.PostService.getPostById(this.id).subscribe((res) => {
      console.log('Post data:', res);  // Vérifie la structure des données dans la console
      this.postForm.patchValue(res);
    });
  }

 /* updatePost(): void {
    this.PostService.updatePost(this.id, this.postForm.value).subscribe(() => {
      alert("Post updated!");
      this.postForm.reset();
      this.router.navigate(['/get']);
    });
    
  }*/
  selectedFile: File | null = null;
  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
  }
  updatePost(): void {
    if (this.postForm.valid && this.selectedFile) {
      const formData = new FormData();
      
      // Add the selected file
      formData.append('file', this.selectedFile);

      // Add other form data
      formData.append('descPost', this.postForm.get('descPost')?.value);
      formData.append('dateCreation', this.postForm.get('dateCreation')?.value);

      this.PostService.updatePost(this.id, formData).subscribe(() => {
        console.log("update");
        alert("Post updated successfully!");
        this.postForm.reset();
        this.router.navigate(['/get']);
        this.selectedFile = null;
      }, error => {
        alert("An error occurred while updating Post.");
        console.error(error);
      });
    } else {
      alert("Please fill in all the required fields correctly and select an image.");
    }
  }
}
