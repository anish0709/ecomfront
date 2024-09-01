import { useState } from 'react'
import { register } from '../api/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({ name: "", email: "", password: "", phone: ""})

    const navigate = useNavigate()

    const handelchange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handelregister = async (e) => {
        e.preventDefault()
        const output = await register(data)
        console.log("bbb", output)
        if (output.status === 200) {
            navigate("/login")
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
                title: "Signed in successfully"
            });
        }
        setData({ name: "", email: "", password: "", phone: ""})
    }

    return (
        <>
            <div className='container w-25 text-center'>
                <form onSubmit={handelregister}>
                    <div>
                        <input type="text" name='name' value={data.name} onChange={handelchange} placeholder='enter name here' className='form-control' required />
                    </div>
                    <div>
                        <input type="email" name='email' value={data.email} onChange={handelchange} placeholder='enter email here' className='form-control' required />
                    </div>
                    <div>
                        <input type="text" name='password' value={data.password} onChange={handelchange} placeholder='enter password here' className='form-control' required />
                    </div>
                    <div>
                        <input type="text" name='phone' value={data.phone} onChange={handelchange} placeholder='enter phone no. here' className='form-control' required />
                    </div>

                    <div>
                        <input type="submit" value={"Register"} className='btn btn-success btn-sm btn-outline-dark' />
                    </div>
                    
                </form>
            </div>


        </>)
}

export default Register