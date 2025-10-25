import styles from './login.module.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utilities/others/axios.js';


function Co_login() {

    const navigate = useNavigate();
    
    const mainFormRef = useRef(null);
    const upperBarLoginRef = useRef(null);
    const upperBarRegisterRef = useRef(null);

    const loginRef = useRef(null);
    const errorLoginRef = useRef(null);
    const login_emailInputRef = useRef(null);
    const login_passwordInputRef = useRef(null);

    const registerRef = useRef(null);
    const errorRegisterRef = useRef(null);
    const register_usernameInputRef = useRef(null);
    const register_emailInputRef = useRef(null);
    const register_passwordInputRef = useRef(null);
    const register_confirmInputRef = useRef(null);

    const [isLogin, setIsLogin] = useState(true);

    // === login/register UI Switching ===
    const handleUpperBarLoginClick = () => {
        if (isLogin == false) {
            upperBarRegisterRef.current.classList.remove(styles.active)
            upperBarLoginRef.current.classList.add(styles.active)

            registerRef.current.style.opacity = 0;
            setTimeout(() => {
                registerRef.current.classList.add(styles.hidden)
                loginRef.current.classList.remove(styles.hidden)

                setTimeout(() => {
                    loginRef.current.style.opacity = 1;
                }, 200);
            }, 200);

            setIsLogin(true);
        }
    };

    const handleUpperBarRegisterClick = () => {
        if (isLogin == true) {
            upperBarLoginRef.current.classList.remove(styles.active)
            upperBarRegisterRef.current.classList.add(styles.active)

            loginRef.current.style.opacity = 0;
            setTimeout(() => {
                loginRef.current.classList.add(styles.hidden)
                registerRef.current.classList.remove(styles.hidden)

                setTimeout(() => {
                    registerRef.current.style.opacity = 1;
                }, 200);
            }, 200);

            setIsLogin(false);
        }
    };

    // === LOGIN ===
    const handleLoginClick = async () => {
        const email = login_emailInputRef.current.value.trim();
        const password = login_passwordInputRef.current.value;

        if (!email || !password) {
            errorLoginRef.current.textContent = "Please enter email and password.";
            return;
        }

        try {
            const res = await api.post('/accounts/login', 
                {
                    email, 
                    password 
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));


            mainFormRef.current.classList.remove(styles.shown)

            setTimeout(() => {
                navigate('/pages/menu');
            }, 510);
        } catch (err) {
            console.log(`Server: ${err.response?.data?.msg}`)
            errorLoginRef.current.textContent = err.response?.data?.msg;
        }
    };

    // === REGISTER ===
    const handleRegisterClick = async () => {
        const username = register_usernameInputRef.current.value.trim();
        const email = register_emailInputRef.current.value.trim();
        const password = register_passwordInputRef.current.value;
        const confirm = register_confirmInputRef.current.value;

        if (!username || !email || !password || !confirm) {
            errorRegisterRef.current.textContent = "Please fill all fields.";
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorRegisterRef.current.textContent = "Invalid email format.";
            return;
        }

        // Password strength validation
        if (password.length < 8) {
            errorRegisterRef.current.textContent = "Password must be at least 8 characters.";
            return;
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            errorRegisterRef.current.textContent = "Password must include uppercase, lowercase, and a number.";
            return;
        }

        if (password !== confirm) {
            errorRegisterRef.current.textContent = "Passwords do not match.";
            return;
        }

        try {
            const res = await api.post('/accounts/register', 
                { 
                    username, 
                    email, 
                    password 
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));


            mainFormRef.current.classList.remove(styles.shown)

            setTimeout(() => {
                navigate('/pages/menu');
            }, 510); 
        } catch (err) {
            console.log(`Server: ${err.response?.data?.msg}`)
            errorLoginRef.current.textContent = "Server error: check console log";
        }       
    };


    useEffect(() => {
        upperBarLoginRef.current.classList.add(styles.active)
        registerRef.current.classList.add(styles.hidden)
        registerRef.current.style.opacity = 0;
        mainFormRef.current.classList.add(styles.shown)


        // auto login
        const token = localStorage.getItem("token");
        if (!token) return;

        api.get('/accounts/me')
            .then((res) => {
                // Optional: refresh user info from backend
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/pages/menu');
            })
            .catch(() => {
                // console.warn("Auto login failed:", err.response?.data?.msg);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <div className={styles.main_login}>
            <form className={styles.form} ref={mainFormRef}>
                <div className={styles.upperBar}>
                    <button type="button" 
                        ref={upperBarLoginRef}
                        onClick={handleUpperBarLoginClick}
                    >Login</button>

                    <button type="button" 
                        ref={upperBarRegisterRef}
                        onClick={handleUpperBarRegisterClick}
                    >Register</button>
                </div>

                <div className={styles.login} ref={loginRef}>
                    <div className={styles.inputs}>
                        <p ref={errorLoginRef}></p>
                        <input type="email" placeholder="Email" ref={login_emailInputRef}></input>
                        <input type="password" placeholder="Password" ref={login_passwordInputRef}></input>

                        <div className={styles.horizontalAlign}>
                            <input type="checkbox" id="savePassword"></input>
                            <label htmlFor="savePassword">Save password</label>
                        </div>
                    </div>

                    <button type="button" onClick={handleLoginClick}>Login</button>
                </div>

                <div className={styles.register} ref={registerRef}>
                    <div className={styles.inputs}>
                        <p ref={errorRegisterRef}></p>
                        <input type="text" placeholder="Username" ref={register_usernameInputRef}></input>
                        <input type="email" placeholder="Email" ref={register_emailInputRef}></input>
                        <input type="password" placeholder="Password" ref={register_passwordInputRef}></input>
                        <input type="password" placeholder="Confirm password" ref={register_confirmInputRef}></input>

                        <div className={styles.horizontalAlign}>
                            <input type="checkbox" id="nothing"></input>
                            <label htmlFor="nothing">By registering, you agree with our <span className={styles.blueText}>term of services.</span></label>
                        </div>
                    </div>

                    <button type="button" onClick={handleRegisterClick}>Create account</button>
                </div>
            </form>

        </div>
    );
}

export default Co_login