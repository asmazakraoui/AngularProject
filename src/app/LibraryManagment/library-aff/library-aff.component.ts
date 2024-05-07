import { Component, OnInit } from '@angular/core';
import { Library } from 'src/app/models/library';
import { LibraryService } from '../ServiceLibrary/library.service';

@Component({
  selector: 'app-library-aff',
  templateUrl: './library-aff.component.html',
  styleUrls: ['./library-aff.component.css']
})
export class LibraryAffComponent implements OnInit {
  librarys: Library[] = [];


  constructor(private libraryService : LibraryService){}



  ngOnInit(): void {
    this.loadLibrarys();
  }

  loadLibrarys(): void{
    this.libraryService.getAllLibrary().subscribe(
      (librarys: Library[]) => {
        this.librarys = librarys
      },
      (error) => {
        console.error('Error fetching Librarys', error);
      }
    );
  }

  deleteLibrary(id: number) : void {
    this.libraryService.deleteLibrary(id).subscribe(() : void => {
      this.loadLibrarys();
    } )
  }

}
