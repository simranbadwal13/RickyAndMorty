import { initialState } from '../state/initial-state.js';

export const LoadReducer = (state = initialState, action) => {
    if (action.type === 'LOAD_LIST_FETCHED') {
        const { listData } = action;
        let genderListHash = {};
        let speciesListHash = {};
        listData.forEach(element => {
            if (genderListHash[element.gender] === undefined) {
                genderListHash[element.gender] = {
                    'name': element.gender,
                    'checked': false
                };
            }
            if (speciesListHash[element.species] === undefined) {
                speciesListHash[element.species] = {
                    'name': element.species,
                    'checked': false
                };
            }
        });
        const genderList = Object.values(genderListHash);
        const speciesList = Object.values(speciesListHash);
        return {
            ...state,
            data: {
                originalCharacterList: action.listData,
                charactersList: action.listData,
                genderList,
                speciesList,
            }
        }
    }

    if (action.type === 'FILTER_DATA') {
        const genderList = [...action.genderList];
        const speciesList = [...action.speciesList];
        const sortIdBy = action.sortIdBy;

        let genders = [];
        genderList.forEach(gender => {
            if (gender.checked) {
                genders.push(gender.name);
            }
        });
        let charactersList = genders.length === 0 ? state.data.originalCharacterList
            : state.data.originalCharacterList.filter((character) => genders.includes(character.gender));

        let species = [];
        speciesList.forEach(specie => {
            if (specie.checked) {
                species.push(specie.name);
            }
        });
        charactersList = species.length === 0 ? charactersList
            : charactersList.filter((character) => species.includes(character.species));

        const sortDesc = (arr, sortBy) => arr.sort((a, b) => b.id - a.id);
        const sortAsc = (arr, sortBy) => arr.sort((a, b) => a.id - b.id);
        const sortCharacterList = (charactersList) => sortIdBy === 'desc'
            ? sortDesc(charactersList, sortIdBy)
            : sortAsc(charactersList, sortIdBy);

        charactersList = sortCharacterList(charactersList);


        return {
            ...state,
            data: {
                ...state.data,
                charactersList,
                genderList: genderList,
                speciesList: speciesList
            }
        }
    }

    return state;
}
