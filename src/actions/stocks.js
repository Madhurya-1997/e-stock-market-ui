import * as api from '../api/index.js';

export const getCompanyStocks = (code) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });

        const { data } = await api.fetchCompanyStocks(code);

        dispatch({ type: 'FETCH_COMPANY_STOCKS', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
};

export const createStock = (code, stock, history) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.createStock(code, stock);

        dispatch({ type: 'CREATE_STOCK', payload: { data } });
        dispatch({ type: 'END_LOADING' });
        history.push(`/company/${code}`)

    } catch (error) {
        dispatch({ type: 'CREATE_STOCK_ERROR', payload: { error } });
        dispatch({ type: 'END_LOADING' });
    }
};

export const getCompanyStocksWithinTimeSpan = (code, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchCompanyStocksWithinTimeSpan(code, startDate, endDate);

        console.log(data)
        dispatch({ type: 'FETCH_STOCKS_WITHIN_TIMESPAN', payload: { data } });
        dispatch({ type: 'END_LOADING' });

    } catch (error) {
        console.error(error)
        // dispatch({ type: 'CREATE_STOCK_ERROR', payload: { error } });
        // dispatch({ type: 'END_LOADING' });
    }
};