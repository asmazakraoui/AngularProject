import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../ServiceLibrary/library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-up-library',
  templateUrl: './up-library.component.html',
  styleUrls: ['./up-library.component.css']
})
export class UpLibraryComponent implements OnInit {
  libraryForm!: FormGroup ; 
  id: any;

  constructor(private formBuilder: FormBuilder, private libraryService : LibraryService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.libraryForm= this.formBuilder.group({
      ttLibrary: ['',Validators.required]
    });
  }

  updateLibrary(): void{
    this.libraryService.updateLibrary(this.id, this.libraryForm.value).subscribe(()=>{
      alert("Library Updated");
      this.libraryForm.reset();
    });
  }

}
