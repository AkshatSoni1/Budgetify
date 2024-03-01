import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
const ToggleMode = (props) => {
    const {mode,setMode} = props;
    const handleClick = () => {
        setMode((mode)=> (mode==='light')?'dark':'light')
    }
  return (
    <div onClick={handleClick} className={`absolute max-sm:top-5 max-sm:right-36 right-10 sm:bottom-10 border  rounded-lg cursor-pointer ${mode==='dark'?"bg-gray-200 shadow-md shadow-gray-800 border-white p-1":"bg-gray-900 shadow-sm shadow-gray-400 border-black p-2"} z-50 max-sm:bg-transparent max-sm:border-none max-sm:shadow-none max-sm:px-1`}>
      {mode==='light'?<BsFillMoonStarsFill className="text-2xl md:text-3xl text-yellow-200 max-sm:text-yellow-100"/>:<BsSunFill className="text-yellow-400 text-3xl md:text-4xl max-sm:text-orange-400"/>}
    </div>
  )
}

export default ToggleMode
