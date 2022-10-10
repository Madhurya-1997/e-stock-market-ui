import * as api from '../api/index.js';

export const getCompany = (code) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.fetchCompany(code);

        dispatch({ type: 'FETCH_COMPANY', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        dispatch({ type: 'FETCH_COMPANY_ERROR', payload: { error } });
        dispatch({ type: 'END_LOADING' });
    }
};

export const getCompanies = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchCompanies();

        dispatch({ type: 'FETCH_COMPANIES', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        dispatch({ type: 'FETCH_COMPANIES_ERROR', payload: { error } });
        dispatch({ type: 'END_LOADING' });
    }
};

export const createCompany = (company) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.createCompany(company);

        dispatch({ type: 'CREATE_COMPANY', payload: { data } });
        dispatch({ type: 'END_LOADING' });

    } catch (error) {
        dispatch({ type: 'CREATE_COMPANY_ERROR', payload: { error } });
        dispatch({ type: 'END_LOADING' });
    }
};


export const deleteCompany = (code) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        await api.deleteCompany(code);

        dispatch({ type: 'DELETE_COMPANY', payload: code });
        dispatch({ type: 'END_LOADING' });

    } catch (error) {
        console.log(error);
    }
};