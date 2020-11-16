import {createStore} from 'redux';
import {v4 as uuid} from 'uuid';

import {ActionTypes} from './actions';

const INITIAL_STATE = [
    {
        id: 1,
        title: "Countries",
        data: [
            {
                id: uuid(),
                name: "Portugal",
                acronym: "PT",
                mortalityRate: "11"
            },
            {
                id: uuid(),
                name: "Italy",
                acronym: "IT",
                mortalityRate: "10.5"
            }
        ]
    },
    {
        id: 2,
        title: "Vehicles",
        data: [
            {
                id: uuid(),
                name: "Honda CR-V",
                numberOfDoors: 5,
                minHorsePower: 150,
                maxHorsePower: 190
            },
            {
                id: uuid(),
                name: "Suzuki VL1500",
                numberOfDoors: 5,
                minHorsePower: 50,
                maxHorsePower: 68
            }
        ]
    }
]

const inputsReducer = (state = INITIAL_STATE, action) =>{

    switch(action.type){
        case ActionTypes.UPDATE_ITEMS_LIST:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    data: action.tableData
                }
            };
            
        default:
            return state;
    }
}

const store = createStore(inputsReducer);


export default store;