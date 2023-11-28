import {Component, OnInit} from '@angular/core';
import { IDinosaur } from '@avans-nx-workshop/shared/api';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { DinosaurService } from '../../dinosaur/dinosaur.service';

@Component({
  selector: 'share-a-meal-dinosaur-edit',
  templateUrl: './dinosaur-edit.component.html',
  styles: [],
})
export class DinosaurEditComponent implements OnInit {
  dinosaur: IDinosaur | undefined;
  editForm: FormGroup;
  isNewDinosaur = false;

  constructor(private route: ActivatedRoute, private dinosaurService: DinosaurService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      'dinoname': [''],
      'species': [''],
      'dateOfBirth': [''],
      'weight': [''],
      'height': [''],
      'dietType': ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isNewDinosaur = true;
      return;
    }
    this.dinosaurService.read(id).subscribe((dinosaur: IDinosaur) => {
      this.dinosaur = dinosaur;
      this.editForm.setValue({
        'dinoname': dinosaur.dinoname,
        'species': dinosaur.species,
        'dateOfBirth': dinosaur.dateOfBirth,
        'weight': dinosaur.weight,
        'height': dinosaur.height,
        'dietType': dinosaur.dietType

      });
    });
  }

  onSubmit() {
    if (this.isNewDinosaur) {
      this.dinosaurService.create(this.editForm.value)
        .subscribe(dinosaur => this.router.navigate(['/dinosaur', dinosaur.id]));
    } else {
      const updatedDinosaur: IDinosaur = {
        ...this.dinosaur,
        ...this.editForm.value
      };
      this.dinosaurService.update(updatedDinosaur)
        .subscribe(() => this.router.navigate(['/dinosaur', updatedDinosaur.id]));
    }
  }
}
