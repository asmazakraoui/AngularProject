//import { Comment } from './../models/comment';
import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { CommentService } from '../Services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@angular/compiler';
@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit{
commentForm!: FormGroup;
id: any;

constructor(private formBuilder: FormBuilder, private CommentService: CommentService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log('ID:', this.id);  // Vérifie l'ID dans la console
    this.commentForm = this.formBuilder.group({
      descCmnt: ['', Validators.required],
      dateCmnt: ['', [Validators.required, Validators.min(0)]],
    });
  
    this.getCommentById();
  }

  getCommentById() {
    this.CommentService.getCommentById(this.id).subscribe((res) => {
      console.log('Comment data:', res);  // Vérifie la structure des données dans la console
      this.commentForm.patchValue(res);
    });
  }

  updateComment(): void {
    this.CommentService.updateComment(this.id, this.commentForm.value).subscribe(
      () => {
        alert('Comment updated!');
        this.commentForm.reset();
      },
      (error) => {
        console.error('Error updating comment:', error);
        // Handle errors
      }
    );}

}
