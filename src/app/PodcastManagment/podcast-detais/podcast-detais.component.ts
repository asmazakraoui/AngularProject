import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Podcast } from 'src/app/models/podcast';

@Component({
  selector: 'app-podcast-detais',
  templateUrl: './podcast-detais.component.html',
  styleUrls: ['./podcast-detais.component.css']
})
export class PodcastDetaisComponent {
  constructor(
    public dialogRef: MatDialogRef<PodcastDetaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { podcast: Podcast }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
