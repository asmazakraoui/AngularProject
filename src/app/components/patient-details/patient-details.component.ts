import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from 'src/models/user';
import { MedicamentService } from '../../Services/medicament.service';
import { Medicament } from '../../model/medicament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/model/report';
import { ReportService } from 'src/app/Services/report.service';
import { RegimeAlimentaire } from '../../model/regime alimentaire';
import { RegimealimentaireService } from '../../Services/regimealimentaire.service';
import { Diagnostic } from 'src/app/model/Diagnostic';
import { DiagnosticService } from 'src/app/Services/diagnostic.service';
import { ReservedDateService } from 'src/app/Services/reserved-date.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  selectedUser: User;
  medicines: Medicament[];
  medicineDialog: boolean = false;
  submitted: boolean = false;
  medicineForm!: FormGroup;
  selectedFile: File | null = null;
  reportDialog: boolean = false;
  reportForm!: FormGroup;
  reports: Report[];
  regimes: RegimeAlimentaire[];
  regimeDialog: boolean = false;
  regimeForm!: FormGroup;
  updateRegimeDialog: boolean = false;
  updateRegimeForm!: FormGroup;
  regimeToUpdate!: RegimeAlimentaire;
  userId!: any;
  updateMedicamentDialog: boolean = false;
  medicamentToUpdate!: Medicament; 
  updateMedicamentForm!: FormGroup;
  reportToUpdate!: Report;
  updateReportForm!: FormGroup;
  selectedReport!: Report;
  updateReportDialog: boolean = false;
  diagnostics: Diagnostic[];
  selectedDate: string;
  selectedMedicineFilter: string = '';
  selectedReportFilter: string = '';
  selectedRegimeFilter: string = '';
  selectedDiagnosticFilter: string = '';



  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private medicamentService: MedicamentService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private regimeService: RegimealimentaireService,
    private diagnosticService: DiagnosticService,
    private reservedDateService: ReservedDateService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.retrieveUser(id).subscribe((user) => {
      console.log('User details:', user);
      this.selectedUser = user;
      this.fetchMedicines(user.id);
      this.fetchReports(user.id);
      this.fetchRegimes(user.id);
      this.fetchDiagnostics(user.id);
    });

    this.medicineForm = this.fb.group({
      nomMed: ['', Validators.required],
      nbrDoses: ['', Validators.required],
      nbrPelJour: ['', Validators.required],
      durreTrait: ['', Validators.required],
      imageFile: ['', Validators.required],
    });

    this.reportForm = this.fb.group({
      dateReport: ['', Validators.required],
      descriptionReport: ['', Validators.required],
      resultatReport: ['', Validators.required],
    });

    this.regimeForm = this.fb.group({
      typeRegime: ['', Validators.required],
      descriptionRegime: ['', Validators.required],
   });

   this.updateRegimeForm = this.fb.group({
    typeRegime: ['', Validators.required],
    descriptionRegime: ['', Validators.required],
 });

 this.updateMedicamentForm = this.fb.group({
  nomMed: ['', Validators.required],
  nbrDoses: ['', Validators.required],
  nbrPelJour: ['', Validators.required],
  durreTrait: ['', Validators.required],
});
this.updateReportForm = this.fb.group({
  dateReport: ['', Validators.required],
  descriptionReport: ['', Validators.required],
  resultatReport: ['', Validators.required],
});


   
  }

  addDate() {
    if (this.selectedDate && this.selectedUser.id) {
      this.reservedDateService.addUnavailableDate(this.selectedDate, this.selectedUser.id).subscribe(
        response => {
          console.log('Date added successfully!');
          alert('Reserved Date added successfully!');
        },
        error => {
          console.error('Error adding date:', error);
        }
      );
    }
  }


  

  fetchMedicines(userId: number) {
    this.medicamentService.getMedicinesByUserId(userId).subscribe((medicines) => {
      this.medicines = medicines.map(medicine => {
        return {
          ...medicine,
          imageUrl: `http://localhost/images/${medicine.imageMed}` 
        };
      });
    });
  }

  getImageUrl(user: User): string {
    return `http://localhost/images/${user.imageUser}`;
  }

  getImageUrlmed(medicine: Medicament): string {
    return `http://localhost/images/${medicine.imageMed}`;
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  openMedicineDialog() {
    this.medicineDialog = true;
  }

  hideMedicineDialog() {
    this.medicineDialog = false;
    this.submitted = false;
  }

  addMedicine() {
    this.submitted = true;
  
    if (this.medicineForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('nomMed', this.medicineForm.get('nomMed')?.value);
    formData.append('nbrDoses', this.medicineForm.get('nbrDoses')?.value);
    formData.append('nbrPelJour', this.medicineForm.get('nbrPelJour')?.value);
    formData.append('durreTrait', this.medicineForm.get('durreTrait')?.value);
    formData.append('imageFile', this.selectedFile);
  
    this.medicamentService.addMedicament(formData, this.selectedUser.id).subscribe(
      (response) => {
        console.log('Medicine added:', response);
        this.fetchMedicines(this.selectedUser.id); 
        this.hideMedicineDialog();
      },
      (error) => {
        console.error('Error adding medicine:', error);
      }
    );
  }

  openUpdateMedicamentDialog(medicament: Medicament) {
    this.updateMedicamentDialog = true;
    this.medicamentToUpdate = medicament;
    this.updateMedicamentForm.patchValue({
      nomMed: medicament.nomMed,
      nbrDoses: medicament.nbrDoses,
      nbrPelJour: medicament.nbrPelJour,
      durreTrait: medicament.durreTrait,
    });
  }
  
  hideUpdateMedicamentDialog() {
    this.updateMedicamentDialog = false;
    this.submitted = false;
  }

  updateMedicament() {
    this.submitted = true;
  
    if (this.updateMedicamentForm.invalid) {
      return;
    }
  
    const medicamentData: Medicament = {
      idMed: this.medicamentToUpdate.idMed,
      nomMed: this.updateMedicamentForm.get('nomMed')?.value,
      nbrDoses: this.updateMedicamentForm.get('nbrDoses')?.value,
      nbrPelJour: this.updateMedicamentForm.get('nbrPelJour')?.value,
      durreTrait: this.updateMedicamentForm.get('durreTrait')?.value,
      imageUrl: this.medicamentToUpdate.imageUrl, 
      idUser: this.selectedUser.id,
      imageMed: this.medicamentToUpdate.imageMed 
    };
  
    this.medicamentService.updateMedicament(this.medicamentToUpdate.idMed, this.selectedUser.id, medicamentData).subscribe(
      (response) => {
        console.log('Medicament updated:', response);
        this.fetchMedicines(this.selectedUser.id);
        this.hideUpdateMedicamentDialog();
      },
      (error) => {
        console.error('Error updating medicament:', error);
      }
    );
  }
  

  deleteMedicament(medicament: Medicament) {
    if (confirm('Are you sure you want to delete this medicament?')) {
      this.medicamentService.deleteMedicament(medicament.idMed).subscribe(
        () => {
          console.log('Medicament deleted:', medicament);
          this.fetchMedicines(this.selectedUser.id);
        },
        (error) => {
          console.error('Error deleting medicament:', error);
        }
      );
    }
  }
  
  
  

  openReportDialog() {
    this.reportDialog = true;
  }

  hideReportDialog() {
    this.reportDialog = false;
    this.submitted = false;
  }

  addReport() {
    this.submitted = true;

    if (this.reportForm.invalid) {
      return;
    }

    const reportData: FormData = new FormData();
    reportData.append('dateReport', this.reportForm.get('dateReport')?.value);
    reportData.append('descriptionReport', this.reportForm.get('descriptionReport')?.value);
    reportData.append('resultatReport', this.reportForm.get('resultatReport')?.value);

    this.reportService.addReport(reportData, this.selectedUser.id).subscribe(
      (response) => {
        console.log('Report added:', response);
        this.fetchReports(this.selectedUser.id);
        this.hideReportDialog();
      },
      (error) => {
        console.error('Error adding report:', error);
      }
    );
  }

  fetchReports(userId: number) {
    this.reportService.getReportsByUserId(userId).subscribe((reports) => {
      this.reports = reports;
    });
  }

  openUpdateReportDialog(report: Report) {
    this.updateReportDialog = true;
    this.reportToUpdate = report;
    this.selectedReport = report;
    this.updateReportForm = this.fb.group({
      dateReport: [report.dateReport, Validators.required],
      descriptionReport: [report.descriptionReport, Validators.required],
      resultatReport: [report.resultatReport, Validators.required],
    });
  }


  hideUpdateReportDialog() {
    this.updateReportDialog = false;
    this.submitted = false;
  }

  updateReport() {
    this.submitted = true;

    if (this.updateReportForm.invalid) {
      return;
    }

    const updatedReport: Report = {
      idReport: this.selectedReport.idReport,
      dateReport: this.updateReportForm.get('dateReport')?.value,
      descriptionReport: this.updateReportForm.get('descriptionReport')?.value,
      resultatReport: this.updateReportForm.get('resultatReport')?.value,
    };

    this.reportService
      .updateReport(this.selectedReport.idReport, this.selectedUser.id, updatedReport)
      .subscribe(
        (response) => {
          console.log('Report updated:', response);
          this.fetchReports(this.selectedUser.id);
          this.hideUpdateReportDialog();
        },
        (error) => {
          console.error('Error updating report:', error);
        }
      );
  }
  deleteReport(report: Report) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(report.idReport).subscribe(
        () => {
          console.log('Report deleted:', report);
          this.fetchReports(this.selectedUser.id);
        },
        (error) => {
          console.error('Error deleting report:', error);
        }
      );
    }
  }




  fetchRegimes(userId: number) {
    this.regimeService.getRegimesByUserId(userId).subscribe((regimes) => {
      this.regimes = regimes;
    });
  }

  openRegimeDialog() {
    this.regimeDialog = true;
  }

  hideRegimeDialog() {
    this.regimeDialog = false;
    this.submitted = false;
  }

  addRegime() {
    this.submitted = true;

    if (this.regimeForm.invalid) {
      return;
    }

    const regimeData: FormData = new FormData();
    regimeData.append('typeRegime', this.regimeForm.get('typeRegime')?.value);
    regimeData.append('descriptionRegime', this.regimeForm.get('descriptionRegime')?.value);


    this.regimeService.addRegime(regimeData, this.selectedUser.id).subscribe(
      (response) => {
        console.log('Regime added:', response);
        this.fetchRegimes(this.selectedUser.id);
        this.hideRegimeDialog();
      },
      (error) => {
        console.error('Error adding regime:', error);
      }
    );
  }

  openUpdateRegimeDialog(regime: RegimeAlimentaire) {
    this.updateRegimeDialog = true;
    this.regimeToUpdate = regime;
    this.updateRegimeForm = this.fb.group({
      typeRegime: [regime.typeRegime, Validators.required],
      descriptionRegime: [regime.descriptionRegime, Validators.required],
    });
  }
  

  hideUpdateRegimeDialog() {
    this.updateRegimeDialog = false;
    this.submitted = false;
  }

  updateRegime() {
    this.submitted = true;
   
    if (this.updateRegimeForm.invalid) {
       return;
    }
   
    const regimeData: RegimeAlimentaire = {
       idRegime: this.regimeToUpdate.idRegime,
       typeRegime: this.updateRegimeForm.get('typeRegime')?.value,
       descriptionRegime: this.updateRegimeForm.get('descriptionRegime')?.value,
    };
   
    this.regimeService.updateRegime(this.regimeToUpdate.idRegime, this.selectedUser.id, regimeData).subscribe(
       (response) => {
         console.log('Regime updated:', response);
         this.fetchRegimes(this.selectedUser.id);
         this.hideUpdateRegimeDialog();
       },
       (error) => {
         console.error('Error updating regime:', error);
       }
    );
   }

   deleteRegime(regime: RegimeAlimentaire) {
    if (confirm('Are you sure you want to delete this regime?')) {
      this.regimeService.deleteRegimeAlimentaire(regime.idRegime).subscribe(
        () => {
          console.log('Regime deleted:', regime);
          this.fetchRegimes(this.selectedUser.id);
        },
        (error) => {
          console.error('Error deleting regime:', error);
        }
      );
    }
  }

  fetchDiagnostics(userId: number) {
    this.diagnosticService.getDiagnosticsByUserId(userId).subscribe((diagnostics) => {
      this.diagnostics = diagnostics;
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
  
  

  
  
}
