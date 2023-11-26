import { Component, OnInit } from '@angular/core';
import { DinosaurService } from '../dinosaur.service';
import { IDinosaur } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './dinosaur-detail.component.html',
  styleUrls: ['./dinosaur-detail.component.css'],
})
export class DinosaurDetailComponent implements OnInit {
  dinosaur$: Observable<IDinosaur | null> | undefined;

  constructor(
    private dinosaurService: DinosaurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dinosaur$ = this.route.params.pipe(
      switchMap((params) => {
        const dinosaurId = params['id'];
        return this.dinosaurService.read(dinosaurId);
      })
    );
  }

  onDeleteClick(): void {
    if (this.dinosaur$) {
      this.dinosaur$
        .pipe(
          filter((dinosaur): dinosaur is IDinosaur => !!dinosaur),
          take(1)
        )
        .subscribe((dinosaur) => {
          if (dinosaur.id) {
            console.log(`Deleting dinosaur with ID: ${dinosaur.id}`);
  
            this.dinosaurService.deleteDinosaur(dinosaur.id);
           
            console.log(`Dinosaur with ID ${dinosaur.id} deleted successfully.`);
            
            this.router.navigate(['/dinosaur-list']);
          }
        });
    }
  }
  
}


