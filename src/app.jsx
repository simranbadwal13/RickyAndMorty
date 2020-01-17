import React, { useReducer } from "react";
import CharacterListContext from './redux/context';
import LoadReducer from './redux/reducers';
import { initialState } from './redux/state/initial-state';
import CharactersList from './container/characters-list';
import { Header } from './components';
import 'bootstrap/dist/css/bootstrap.css';

export const App = () => {
    const [state, dispatch] = useReducer(
        LoadReducer,
        initialState
    );
    return (
        <CharacterListContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Header />
            <CharactersList />
        </CharacterListContext.Provider>
    );
};
