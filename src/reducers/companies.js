const INITIAL_STATE = {
    isLoading: false,
    error: null,
    companies: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'FETCH_COMPANIES':
            return {
                ...state,
                companies: action.payload.data,
                error: null
            };
        case 'FETCH_COMPANIES_ERROR':
            return {
                ...state,
                error: action.payload.error,
                // isSuccess: false
            }
        case 'FETCH_COMPANY':
            return {
                ...state,
                companyDetails: action.payload.data,
                error: null
            };
        case 'FETCH_COMPANY_ERROR':
            return {
                ...state,
                error: action.payload.error,
            }
        case 'CREATE_COMPANY':
            console.log([...state.companies, { company: action.payload.data, stocks: [] }])
            return {
                ...state,
                companies: [...state.companies, { company: action.payload.data, stocks: [] }],
                error: null
            }
        case 'CREATE_COMPANY_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'DELETE_COMPANY':
            return {
                ...state,
                companies: state.companies.filter(company => company.code !== action.payload),
                error: null
            }
        default:
            return state;
    }
};

