
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../ServiceLibrary/library.service';
import { Library } from 'src/app/models/library';


@Component({
  selector: 'app-add-library',
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.css']
})
export class AddLibraryComponent  {
  
  libraryForm: FormGroup;

  constructor( private formBuilder: FormBuilder,private libraryService : LibraryService){
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

  cancelEdit(): void {
    this.libraryForm.reset();
  }

  getUserIdFromLocalStorge():number {
    const id= localStorage.getItem('id');
    return id ? parseInt(id, 10) : 0 ;
    }
  
}

