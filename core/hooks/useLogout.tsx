import {useCallback} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {useAppDispatch} from '@hrbox/core/redux/hooks';
import {logout} from '@hrbox/core/redux/slices/authSlice';
import {toast} from 'sonner';

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            const loadingToast = toast.loading('در حال خروج...');

            localStorage.removeItem('Token');
            localStorage.removeItem('renewalToken');
            localStorage.removeItem('userId');

            dispatch(logout());

            toast.dismiss(loadingToast);

            toast.success('با موفقیت خارج شدید');

            // Redirect به صفحه لاگین
            navigate({to: '/sso/login'});
        } catch (error) {
            toast.error('خطا در خروج از حساب کاربری');
        }
    }, [dispatch, navigate]);

    return {handleLogout};
}