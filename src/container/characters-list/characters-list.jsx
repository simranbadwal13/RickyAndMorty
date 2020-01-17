import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CharacterListContext from '../../redux/context';
import { Spinner, Select } from '../../components';
import { sortByIdOptions } from './constants';
import './styles.less';

export const CharactersList = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [sortIdBy, setSortIdBy] = useState('');

    const { state, dispatch } = useContext(CharacterListContext);

    useEffect(() => {
        setIsFetching(true);
        const URL = 'https://rickandmortyapi.com/api/character/';
        axios.get(URL)
            .then((result) => {
                const processedResult = result.data.results;
                dispatch({
                    type: 'LOAD_LIST_FETCHED',
                    listData: processedResult
                });
                setIsFetching(false);
            })
            .catch((error) => {
                setIsFetching(false);
                console.log('error');
            });
    }, []);

    const onSortByChange = (event) => {
        const sortByValue = event.currentTarget.value;
        setSortIdBy(sortByValue);
        dispatch({
            type: 'FILTER_DATA',
            genderList: state.data.genderList,
            speciesList: state.data.speciesList,
            sortIdBy: sortByValue
        });
    };

    const renderCheckBoxesContainer = (checkboxList, toggleCheckBox) => {
        return checkboxList.map((checkbox, index) =>
            <div key={index}>
                <label>
                    <input
                        className="input-check-box"
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => toggleCheckBox(index)}
                    />
                    {checkbox.name}
                </label>
            </div>
        )
    };

    const toggleGenderCheckbox = (index) => {
        const { genderList } = state.data;
        genderList[index].checked = !genderList[index].checked;

        dispatch({
            type: 'FILTER_DATA',
            genderList,
            speciesList: state.data.speciesList,
            sortIdBy
        });
    };

    const toggleSpeciesCheckbox = (index) => {
        const { speciesList } = state.data;
        speciesList[index].checked = !speciesList[index].checked;

        dispatch({
            type: 'FILTER_DATA',
            speciesList,
            genderList: state.data.genderList,
            sortIdBy
        });
    };

    return (
        <div className="container character-list-container">
            {isFetching ?
                <Spinner />
                :
                <div>
                    <Select title={'Sort By: '}
                        options={sortByIdOptions}
                        value={sortIdBy}
                        onChange={onSortByChange}
                        className="sort-select d-none d-sm-block"
                        placeholder="Sort By ID."
                    />
                    <div className="checkbox-container">
                        <div className="checkbox-list-container">
                            Gender
                            {renderCheckBoxesContainer(state.data.genderList, toggleGenderCheckbox)}
                        </div>
                        <div className="checkbox-list-container">
                            Species
                            {renderCheckBoxesContainer(state.data.speciesList, toggleSpeciesCheckbox)}
                        </div>
                    </div>
                    <Select title={'Sort By: '}
                        options={sortByIdOptions}
                        value={sortIdBy}
                        onChange={onSortByChange}
                        className="sort-select-small d-block d-sm-none"
                        placeholder="Sort By ID."
                    />
                    <div className="row card-container">
                        {state.data.charactersList.map((character, index) => (
                            <div className="col-sm-4 col-xs-6 character-card" key={character.name + index}>
                                <img className="card-img-top" src={character.image} alt={character.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <div className="ch-status">
                                        <p className="ch-status-head">Gender:</p>
                                        <p className="ch-status-body">{character.gender}</p>
                                    </div>
                                    <div className="ch-status">
                                        <p className="ch-status-head">Species:</p>
                                        <p className="ch-status-body">{character.species}</p>
                                    </div>
                                    <div className="ch-status">
                                        <p className="ch-status-head">Status:</p>
                                        <p className="ch-status-body">{character.status}</p>
                                    </div>
                                    <div className="ch-status">
                                        <p className="ch-status-head">origin:</p>
                                        <p className="ch-status-body">{character.origin.name}</p>
                                    </div>
                                    <div className="ch-status">
                                        <p className="ch-status-head">Last Location:</p>
                                        <p className="ch-status-body">{character.location.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}
