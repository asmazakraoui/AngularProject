import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../ServiceLibrary/library.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Library } from 'src/app/models/library';

@Component({
  selector: 'app-addlib-front',
  templateUrl: './addlib-front.component.html',
  styleUrls: ['./addlib-front.component.css']
})
export class AddlibFrontComponent {

  libraryForm!: FormGroup;

  constructor( private formBuilder: FormBuilder,private libraryService : LibraryService,public DialogRef: MatDialogRef<AddlibFrontComponent>){
    this.libraryForm = this.formBuilder.group({
      ttLibrary: ['',Validators.required]
    });
  }

  addLibrary(): void{
    if (this.libraryForm.valid){
      // const newLibrary : Library = this.libraryForm.value as Library ;
      const newLibrary : Library = {...this.libraryForm.value,
        iidduuser: this.getUserIdFromLocalStorge()};
      
      this.libraryService.addLibrary(newLibrary).subscribe(()=>{
        alert("Library Added");
        this.libraryForm.reset();
        console.log(newLibrary);
      },
      error => {
        alert("An error occurred while adding Library");
        console.error(error);
      }
      );
    } else {
      alert("Please fill in all the required fields");
    }
  }

  onCancel() {
    this.DialogRef.close();
    
  }

  getUserIdFromLocalStorge():number {
    const id= localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0 ;
    }
  
}



