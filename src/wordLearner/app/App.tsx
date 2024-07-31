import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from "S/lib/classNames/classNames";
import { getUserInited, userActions } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Words } from '@/pages/Words';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Words />
        </div>
    );
}

export default App;
