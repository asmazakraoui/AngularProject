import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, TypeBook } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {
  bookForm: FormGroup;
  selectedFile: File | null = null;
  selectedBook: File | null=null;

  typeBookOptions: string[]= Object.values(TypeBook);

  constructor(private formBuilder: FormBuilder, private bookService: BookService){
    this.bookForm = this.formBuilder.group({
      titreBook: ['',Validators.required],
      //imageBook: ['',Validators.required],
      typeBook: ['', Validators.required],
     // pdfBook: ['', Validators.required], 
      authorName: [null,Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onFileSelectedBook(event: any): void {
    this.selectedBook = event.target.files[0];
  }

/*
  addBook(): void {
    if (this.bookForm.valid && this.selectedFile && this.selectedBook){
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('file', this.selectedBook);

      const titreBook = this.bookForm.get('titreBook')?.value; 
      const typeBook = this.bookForm.get('typeBook')?.value;
      const authorName = this.bookForm.get('authorName')?.value;

      if (titreBook && typeBook && authorName){
        formData.append('titreBook', titreBook);
        formData.append('typeBook', typeBook);
        formData.append('authorName', authorName);
      }else {
        console.error("One or more form values are null.");
        return;
      }

      this.bookService.addBook(formData).subscribe(()=>{
        alert("Book Aded successfully");
        this.bookForm.reset();
        this.selectedFile = null;
        this.selectedBook = null;
      }, 
      error => {
        alert("An error occurred while adding Book");
        console.error(error);
      }
      );
    }else {
      alert("Please fill in all the required fields");
    }
  }*/
  addBook(): void {
    if (this.bookForm.valid && this.selectedFile && this.selectedBook) {
      const formData = new FormData();
      formData.append('imageBook', this.selectedFile);
      formData.append('pdfBook', this.selectedBook);
  
      const titreBook = this.bookForm.get('titreBook')?.value; 
      const typeBook = this.bookForm.get('typeBook')?.value;
      const authorName = this.bookForm.get('authorName')?.value;
  
      formData.append('titreBook', titreBook);
      formData.append('typeBook', typeBook);
      formData.append('authorName', authorName);
  
      this.bookService.addBook(formData).subscribe(
        () => {
          alert("Book added successfully");
          this.bookForm.reset();
          this.selectedFile = null;
          this.selectedBook = null;
        },
        (error) => {
          alert("An error occurred while adding the book");
          console.error(error);
        }
      );
    } else {
      alert("Please fill in all the required fields");
    }
  }
  

  cancelAdd(): void {
    this.bookForm.reset();
  }


}
