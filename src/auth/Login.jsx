import { useState } from 'react';
import { login } from '../api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handelchange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handelLogin = async (e) => {
        e.preventDefault();
        const output = await login(data);
        console.log("bbb", output);

        if (output.status === 200) {
            localStorage.setItem("token", output.token);
            localStorage.setItem("user", JSON.stringify(output.checkData));
            dispatch(setUser(output.checkData));
            navigate("/");
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "logged in successfully"
            });
        }
        setData({ email: "", password: "" });
    };

    return (
        <div className='container w-25 text-center'>
            <form onSubmit={handelLogin}>
                <div>
                    <input type="email" name='email' value={data.email} onChange={handelchange} placeholder='enter email here' className='form-control' required />
                </div>
                <div>
                    <input type="text" name='password' value={data.password} onChange={handelchange} placeholder='enter password here' className='form-control' required />
                </div>
                <div>
                    <input type="submit" value={"Login"} className='btn btn-success btn-sm btn-outline-dark' />
                </div>
            </form>
        </div>
    );
};

export default Login;
