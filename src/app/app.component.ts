import { PostService } from './Services/post.service';
import { RoleService } from './Services/role.service';
import { RegisterService } from './Services/register.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommandLineService } from './Services/CommandLine/command-line.service';
import { CommandLine } from './models/ShopManag/CommandLine';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProjPi';
 
  constructor(private commandLineService: CommandLineService){}
 /* commandLineForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private commandLineService: CommandLineService){
    this.commandLineForm= this.formBuilder.group({
      quantite: ['', Validators.required],
      prix_total_product: ['', Validators.required]
    });
  }

  commandLines: CommandLine[] = [];
  loadCommandLines(): void {
    this.commandLineService.findAllCommandLines().subscribe(commandLines => {
      this.commandLines = commandLines;
    });
  }

  ngOnInit(): void {
    this.loadCommandLines();
  }
  addCommandLine() : void{
    if(this.commandLineForm.valid){
      const newCommandLine : CommandLine = this.commandLineForm.value as CommandLine;
      this.commandLineService.addCommandLine(newCommandLine).subscribe( () :void =>{
        this.loadCommandLines();
        this.commandLineForm.reset();
      });
    }else{
      alert("CommandLine added!");
    }
  }*/
}
