import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCities, clearCities } from '../../api/slice/citySlice';

export const useCities = (countryId: number = 101) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.cities);

  useEffect(() => {
    // Fetch cities when hook mounts
    dispatch(fetchCities(countryId));

    // Optional cleanup when component unmounts
    return () => {
      dispatch(clearCities());
    };
  }, [dispatch, countryId]);

  return { data, loading, error };
};
