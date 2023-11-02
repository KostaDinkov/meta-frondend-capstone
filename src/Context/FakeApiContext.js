import {createContext, useContext} from 'react';
import FakeReservationsApi from '../data/fakeApi';

const ApiContext = createContext(null)

export default function ApiProvider({children}){
    return(
        <ApiContext.Provider value={new FakeReservationsApi()}>
            {children}
        </ApiContext.Provider>
    )
}

export function useFakeApi(){
    return useContext(ApiContext);
}

