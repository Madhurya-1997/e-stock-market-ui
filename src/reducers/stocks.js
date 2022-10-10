

const INITIAL_STATE = {
    isStocksLoading: false,
    stocksError: null,
    stocks: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isStocksLoading: true };
        case 'END_LOADING':
            return { ...state, isStocksLoading: false };
        case 'FETCH_COMPANY_STOCKS':
            return {
                ...state,
                stocks: action.payload.data,
            };
        case 'CREATE_STOCK':
            return {
                ...state,
                stocks: [...state.stocks, action.payload.data],
                stocksError: null
            }
        case 'FETCH_STOCKS_WITHIN_TIMESPAN':
            return {
                ...state,
                stocks: action.payload.data,
            }
        default:
            return state;
    }
};

