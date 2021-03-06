import * as React from 'react';
import './TableFilters.scss';

export interface IMenuOptions {
    arrCityDropdown: string[];
    arrDeptDropdown: string[];
}

export interface ITableFilterProps {
    dropdownChoices: IMenuOptions;
    filters: {
        defaultText: string;
        applied: boolean;
        city: string | null;
        dept: string | null;
    };
    dropdownEvent: (e: any) => void;
    resetEvent: (e: any) => void;
}

const TableFilters: React.SFC<ITableFilterProps> = (props: ITableFilterProps) => {
    const cols: number[] = [4, 8];
    return (
        <div className='cuMenu'>
            <div className='ms-Grid'>
                <div className='ms-Grid-row cuMenuChoiceRow'>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuMenuLabel`}>City:</div>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuMenuOptions`}>
                        <select id='cuArrCities' onChange={props.dropdownEvent}>
                            {props.dropdownChoices.arrCityDropdown.map((el, ind) => <option key={ind} value={el} selected={el === props.filters.city ? true : false} disabled={props.filters.defaultText === el ? true : false} >{props.filters.defaultText === el ? '' : el}</option>)}
                        </select>
                    </div>
                </div>
                <div className='ms-Grid-row cuMenuChoiceRow'>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[0]} ms-xl${cols[0]} ms-xxl${cols[0]} cuMenuLabel`}>Dept:</div>
                    <div className={`ms-Grid-col ms-sm12 ms-lg${cols[1]} ms-xl${cols[1]} ms-xxl${cols[1]} cuMenuOptions`}>
                        <select id='cuArrDepartments' onChange={props.dropdownEvent}>
                            {props.dropdownChoices.arrDeptDropdown.map((el, ind) => <option key={ind} value={el} selected={el === props.filters.dept ? true : false} disabled={props.filters.defaultText === el ? true : false} >{props.filters.defaultText === el ? '' : el}</option>)}
                        </select>
                    </div>
                </div>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-sm12'>
                        <button onClick={props.resetEvent}>RESET FILTERS</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableFilters;