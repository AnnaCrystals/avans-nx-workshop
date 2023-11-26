import { NotFoundException } from '@nestjs/common';
import { IDinosaur } from '../../../../../../shared/api/src/lib/models/dinosaur.interface';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Injectable } from "@angular/core";

@Injectable()
export class DinosaurService {
    TAG = 'DinosaurService';

    private dinosaurs$ = new BehaviorSubject<IDinosaur[]>([
        {
            id: '0',
            dinoname: 'Dino Joe',
            email: 'johnjoe@avans.nl',
            password: '1234',
            profilePicture: ''
        },
    ]);

    getAll(): IDinosaur[] {
        Logger.log('getAll', this.TAG);
        return this.dinosaurs$.value;
    }

    getOne(id: string): IDinosaur {
        Logger.log(`getOne(${id})`, this.TAG);
        const dinosaur = this.dinosaurs$.value.find((td) => td.id === id);
        if (!dinosaur) {
            throw new NotFoundException(`Dinosaur could not be found!`);
        }
        return dinosaur;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(dinosaur: Pick<IDinosaur, 'dinoname' | 'email'>): IDinosaur {
        Logger.log('create', this.TAG);
        const current = this.dinosaurs$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newDinosaur: IDinosaur = {
            ...dinosaur,
            id: `dinosaur-${Math.floor(Math.random() * 10000)}`,
            password: '1234',
            profilePicture:'',
        };
        this.dinosaurs$.next([...current, newDinosaur]);
        return newDinosaur;
    }
}