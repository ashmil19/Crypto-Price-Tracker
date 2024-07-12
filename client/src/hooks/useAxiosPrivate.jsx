import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { axiosPrivate } from '../helper/axios'

const useAxiosPrivate = () => {
    const authState = useSelector((state) => state.auth)


    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authState?.accessToken}`
                }

                return config;
            }, (error) => Promise.reject(error)
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }


    }, [authState]);

    return axiosPrivate;

}

export default useAxiosPrivate