import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import { gsUrlApi } from '../config/configServers';
import '../Login/App.css'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            EstadoForm: true,
            EstadoAlerta: false,
            
        }
    }

    CrearUsuario = () => {
        let ObjeData = {}
        if (this.state.Password === this.state.ConfirmPassword) {
            ObjeData.Usuario = this.state.Username
            ObjeData.Correo = this.state.Email
            ObjeData.Password = this.state.Password
            fetch(gsUrlApi + '/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ObjeData)
            })
                .then(res => res.json())
                .then(data => data)
                .then(data => {
                    
                    if (data.message === "Usuario creado correctamente") {
                        alert(data.message)
                        this.MostrarFormulario()
                        this.setState ({                            
                            ConfirmPassword : '',
                            Password : '',
                            Email : '',
                            Username : '',
                            EmailLogin : '',
                            PasswordLogin : '',                          
                        })
                    }else{
                        alert(data.message)
                    }
                })
        }
        else {
            alert('Las contraseñas no coinciden')
        }


    }
    
    IniciarSesion = () => {
        let ObjeData = {}
        ObjeData.CorreoLogin = this.state.EmailLogin
        ObjeData.PasswordLogin = this.state.PasswordLogin
        fetch(gsUrlApi + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ObjeData)
        })
            .then(res => res.json())
            .then(data => data)
            .then(data => {
                if (data.message === "Login correcto") {
                    alert(data.message)
                    this.setState({
                        EmailLogin: '',
                        PasswordLogin: ''
                    })
                    localStorage.setItem('token', data.token)
                    window.location = '/Inicio'
                }
                else {
                    alert(data.message)
                }
            })

    }
    onInputchange = data => {
        if (data) {
            let name = data.target.name;
            let value = data.target.value;
            this.setState(state => ({
                ...state, [name]: value,
            }));
        }
    }
    MostrarFormulario = () => {
        this.setState({ EstadoForm: !this.state.EstadoForm });
    }
    render() {
        return (
            <>

                <br></br>
                <div className="container w-75 bg-warning mt-5 rounded shadow">
                    <div className="row align-items-stretch">
                        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">

                        </div>
                        <div className="col bg-white p-5 rounded-end">
                            {this.state.EstadoForm ?
                                <>
                                    <h2 className="fw-bold  py-5">Bienvenid@ a CoolNote</h2>
                                    <form>

                                        <div className="mb-3" >
                                            <TextField                                              
                                                type="email"
                                                label="Correo"
                                                name="EmailLogin"
                                                value={this.state.EmailLogin}
                                                variant="outlined"
                                                onChange={this.onInputchange}
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <TextField
                                                name="PasswordLogin"
                                                value={this.state.PasswordLogin}
                                                onChange={this.onInputchange}                                                
                                                label="Contraseña"
                                                type="password"
                                                autoComplete="current-password"
                                                fullWidth
                                                required
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <Button 
                                            variant="primary" 
                                            type="button"
                                            onClick={() => this.IniciarSesion()}
                                            >
                                                Iniciar Sesión
                                            </Button>
                                        </div>
                                        <div className="my-3">
                                            <span>No tienes cuenta? <button type="button" className="btn btn-link" onClick={() => this.MostrarFormulario()}>Registrate</button></span>
                                            <br></br>
                                            {/*  <span>Olvidaste tu contraseña <a>Recuperar</a></span> */}
                                        </div>
                                    </form>
                                </>
                                : <>
                                    <h2 className="fw-bold  py-5">Bienvenid@ a CoolNote</h2>
                                    <form>
                                        <div className="mb-3" >
                                            <TextField
                                                name='Username'
                                                value={this.state.Username}
                                                onChange={this.onInputchange}
                                                type="text"
                                                label="Nombre usuario"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </div>
                                        <div className="mb-3" >
                                            <TextField
                                                name='Email'
                                                value={this.state.Email}
                                                onChange={this.onInputchange}
                                                type="email"
                                                label="Correo"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <TextField
                                                name='Password'
                                                value={this.state.Password}
                                                onChange={this.onInputchange}
                                                label="Contraseña"
                                                type="password"
                                                autoComplete="current-password"
                                                fullWidth
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <TextField                                                
                                                name='ConfirmPassword'
                                                value={this.state.ConfirmPassword}
                                                onChange={this.onInputchange}
                                                label="Confirmar Contraseña"
                                                type="password"
                                                autoComplete="current-password"
                                                fullWidth
                                                required
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <Button
                                                variant="primary"
                                                type="button"
                                                onClick={() => this.CrearUsuario()}
                                            >
                                                Registrate
                                            </Button>
                                        </div>
                                        <div className="my-3">
                                            <span>Ya tienes cuenta? <button type="button" className="btn btn-link" onClick={() => this.MostrarFormulario()}>Iniciar Sesión</button></span>
                                            <br></br>
                                            {/* <span>Olvidaste tu contraseña <a>Recuperar</a></span> */}
                                        </div>
                                    </form>

                                </>}
                        </div>
                    </div>

                </div>
            </>
        );
    }
}