import { Component, OnInit } from '@angular/core';
import { Diagnostic } from 'src/app/model/Diagnostic';
import { DiagnosticService } from '../../Services/diagnostic.service';

@Component({
  selector: 'app-all-diagnostic',
  templateUrl: './all-diagnostic.component.html',
  styleUrls: ['./all-diagnostic.component.css']
})
export class AllDiagnosticComponent implements OnInit{
  diagnostics: Diagnostic[] = [];
  constructor(private diagnosticService: DiagnosticService) { }

  ngOnInit(): void {
    this.loadDiagnostics();
    
  }

  loadDiagnostics(): void {
    this.diagnosticService.findAllDiagnostics().subscribe(diagnostics => {
      this.diagnostics = diagnostics;
    });
  }

  deleteDiagnostic(id:number): void {
    this.diagnosticService.deleteDiagnostic(id).subscribe(() : void => {
      this.loadDiagnostics();
    });
  }
  
  getDiagnosticsSortedByDateAscending(): void {
    console.log("asc");
    this.diagnosticService.getDiagnosticsSortedByDateAscending().subscribe(
      diagnostics => this.diagnostics = diagnostics,
      error => console.error(error)
    );
  }

  getDiagnosticsSortedByDateDescending(): void {
    console.log("desc");
    this.diagnosticService.getDiagnosticsSortedByDateDescending().subscribe(
      diagnostics => this.diagnostics = diagnostics,
      error => console.error(error)
    );
  }

}
