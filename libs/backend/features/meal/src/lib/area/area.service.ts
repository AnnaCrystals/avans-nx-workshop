import { NotFoundException } from '@nestjs/common';
import { IArea } from '../../../../../../shared/api/src/lib/models/area.interface';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Injectable } from "@angular/core";

@Injectable()
export class AreaService {
    TAG = 'AreaService';

    private areas$ = new BehaviorSubject<IArea[]>([
        {
            id: '0',
            nameCompound: 'Chompy ground',
            code: 'CHOM-17',
            sizeSquareMeter: 900,
            site: 'B',
            vegetation: 'beach',
            securityOn: false,
        },
    ]);

    getAll(): IArea[] {
        Logger.log('getAll', this.TAG);
        return this.areas$.value;
    }

    getOne(id: string): IArea {
        Logger.log(`getOne(${id})`, this.TAG);
        const area = this.areas$.value.find((td) => td.id === id);
        if (!area) {
            throw new NotFoundException(`Area could not be found!`);
        }
        return area;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(area: Pick<IArea, 'nameCompound' | 'code'>): IArea {
        Logger.log('create', this.TAG);
        const current = this.areas$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newArea: IArea = {
            ...area,
            id: `area-${Math.floor(Math.random() * 10000)}`,
            sizeSquareMeter: 900,
            site:'B',
            vegetation: 'Beach',
            securityOn: false
        };
        this.areas$.next([...current, newArea]);
        return newArea;
    }
}