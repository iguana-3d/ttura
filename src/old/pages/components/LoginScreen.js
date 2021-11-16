import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginUser } from '../../slices/sendLogin';
import {  sendUser2FA } from '../../slices/getDataUser';
import { sendSmsCode } from '../../slices/validade2FA';

export default function LoginScreen() {
    const [screenControl, setScreenControl] = useState(0);
    const [loginUser, setLoginUser] = useState(
        {
            "email": "",
            "password": ""
        }
    );

    const [smsCode, setSmsCode] = useState('');
    const dispatch = useDispatch();

    const { isFetching, isSuccess, isError, errorMessage, jwt, isActive } = useSelector((state) => state.signIn);
    const { messageSMS, isSuccessSMS } = useSelector((state) => state.user2FA);
    const { validateSmsMessage, mesageSms } = useSelector((state) => state.sendSms);

    useEffect(() => {
        if (isSuccess) {
            console.log("JWT", jwt);
            dispatch(sendUser2FA());
        }
        if (isError) {
            console.log("error")
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        validateSmsMessage ? alert(`${mesageSms}`) : '';
    }, [validateSmsMessage])

    return (
        <div className="loginScreen">
            {
                !isSuccessSMS ?
                    <div className="loginScreen__form">
                        <div className="input-control">
                            <label className="input-control__label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="input-control__input"
                                value={loginUser.email}
                                onChange={(e) => setLoginUser({ ...loginUser, "email": e.target.value })}
                            />
                        </div>
                        <div className="input-control">
                            <label className="input-control__label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="input-control__input"
                                value={loginUser.password}
                                onChange={(e) => setLoginUser({ ...loginUser, "password": e.target.value })}
                            />
                        </div>
                        <button
                            type="button"
                            className="button"
                            onClick={() => dispatch(fetchLoginUser(loginUser))}
                        >
                            Sign In
                        </button>
                        <Link href="/components/RegisterScreen">
                            <a>Sign Up</a>
                        </Link>
                        <Link href="/components/ForgotPassword">
                            <a>Forgot Password?</a>
                        </Link>
                    </div>
                    :
                    <div className="loginScreen__form">
                        <div className="input-control">
                            <label className="input-control__label">
                                SMS CODE
                            </label>
                            <input
                                type="text"
                                className="input-control__input"
                                value={smsCode}
                                onChange={(e) => setSmsCode(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="button"
                            onClick={() => dispatch(sendSmsCode(smsCode))}>
                            Confirmar
                        </button>
                    </div>
            }
        </div>
    );
}