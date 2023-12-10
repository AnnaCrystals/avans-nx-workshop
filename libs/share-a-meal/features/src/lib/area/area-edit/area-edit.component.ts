import {Component, OnInit} from '@angular/core';
import { IArea } from '@avans-nx-workshop/shared/api';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { AreaService } from '../../area/area.service';

@Component({
  selector: 'share-a-meal-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css'],

})
export class AreaEditComponent implements OnInit {
  area: IArea | undefined;
  editForm: FormGroup;
  isNewArea = false;

  constructor(private route: ActivatedRoute, private areaService: AreaService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      'nameCompound': [''],
      'code': [''],
      'sizeSquareMeter': [''],
      'site': [''],
      'vegetation': [''],
      'securityOn': ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id');
    if (!id) {
      this.isNewArea = true;
      return;
    }
    this.areaService.read(id).subscribe((area: IArea) => {
      this.area = area;
      this.editForm.setValue({
        'nameCompound': area.nameCompound,
        'code': area.code,
        'sizeSquareMeter': area.sizeSquareMeter,
        'site': area.site,
        'vegetation': area.vegetation,
        'securityOn': area.securityOn,
      });
    });
  }

  onSubmit() {
    if (this.isNewArea) {
      this.areaService.create(this.editForm.value)
        .subscribe(area => this.router.navigate(['/area', area._id]));
    } else {
      const updatedArea: IArea = {
        ...this.area,
        ...this.editForm.value
      };
      this.areaService.update(updatedArea)
        .subscribe(() => this.router.navigate(['/area', updatedArea._id]));
    }
  }
}
