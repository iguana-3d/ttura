import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterScreen() {
    const [dataUser, setDataUser] = useState(
        {
            "Email": "",
            "FirstName": "",
            "LastName": "",
            "Username": "",
            "CnpjCpf": "",
            "Phone": "",
            "Password": "",
        }
    )

    const registerUser = async () => {
        await axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/Cadastrar?Email', dataUser)
            .then(function (response) {
                activateEmail(response.data);
                console.log("SendData", response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    const activateEmail = async (data) => {
        await axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/EnviarEmailAtivacao', {
            "Email": data.email,
            "FirstName": data.FirstName,
            "LastName": data.LastName
        })
            .then(function (response) {
                console.log("sendEmail", response.data)
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }

    return (
        <div className="container">
            <div className="loginScreen">
                <div className="loginScreen__form">
                    <div className="input-control">
                        <label className="input-control__label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.Email}
                            onChange={(e) => setDataUser({ ...dataUser, "Email": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            First name
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.FirstName}
                            onChange={(e) => setDataUser({ ...dataUser, "FirstName": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            Last name
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.LastName}
                            onChange={(e) => setDataUser({ ...dataUser, "LastName": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.Username}
                            onChange={(e) => setDataUser({ ...dataUser, "Username": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            CnpjCpf
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.CnpjCpf}
                            onChange={(e) => setDataUser({ ...dataUser, "CnpjCpf": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.Phone}
                            onChange={(e) => setDataUser({ ...dataUser, "Phone": e.target.value })}
                        />
                    </div>
                    <div className="input-control">
                        <label className="input-control__label">
                            Password
                        </label>
                        <input
                            type="text"
                            className="input-control__input"
                            value={dataUser.Password}
                            onChange={(e) => setDataUser({ ...dataUser, "Password": e.target.value })}
                        />
                    </div>
                    <button
                        className="button"
                        onClick={() => registerUser()}
                    >
                        Cadastrar
                    </button>
                    <Link href="/">
                        <a>Sign In</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}