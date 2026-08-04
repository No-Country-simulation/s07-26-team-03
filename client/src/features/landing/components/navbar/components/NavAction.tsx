import { Button } from '@/shared/components/ui/button/Button'
import { useNavigate } from 'react-router-dom';

export const NavAction = () => {
  const navigate = useNavigate();
  return (
   
   <div className="hidden items-center gap-3 lg:flex">
        <Button 
        variant="outline" 
        color="surface"
         onClick={() => navigate('/login')}
         >
        Login
        </Button>

        <Button 
          onClick={() => navigate('/calculator')} 
          color="success"
        >
        Get Started Free
        </Button>
    </div>
  )
}
