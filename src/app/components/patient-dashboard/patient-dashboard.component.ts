import { Component, OnInit} from '@angular/core';
import { KeyValue } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';
import { MedicamentService } from '../../Services/medicament.service';
import { Medicament } from '../../model/medicament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/model/report';
import { ReportService } from 'src/app/Services/report.service';
import { RegimeAlimentaire } from '../../model/regime alimentaire';
import { RegimealimentaireService } from '../../Services/regimealimentaire.service';
import { CalendarService } from 'src/app/Services/calendar-patient.service';
import { Calendar } from 'src/app/model/calendarModel';
import { DiagnosticService } from 'src/app/Services/diagnostic.service';
import { Diagnostic } from 'src/app/model/Diagnostic';
import { TypeDiagnostic } from 'src/app/model/TypeDiagnostic';




@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  providers: [DatePipe]
  
})
export class PatientDashboardComponent implements OnInit {
  reports: Report[];
  medicines: Medicament[];
  regimes: RegimeAlimentaire[];
  todayMeetingsCount: number = 0;
  calendars: Calendar[];
  diagnostics: Diagnostic[];
  addDiagnosticDialog: boolean = false;
  updateDiagnosticDialog: boolean = false;
  diagnosticToUpdate!: Diagnostic;
  diagnosticForm!: FormGroup;
  updateDiagnosticForm!: FormGroup;
  selectedDiagnostic!: Diagnostic;
  TypeDiagnostic = [
    { label: 'Diabete', value: TypeDiagnostic.Diabete },
    { label: 'tension', value: TypeDiagnostic.tension },
    { label: 'oxygene', value: TypeDiagnostic.oxygene },
  ];
  
 regimeAlimentaireOptions: any[];
 
 


  userId = 1; 

  selectedMedicineFilter: string = '';
  selectedReportFilter: string = '';
  selectedRegimeFilter: string = '';
  selectedDiagnosticFilter: string = '';
  selectedCalendarFilter: string = '';


  constructor(
    private reportService: ReportService,
    private medicineService: MedicamentService,
    private regimeService: RegimealimentaireService,
    private calendarService: CalendarService,
    private diagnosticService: DiagnosticService,
    private fb: FormBuilder,
    private datePipe: DatePipe
    
  ) { 
    

  
  }

  ngOnInit(): void {
    this.getReports();
    this.getMedicines();
    this.getRegimes();
    this.getCalendars();
    this.getDiagnostics();
    this.diagnosticForm = this.fb.group({
      typeDiagnostic: ['', Validators.required],
      dateDiag: ['', Validators.required],
      numDiag: ['', Validators.required],
    });
    this.updateDiagnosticForm = this.fb.group({
      typeDiagnostic: ['', Validators.required],
      dateDiag: ['', Validators.required],
      numDiag: ['', Validators.required],
    });
    
  }

  getReports() {
    this.reportService.getReportsByUserId(this.userId).subscribe(reports => {
      this.reports = reports;
    });
  }

  getMedicines() {
    this.medicineService.getMedicinesByUserId(this.userId).subscribe(medicines => {
      this.medicines = medicines;
    });
  }

  getRegimes() {
    this.regimeService.getRegimesByUserId(this.userId).subscribe(regimes => {
      this.regimes = regimes;
    });
  }

  getCalendars() {
    this.calendarService.getCalendarsByUserId(this.userId).subscribe(calendars => {
      this.calendars = calendars;
      this.checkTodaysMeetings();
    });
  }

  checkTodaysMeetings() {
    const today = new Date();
    const formattedToday = this.datePipe.transform(today, 'yyyy-MM-dd');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
  
    const todayMeetingsCount = this.calendars.filter(calendar => {
      const formattedSelectedDate = this.datePipe.transform(calendar.selectedDate, 'yyyy-MM-dd');
      return formattedSelectedDate === formattedToday && calendar.status === 'APPROVED';
    }).length;
  
    const tomorrowMeetingsCount = this.calendars.filter(calendar => {
      const formattedSelectedDate = this.datePipe.transform(calendar.selectedDate, 'yyyy-MM-dd');
      return formattedSelectedDate === formattedTomorrow && calendar.status === 'APPROVED';
    }).length;
  
    let message = '';
    if (todayMeetingsCount > 0 || tomorrowMeetingsCount > 0) {
      message += `You have ${todayMeetingsCount} meeting(s) today.`;
      if (tomorrowMeetingsCount > 0) {
        message += ` You also have ${tomorrowMeetingsCount} meeting(s) tomorrow.`;
      }
    }
  
    if (message !== '') {
      alert(message);
    }
  }
  
  
  getDiagnostics() {
    this.diagnosticService.getDiagnosticsByUserId(this.userId).subscribe(diagnostics => {
      this.diagnostics = diagnostics;
    });
  }

