import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCompanies } from '../actions/companies';

const Prefetch = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("Mounting prefetch component...")
        dispatch(getCompanies());

        return () => {
            console.log("Unmounted prefetch component...")
        }
    }, [])


    return (
        <>{children}</>
    )
}

export default Prefetch