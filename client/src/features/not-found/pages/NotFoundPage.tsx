import { useNavigate } from "react-router-dom";
import { NotFoundImage } from "../components/NotFoundImage"

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center space-y-3 py-12">
      <div>
        <NotFoundImage className="w-[220px] h-[190px] lg:w-[350px] lg:h-[300px]" />
      </div>
      <div>
        <h1 className="font-bold text-[20px] lg:text-[30px]">Page Not Found</h1>
      </div>
      <div>
        <p className="text-center text-[14px]">This page doesn't exist or was removed!</p>
        <p className="text-center text-[14px]">We suggest you back to home.</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          Back to homepage
        </button>
      </div>
    </div>
    
  )
}

export default NotFoundPage