import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { Password } from 'primereact/password';
import { useState } from "react";
import { Button } from "primereact/button";

const LoginContainer = styled.section`
  whidth: 100%;
  heigth: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;  
  & form {
    width: 400px;
    & h1 {
        text-align: center;
    }
    & label {
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 6px;
        color: #777;
        display: block;
    }
    & input {
        width: 100%;
        margin-bottom: 10px;
    }
    & div {
        width: 100%;
    }
    & .p-button {
      width: 100%;
      margin-top: 16px;
  }
`;

const Login = () => {

    const [value, setValue] = useState('');

    return (
        <LoginContainer>
          <form >
            <h1>LOGIN</h1>
            <label htmlFor="usuario">Usuário</label>
            <InputText 
              id="nome"
              placeholder="Digite seu Usuário"/>
            <label htmlFor="senha">Senha</label>
            <div className="card flex w-full">
              <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
            </div>
            <Button label="Entrar"/>
          </form>
        </LoginContainer>
    );
}

export default Login;