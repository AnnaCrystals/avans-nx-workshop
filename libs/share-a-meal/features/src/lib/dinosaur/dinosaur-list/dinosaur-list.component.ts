import { Component, OnInit, OnDestroy } from '@angular/core';
import { DinosaurService } from '../dinosaur.service';
import { IDinosaur } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 
import { NgZone } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './dinosaur-list.component.html',
  styleUrls: ['./dinosaur-list.component.css'],
})
export class DinosaurListComponent implements OnInit, OnDestroy {
  dinosaurs: IDinosaur[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private dinosaurService: DinosaurService, private router: Router) {} 

  ngOnInit(): void {
    console.log('Before subscribing to the observable');
    this.subscription = this.dinosaurService.list().subscribe((results) => {
        console.log('Inside the observable subscription');
        console.log('Dinosaurs:', results);
        this.dinosaurs = results;
    });
    console.log('After subscribing to the observable');
}


  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  onUserClick(dinosaurId: number): void {
    this.router.navigate(['/dinosaur', dinosaurId]);
  }
  
}