  getTypeDiagnosticValues(): { label: string; value: TypeDiagnostic }[] {
    return this.TypeDiagnostic;
  }
   
  openDiagnosticDialog() {
    this.addDiagnosticDialog = true;
  
  }


  openUpdateDiagnosticDialog(diagnostic: Diagnostic) {
    this.updateDiagnosticDialog = true;
    this.diagnosticToUpdate = diagnostic;
    this.selectedDiagnostic = diagnostic;
    this.updateDiagnosticForm.patchValue({
      typeDiagnostic: diagnostic.typeDiagnostic,
      dateDiag: diagnostic.dateDiag,
      numDiag: diagnostic.numDiag,
    });
  }
  


  hideDiagnosticDialog() {
    this.addDiagnosticDialog = false;
  }

  hideUpdateDiagnosticDialog() {
    this.updateDiagnosticDialog = false;
  }

  addDiagnostic() {
    const diagnosticData = new FormData();
    diagnosticData.append('typeDiagnostic', this.diagnosticForm.get('typeDiagnostic')?.value);
    diagnosticData.append('dateDiag', this.diagnosticForm.get('dateDiag')?.value);
    diagnosticData.append('numDiag', this.diagnosticForm.get('numDiag')?.value);

    console.log('Diagnostic data:', diagnosticData);
    console.log('User ID:', this.userId);

    this.diagnosticService.createDiagnostic(diagnosticData, this.userId).subscribe(diagnostic => {
      this.diagnostics.push(diagnostic);
      this.hideDiagnosticDialog();
    });
  }
   
   

  updateDiagnostic() {
    if (this.selectedDiagnostic) {
      const updatedDiagnostic: Diagnostic = {
        idDiag: this.selectedDiagnostic.idDiag,
        typeDiagnostic: this.updateDiagnosticForm.get('typeDiagnostic')?.value,
        dateDiag: this.updateDiagnosticForm.get('dateDiag')?.value,
        numDiag: this.updateDiagnosticForm.get('numDiag')?.value,
      };
  
      this.diagnosticService.updateDiagnosticc(updatedDiagnostic.idDiag, this.userId, updatedDiagnostic).subscribe(diagnostic => {
        const index = this.diagnostics.findIndex(d => d.idDiag === diagnostic.idDiag);
        if (index !== -1) {
          this.diagnostics[index] = diagnostic;
        }
        this.hideUpdateDiagnosticDialog();
      });
    } else {
      console.error('Selected diagnostic is undefined');
    }
  }
  
  

  deleteDiagnostic(diagnostic: Diagnostic) {
    this.diagnosticService.deleteDiagnostic(diagnostic.idDiag).subscribe(() => {
      this.diagnostics = this.diagnostics.filter(d => d.idDiag !== diagnostic.idDiag);
    });
  }
  

  getImageUrlmed(medicine: Medicament): string {
    return `http://localhost/images/${medicine.imageMed}`;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
      case 'on_progress':
        return 'in-progress';
      default:
        return '';
    }
  }

  downloadPdfReport(reportId: number): void {
    this.reportService.downloadPdfReport(reportId).subscribe(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    });
  }


  sortMedicines(order: string) {
    if (order === 'asc') {
      this.medicines.sort((a, b) => a.nomMed.localeCompare(b.nomMed));
    } else if (order === 'des') {
      this.medicines.sort((a, b) => b.nomMed.localeCompare(a.nomMed));
    }
  }
  
  sortReports(order: string) {
    if (order === 'asc') {
      this.reports.sort((a, b) => new Date(a.dateReport).getTime() - new Date(b.dateReport).getTime());
    } else if (order === 'des') {
      this.reports.sort((a, b) => new Date(b.dateReport).getTime() - new Date(a.dateReport).getTime());
    }
  }
  
  sortRegimes(order: string) {
    if (order === 'asc') {
      this.regimes.sort((a, b) => a.typeRegime.localeCompare(b.typeRegime));
    } else if (order === 'des') {
      this.regimes.sort((a, b) => b.typeRegime.localeCompare(a.typeRegime));
    }
  }
  
  sortDiagnostics(order: string) {
    if (order === 'asc') {
      this.diagnostics.sort((a, b) => new Date(a.dateDiag).getTime() - new Date(b.dateDiag).getTime());
    } else if (order === 'des') {
      this.diagnostics.sort((a, b) => new Date(b.dateDiag).getTime() - new Date(a.dateDiag).getTime());
    }
  }


  sortCalendars(order: string) {
    if (order === 'asc') {
      this.calendars.sort((a, b) => new Date(a.selectedDate).getTime() - new Date(b.selectedDate).getTime());
    } else if (order === 'des') {
      this.calendars.sort((a, b) => new Date(b.selectedDate).getTime() - new Date(a.selectedDate).getTime());
    }
  }
  
  
}