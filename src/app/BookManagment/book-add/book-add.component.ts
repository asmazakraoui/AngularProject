import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book, TypeBook } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {
  books: Book [] = [];
  bookForm: FormGroup;
  selectedFile: File | null = null;
  selectedBook: File | null=null;
  siteKey:string = "6Le6P7wpAAAAABm999JF34z50hLi7BYFFHXBtaXS";
  typeBookOptions: string[]= Object.values(TypeBook);

  constructor(private formBuilder: FormBuilder, private bookService: BookService, public dialogRef: MatDialogRef<BookAddComponent>){
    this.bookForm = this.formBuilder.group({
      titreBook: ['',Validators.required],
      typeBook: ['', Validators.required], 
      authorName: [null,Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onFileSelectedBook(event: any): void {
    this.selectedBook = event.target.files[0];
  }

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
          this.loadbook();
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

  loadbook(): void {
    this.bookService.getAllBook().subscribe(
      (books: Book[]) => {
        this.books= books
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
      
    );
  }



  onCancel() {
    this.dialogRef.close();
    this.loadbook();
  }


}
