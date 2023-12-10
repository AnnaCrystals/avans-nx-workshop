import { Component, OnInit } from '@angular/core';
import { AreaService } from '../area.service';
import { IArea } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './area-detail.component.html',
  styleUrls: ['./area-detail.component.css'],
})
export class AreaDetailComponent implements OnInit {
  area$: Observable<IArea | null> | undefined;

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.area$ = this.route.params.pipe(
      switchMap((params) => {
        const areaId = params['_id'];
        return this.areaService.read(areaId);
      })
    );
  }

  onDeleteClick(): void {
    if (this.area$) {
      this.area$
        .pipe(
          filter((area): area is IArea => !!area),
          take(1)
        )
        .subscribe((area) => {
          if (area._id) {
            console.log(`Deleting area with ID: ${area._id}`);
  
            this.areaService.deleteArea(area._id);
           
            console.log(`Area with ID ${area._id} deleted successfully.`);
            
            this.router.navigate(['/area-list']);
          }
        });
    }
  }
  
}

