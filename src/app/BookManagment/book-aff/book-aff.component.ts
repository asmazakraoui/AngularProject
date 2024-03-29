import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';

@Component({
  selector: 'app-book-aff',
  templateUrl: './book-aff.component.html',
  styleUrls: ['./book-aff.component.css']
})
export class BookAffComponent implements OnInit {
  books: Book[]= [];

  constructor(private bookService: BookService){}


  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBook().subscribe(
      (books: Book[]) => {
        this.books = books
      },
      (err) =>{
        console.error('Error fetching Books:', err);
      }
    );
  }
  getImageUrl(book: Book): string {
    return `http://localhost/Uploads/Images/${book.imageBook}`;
  }

  deleteBook(id:number): void {
    this.bookService.deleteBook(id).subscribe((): void => {
      this.loadBooks();
    });
  }

}
