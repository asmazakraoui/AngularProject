import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { LibraryService } from '../ServiceLibrary/library.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-bookoflibrary',
  templateUrl: './bookoflibrary.component.html',
  styleUrls: ['./bookoflibrary.component.css']
})
export class BookoflibraryComponent implements OnInit {
  id:any;
  books:Book[]=[];
  errorDownloadingPDF: boolean = false;

  constructor(private libraryService : LibraryService, private activateRout : ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.activateRout.snapshot.params['id'];
    this.showBooks();
  }

  getImageUrl(book: Book): string {
    return `http://localhost/Uploads/Images/${book.imageBook}`;
    
  }

  downloadPdf(fileName: string): void {
    this.libraryService.downloadPdf(fileName).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Ouvre le PDF dans un nouvel onglet
      },
      error => {
        console.error('Error downloading PDF:', error);
        // Gérer l'erreur ici
      }
    );
  }

  showBooks():void{
    this.libraryService.getBooksByLibraryId(this.id).subscribe(
      (books: Book[])=>{
        this.books=books;
        console.log('Books du favoris :',this.books);
      },
      (error)=> {
        console.error('Error fetching Books:',error);
      }
    );
  }
  //// delite from lib 
  DeleteBookFromLIB(idBook:number):void{
    this.libraryService.deleteBookFromLibrary(this.id, idBook).subscribe(
      (library:any)=>{
        console.log('book suprimer du library:',library);
        this.showBooks();
      },
      (err)=> {
        console.error('Error deleting book from library', err);
        
      }
    );
  }



  // downloadPDF(fileName: string) {
  //   this.libraryService.downloadPDF(fileName).subscribe(response => {
  //     const blob = response.body;
  //     if (blob) { // Check if the blob is not null
  //       const blobUrl = window.URL.createObjectURL(blob);
  //       const anchor = document.createElement('a');
  //       anchor.href = blobUrl;
  //       anchor.download = fileName;
  //       anchor.click();
  //       window.URL.revokeObjectURL(blobUrl);
  //     }
  //   });
  // }

}
