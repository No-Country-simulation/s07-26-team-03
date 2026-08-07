import { Button } from "@/shared/components/ui/button/Button";
import { IoCaretForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function HeroActions() {
  const navigate = useNavigate();
  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-4
        sm:flex-row
        lg:w-auto
      "
    >
      <Button
        size="lg"
        className="sm:min-w-55"
        onClick={() => navigate('/calculator')}
      >
        Calculate my Capacity
      </Button>

      <Button
        variant="outline"
        size="lg"
        color="surface"
        onClick={() => navigate('/#how-it-works')}
        leftIcon={ <IoCaretForwardCircleOutline className="text-2xl" />}
      >
        See How it Works
      </Button>
    </div>
  );
}