"use client"
import { AppContext } from "@/context/AppContext/page";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";


const Form = (props) => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const { formType } = props;

  const { setIsUserLoggedIn, setUser, setCount } = useContext(AppContext);

  const updateStates = async (res) => {
    setEmail('');
    setPassword('');

    if (res.ok) {
      let response = await res.json();
      
      const token = response.token;
      const userId = response.user._id
      localStorage.setItem('token', token);
      localStorage.setItem('user', userId);
      setUser(userId)
      setCount(0);
      setIsUserLoggedIn(true);
      router.push('/')
    }
    else {
      alert("Can't do")
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formType === "Sign Up") {
      try {

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password
          })
        })

        updateStates(res)

      } catch (error) {
        console.log(error)
      }
      finally{
        setIsSubmitting(false)
      }
    }
    else {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password
          })
        })

        updateStates(res)

      }
      catch (error) {
        console.log(error)
      }
      finally{
        setIsSubmitting(false)
      }

    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <form className=" " onSubmit={handleSubmit}>
        <div className="relative z-0 sm:w-[40vw] md:w-[20vw] mb-5 group">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:light:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={showPass ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="floating_password"
            id="floating_password"
            className="pr-8 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:light:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>


          <div className="absolute right-1 top-4">
            {showPass && (
              <AiFillEye
                className=" cursor-pointer text-lg text-text_secondary text-black"
                onClick={() => setShowPass(() => !showPass)}
              />
            )}
            {!showPass && (
              <AiFillEyeInvisible
                className="cursor-pointer text-lg text-text_secondary text-black"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-teal-600 light:hover:bg-teal-700 light:focus:ring-teal-800 ${isSubmitting && "bg-teal-900 cursor-not-allowed"}`}
          disabled={isSubmitting}
        >
          {formType}
        </button>
        {/* <div className="py-4">
          <h1>New user? <span className=" text-green-500 hover:underline cursor-pointer">Sign Up</span></h1>
        </div> */}
      </form>
    </div>
  )
}
export default Form
