import {Module} from '@nestjs/common';
import { MealService } from './meal/meal.service';
import { MealController } from './meal/meal.controller';

@Module({
    controllers : [MealController],
    providers: [MealService],
    exports: [MealService],
})
export class BackendFeaturesMealModule{}