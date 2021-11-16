import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginUser } from './redux/slices/sendLogin';
import { useAppSelector, useAppDispatch } from './hooks';
import { sendRegistryF2A } from './redux/slices/registryF2A';

interface loginUser {
  userName: string;
  password: string;
}

export const App: React.FC = () => {
  const [formLogin, setFormLogin] = useState<loginUser>({
    userName: '',
    password: ''
  });

  const [sms, setSms] = useState<string>('');

  const dispatch = useAppDispatch();
  let isSuccessful = useAppSelector((state) => state.signIn.tokenIsSuccessful);
  const sendF2AisSuccessful = useAppSelector((state) => state.registryF2A.isSucessful);

  useEffect(() => {
    console.log("sendF2A", sendF2AisSuccessful)
    if (isSuccessful) {
      console.log("foi");
      dispatch(sendRegistryF2A());
    }

  }, [isSuccessful])

  return (
    <div>
      <div className="login-container">
        {
          !sendF2AisSuccessful ?
            <React.Fragment>
              <div className="input-control">
                <label htmlFor="userName" className="input-control__label">UserName</label>
                <input type="text" id="userName" className="input-control__input" value={formLogin.userName} onChange={(e) => setFormLogin({ ...formLogin, userName: e.target.value })} />
              </div>
              <div className="input-control">
                <label htmlFor="password" className="input-control__label">Password</label>
                <input type="text" id="password" className="input-control__input" value={formLogin.password} onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })} />
              </div>
              <button onClick={() => dispatch(fetchLoginUser(formLogin))}>
                login
              </button>
            </React.Fragment> :
            <React.Fragment>
              <div className="input-control">
                <label htmlFor="sendSms" className="input-control__label">Sms</label>
                <input
                  type="text"
                  id="sendSms"
                  className="input-control__input"
                  value={sms}
                  onChange={(e) => setSms(e.target.value)}
                />
              </div>
              <button
                onClick={() => dispatch(fetchLoginUser(formLogin))}
              >
                login
              </button>
            </React.Fragment>
        }
      </div>
    </div>
  )
}