import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from '../ServiceBook/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookAddComponent } from '../book-add/book-add.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-book-aff',
  templateUrl: './book-aff.component.html',
  styleUrls: ['./book-aff.component.css']
})
export class BookAffComponent implements OnInit {
  books: Book[] = [];
  titrebookBO : any;
  totalBook: any ; 

  showUpdateBookModal: boolean = false;
  bookIdToUpdate!: number;



  constructor(private bookService: BookService , private dialog: MatDialog){}


  ngOnInit(): void {
    this.loadBooks();
  }
  openUpdateEvent(bookID:number){
    this.bookIdToUpdate = bookID;
    this.showUpdateBookModal = true;
  }

  closeUpdatePodcastModal(){
    this.showUpdateBookModal= false;
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
  
  openAddBOOK(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(BookAddComponent , {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        empcode: code
      },
      panelClass: 'center-dialog'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadBooks();
      }
    });
  }

 openBookDetail(bookkk: Book): void {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
     // width: '1000px', // Définissez la largeur du popup selon vos besoins
     // height: '300px', // Modifier la hauteur selon vos besoins
      data: { book: bookkk } // Transmettez les détails de l'événement au composant de dialogue
    });
  }
  /*
  searchEvents(keyword: string): void {
    if (keyword.trim()) {
      this.eventservice.searchEventBack(keyword).subscribe(
        (events: Event[]) => {
          this.events = events;
          this.totalEvent = events.length;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.loadEvents(); // Load all events if keyword is empty
    }
  }
 
  */
  searchBooks(keyword: string): void {
    if (keyword.trim()) {
      this.bookService.searchBookBack(keyword).subscribe(
        (books: Book[]) => {
          this.books = books;
          this.totalBook = books.length;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.loadBooks(); // Load all events if keyword is empty
    }
  }

 

}
