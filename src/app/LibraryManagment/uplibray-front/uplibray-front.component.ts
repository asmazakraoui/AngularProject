import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../ServiceLibrary/library.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Library } from 'src/app/models/library';

@Component({
  selector: 'app-uplibray-front',
  templateUrl: './uplibray-front.component.html',
  styleUrls: ['./uplibray-front.component.css']
})
export class UplibrayFrontComponent  implements OnInit {
  library!:Library;
  libraryForm!: FormGroup;
 

  constructor( private formBuilder: FormBuilder,
     private libraryService: LibraryService, 
     public dialogRef: MatDialogRef<UplibrayFrontComponent>,
     @Inject(MAT_DIALOG_DATA) public data: {library: Library}
    ){}



  ngOnInit(): void {
    this.library = this.data.library;
    this.initializeForm();
  }

  initializeForm(): void {
    this.libraryForm = this.formBuilder.group({
      ttLibrary: [this.library.ttLibrary, Validators.required]
      
    });
  }

  
  updateTtLibrary():void{
    if ( this.libraryForm.valid){
      const updatedLib = this.libraryForm.value.ttLibrary;
      this.libraryService.updateTtLibrary(this.library.idLibrary, updatedLib).subscribe(()=>{
        alert("Name library is Updated");
        this.dialogRef.close();
      });
    }
     
  }

  onCancel() {
    this.dialogRef.close();
  }
}
