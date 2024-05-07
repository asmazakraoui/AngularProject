import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffectbookTofavppComponent } from '../affectbook-tofavpp/affectbook-tofavpp.component';

@Component({
  selector: 'app-bookfront-aff',
  templateUrl: './bookfront-aff.component.html',
  styleUrls: ['./bookfront-aff.component.css']
})
export class BookfrontAffComponent implements OnInit{

  favorisForm!: FormGroup;
  books: Book[]= [];

  constructor(private bookService: BookService , private dialog: MatDialog, private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.loadBooks();
    this.initFavorisForm();
  }
  initFavorisForm() {
    this.favorisForm = this.formBuilder.group({
      nomFav: ['', Validators.required]
    });
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
  
  getPodcastUrl(book: Book): string {
    return `http://localhost/Uploads/PDFs/${book.pdfBook}`;
  }


  

 openBookDetail(bookkk: Book): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
     //width: '1000px', // Définissez la largeur du popup selon vos besoins
     //height: '300px', // Modifier la hauteur selon vos besoins
      data: { book: bookkk } // Transmettez les détails de l'événement au composant de dialogue
    });
  }

 
  openAddToFavorisPopup(book: Book): void {
    const dialogRef = this.dialog.open(AffectbookTofavppComponent, {
      data: { book: book } // Passer le livre sélectionné
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle result
        console.log(result);
      }
    });
  }
  


}
