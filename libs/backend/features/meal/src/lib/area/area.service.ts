import { NotFoundException } from '@nestjs/common';
import { IArea, IUpdateArea } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger , Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from './schemas/area.schema';
import { Model } from 'mongoose';


@Injectable()
export class AreaService {
    TAG = 'AreaService';

    
    constructor(@InjectModel(Area.name) private areaModel: Model<IArea>) {}
    private areas$ = new BehaviorSubject<IArea[]>([
        {
            _id: '0',
            nameCompound: 'Chompy ground',
            code: 'CHOM-17',
            sizeSquareMeter: 900,
            site: 'B',
            vegetation: 'beach',
            securityOn: false,
        },
    ]);

    async getAll(): Promise<IArea[]> {
        Logger.log('getAll', this.TAG);
        return await this.areaModel.find().exec();
    }

    async getOne(id: string): Promise<IArea> {
        Logger.log(`getOne(${id})`, this.TAG);
        const area = await this.areaModel.findOne({_id: id}).exec();
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
    async create(area: Pick<IArea, 'nameCompound' | 'code'>): Promise<IArea> {
        Logger.log('create', this.TAG);
        const current = this.areas$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newArea: IArea = {
            ...area,
            _id: `area-${Math.floor(Math.random() * 10000)}`,
            sizeSquareMeter: 900,
            site:'B',
            vegetation: 'Beach',
            securityOn: false
        };
        this.areas$.next([...current, newArea]);
        return newArea;
    }

    async update(id: string, area: IUpdateArea): Promise<IArea> {
        const current = this.areas$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
          throw new NotFoundException(`Area with id ${id} not found`);
        }
        const updatedArea: IArea = {
          ...current[index],
          ...area,
        };
        current[index] = updatedArea;
        this.areas$.next(current);
        return updatedArea;
      }

      
    async delete(id: string): Promise<void> {
        const current = this.areas$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
        throw new NotFoundException(`Area with id ${id} not found`);
        }
        current.splice(index, 1);
        this.areas$.next(current);
    }
}