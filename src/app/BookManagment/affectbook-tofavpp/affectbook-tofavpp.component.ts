
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';

@Component({
  selector: 'app-affectbook-tofavpp',
  templateUrl: './affectbook-tofavpp.component.html',
  styleUrls: ['./affectbook-tofavpp.component.css']
})
export class AffectbookTofavppComponent {
  LibraryForm!: FormGroup;
  book: Book;

  constructor(
    public dialogRef: MatDialogRef<AffectbookTofavppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.book = data.book; // Récupérer le livre passé en data
    this.initLibraryForm();
  }

  initLibraryForm() {
    this.LibraryForm = this.formBuilder.group({
      ttLibrary: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  

  addBookToLibrary(bookId: number): void {
    const libraryName = this.LibraryForm.value.ttLibrary;
    if (libraryName.trim() === '') {
      return; // Do not proceed if library name is empty
    }
    this.bookService.addBookToLibrary(bookId, libraryName).subscribe(
      (result) => {
        // Book added to library successfully
        console.log('Book added to library:', result);
        // Close the dialog
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error adding book to library:', error);
        // Handle error
        // Optionally, you can display an error message to the user
      }
    );
  }


  


  }
  
  
  
  



  


