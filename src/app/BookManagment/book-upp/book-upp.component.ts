import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../ServiceBook/book.service';
import { TypeBook } from 'src/app/models/book';
import { Podcast } from 'src/app/models/podcast';
import { BookAffComponent } from '../book-aff/book-aff.component';

@Component({
  selector: 'app-book-upp',
  templateUrl: './book-upp.component.html',
  styleUrls: ['./book-upp.component.css']
})
export class BookUppComponent implements OnInit {
  bookForm!: FormGroup;
  id: any;
  selectedFile: File | null = null;
  selectedPdf: File | null = null;
  typeBookOptions: string[] = Object.values(TypeBook);
  @Input() bookIdToUpdate: any | undefined ;
  @Output() close = new EventEmitter<void>();


  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private bookAffComponent : BookAffComponent
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.bookForm = this.formBuilder.group({
      titreBook: ['', Validators.required],
      typeBook: ['', Validators.required],
      //pdfBook: ['', Validators.required],
      authorName: [null, Validators.required]
    });
    if (this.bookIdToUpdate) {
      this.id = this.bookIdToUpdate;
      this.getBookById();
    }

    // Charger les données du livre à modifier
    
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onFileSelectedPdf(event: any): void {
    this.selectedPdf = event.target.files[0];
  }
  getBookById():void{
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
    if (this.bookForm.valid && this.selectedFile && this.selectedPdf ) {
      const formData = new FormData();
      formData.append('titreBook', this.bookForm.get('titreBook')?.value);
      formData.append('typeBook', this.bookForm.get('typeBook')?.value);
      formData.append('file', this.selectedFile);
      formData.append('pdfBook', this.selectedPdf)
      formData.append('authorName', this.bookForm.get('authorName')?.value);
      
      console.log(formData);
  
      this.bookService.updateBook(this.id, formData).subscribe(() => {
        console.log("Book updated successfully!");
        alert("Book updated successfully!");
        this.bookForm.reset();
        this.selectedFile= null;
        this.close.emit();
        this.bookAffComponent.loadBooks();
      }, error => {
        console.error("An error occurred while updating Book:", error);
        alert("An error occurred while updating Book.");
      });
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  }
  onClose() {
    this.close.emit();
  }
}

