import { Button } from '@/shared/components/ui/button/Button'
import { useNavigate } from 'react-router-dom';

export const NavAction = () => {
  const navigate = useNavigate();
  return (
   
   <>
        <Button 
        variant="outline" 
        color="success"
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
    </>
  )
}
