export const useCapacityFlowActions = () => {
  const handleFlowView = () => {
    alert("Acción ejecutada: Cambiando a la vista 'Flow View'");
  };

  const handleBreakdownView = () => {
    alert("Acción ejecutada: Cambiando a la vista 'Breakdown View'");
  };

  const handleMoreOptions = () => {
    alert("Acción ejecutada: Abriendo el menú de opciones adicionales");
  };

  return {
    handleFlowView,
    handleBreakdownView,
    handleMoreOptions,
  };
};