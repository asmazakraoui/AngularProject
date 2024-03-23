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

  typeBookOptions: string[]= Object.values(TypeBook);

  constructor(private formBuilder: FormBuilder, private bookService: BookService){
    this.bookForm = this.formBuilder.group({
      titreBook: ['',Validators.required],
      typeBook: ['', Validators.required],
      pdfBook: ['', Validators.required], 
      authorName: [null,Validators.required]
    });
  }

  addBook(): void {
    if (this.bookForm.valid){
      const newBook : Book = { ...this.bookForm.value };

      this.bookService.addBook(newBook).subscribe(()=>{
        alert("Book Aded");
        this.bookForm.reset();
      }, 
      error => {
        alert("An error occurred while adding Event");
        console.error(error);
      }
      );
    }else {
      alert("Please fill in all the required fields");
    }
  }

  cancelAdd(): void {
    this.bookForm.reset();
  }


}
