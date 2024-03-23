/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../ServiceBook/book.service';
import { ActivatedRoute } from '@angular/router';
import { TypeBook } from 'src/app/models/book';

@Component({
  selector: 'app-book-upp',
  templateUrl: './book-upp.component.html',
  styleUrls: ['./book-upp.component.css']
})
export class BookUppComponent implements OnInit {

  bookForm!: FormGroup;
  id: any;

  constructor(private formBuilder: FormBuilder, private bookService: BookService,private activatedRoot: ActivatedRoute){}

  typeBookOption: string[]= Object.values(TypeBook);
  ngOnInit(): void {
    this.id = this.activatedRoot.snapshot.params['id'];
    this.bookForm= this.formBuilder.group({
      titreBook: ['',Validators.required],
      typeBook: ['', Validators.required],
      pdfBook: ['', Validators.required], 
      authorName: [null,Validators.required]
    });
  }

  updateBook(): void {
    this.bookService.updateBook(this.id, this.bookForm.value).subscribe(()=>{
      alert("book Updated");
      this.bookForm.reset();
    });
  }

}*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../ServiceBook/book.service';
import { TypeBook } from 'src/app/models/book';
import { Podcast } from 'src/app/models/podcast';

@Component({
  selector: 'app-book-upp',
  templateUrl: './book-upp.component.html',
  styleUrls: ['./book-upp.component.css']
})
export class BookUppComponent implements OnInit {
  bookForm!: FormGroup;
  id: any;
  typeBookOptions: string[] = Object.values(TypeBook);

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.bookForm = this.formBuilder.group({
      titreBook: ['', Validators.required],
      typeBook: ['', Validators.required],
      pdfBook: ['', Validators.required],
      authorName: [null, Validators.required]
    });

    // Charger les données du livre à modifier
    this.bookService.getBookById(this.id).subscribe(
      (book: any) => {
        this.bookForm.patchValue({
          titreBook: book.titreBook,
          typeBook: book.typeBook,
          pdfBook: book.pdfBook,
          authorName: book.authorName
        });
      },
      error => {
        console.error('Error fetching Book:', error);
      }
    );
  }

  updateBook(): void {
    if (this.bookForm.valid) {
      this.bookService.updateBook(this.id, this.bookForm.value).subscribe(() => {
        alert('Book Updated');
        this.bookForm.reset();
      });
    } else {
      alert('Please fill in all the required fields');
    }
  }
}

