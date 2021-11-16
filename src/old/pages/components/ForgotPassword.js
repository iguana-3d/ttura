import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
    const [userEmail, setUserEmail] = useState('');
    const [screenControl, setScreenControl] = useState(0);

    //Password
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const sendEmail = async () => {
        await axios.post(`https://dev-api.ttura.com/v1.0/TturaAuth/GerarPedidoNovaSenha/${userEmail}`)
            .then(function (response) {
                console.log("Send link for switch password", response.data);
                validadeNewPassword(response.data.PasswordResetToken)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const validadeNewPassword = async (token) => {
        const bodyParameters = {
            "Email": `${userEmail}`,
            "Token": `${token}`
        };

        await axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/PedidoNovaSenhaValido', bodyParameters)
        .then(function (response) {
            console.log("password validade sucessful", response.data);
            setScreenControl(1);
        })
        .catch(function (error) {
            console.log(error.data);
        });
    }

    const resetPassword = async () => {
        const bodyParameters = {
            "Email": `${userEmail}`,
            "Password": `${password}`
        };

        await axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/GerarNovaSenha', bodyParameters)
            .then(function (response) {
                console.log("troca de senha efetuada com sucesso", response.data);
                router.push("/")
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    return (
        <div className="container">
            <div className="loginScreen">
                {
                    screenControl === 0 ?
                        <div className="loginScreen__form">
                            <div className="input-control">
                                <label className="input-control__label">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="input-control__input"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="button"
                                onClick={() => { sendEmail() }}
                            >
                                Enviar
                            </button>
                        </div>
                        :
                        <div className="loginScreen__form">
                            <div className="input-control">
                                <label className="input-control__label">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    className="input-control__input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-control">
                                <label className="input-control__label">
                                    Confirm your password
                                </label>
                                <input
                                    type="text"
                                    className="input-control__input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="button"
                                onClick={() => { resetPassword() }}
                            >
                                Enviar
                            </button>
                        </div>
                }
            </div>
        </div>
    );
}