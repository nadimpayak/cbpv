// import { Injectable } from '@angular/core';
// import { Effect, Actions, toPayload } from '@ngrx/effects';
// import { Action } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';

// import * as UserActions from "../actions/user.action";
// import { ApiService } from "../services/api/api.service";


// @Injectable()

// export class UserEffects {


// @Effect() 
// getUser$: Observable<Action> = this.actions$
// .ofType(UserActions.GET_USER)
// .map(toPayload)
// .switchMap(query => {
//     return this.apiService.all(query)
//     .map(user => new UserActions.GetUser(user));
//     // catch(() => of(new FoodActions.FetchFoodFail()))
// });

// // data get service here private nutritionService: NutritionService
// constructor(private actions$: Actions,private apiService: ApiService) {}


// }
