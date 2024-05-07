import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Library } from 'src/app/models/library';
import { LibraryService } from '../ServiceLibrary/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddlibFrontComponent } from '../addlib-front/addlib-front.component';
import { UplibrayFrontComponent } from '../uplibray-front/uplibray-front.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css']
})
export class MylibraryComponent implements OnInit {
 librarys: Library[] = [] ;
 //librarys!: MatTableDataSource<Library>;
 //@ViewChild(MatPaginator) paginator!: MatPaginator;
 displayedColumns: string[] = ['titre favoris', 'actions'];
  books: Book[]=[]; 
  userId!: number;
  constructor(private libraryService: LibraryService, private dialog: MatDialog){}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorge()
    if (userId){
      this.loadLibraryByIdUser(userId);
    }
  }

  loadLibraryByIdUser(userId:number): void{
    this.libraryService.getLibrariesByUserId(userId).subscribe(
      (librarys: Library[]) => {
        this.librarys= librarys;
      },
      (error)=> {
        console.error('Error fetching Librarys',error);
      }
    );
  }

  // loadLibraryByIdUser(userId:number): void{
  //   this.libraryService.getLibrariesByUserId(userId).subscribe(
  //     (librarys: Library[]) => {
  //       this.librarys= new MatTableDataSource<Library>(librarys);
  //       this.librarys.paginator = this.paginator; 
  //     },
  //     (error)=> {
  //       console.error('Error fetching Librarys',error);
  //     }
  //   );
  // }
  deleteLibraryy(id:number):void{
    this.libraryService.deleteLibrary(id).subscribe(()=>{
      this.loadLibraryByIdUser(this.getUserIdFromLocalStorge());
    });
  }



  getUserIdFromLocalStorge():number {
    const id= localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0 ;
    }

    showBooks(id:number):void{
      this.libraryService.getBooksByLibraryId(id).subscribe(
        (books: Book[])=>{
          this.books=books;
          console.log('Books du favoris :',this.books);
        },
        (error)=> {
          console.error('Error fetching Books:',error);
        }
      );
    }

    openAddLib(enteranimation: any, exitanimation: any, code: any) {
      const dialogRef = this.dialog.open(AddlibFrontComponent , {
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
          this.loadLibraryByIdUser(this.userId);
        }
      });
    }

    openUpdateLib(library: Library): void {
      const dialogRef = this.dialog.open(UplibrayFrontComponent, {
        data: { library: library }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
        }
      });
    }  

   
}
