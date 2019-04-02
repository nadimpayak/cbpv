


import { User } from '../models/user.model';
import * as UserActions from '../actions/user.action';

export interface State {
    loading: boolean;
    userData: User[];
};

const initialState: State =  {
    loading: false,
    userData: []
}

export function reducer(state = initialState, action: UserActions.Actions): State {
    switch (action.type) {
    
        case UserActions.GET_USER: {
            return {
                ...state,
                loading: true
            }
        }
        // case UserActions.REMOVE_USER: {
        //     return {
        //         ...state,
        //         userData: state.userData.filter(user => 
        //         user.id !== action.payload.id)
        //     }
        // }

        default: {
            return state;
        }

    }
}
