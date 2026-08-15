export const useCompareScenariosActions = () => {
  const handleViewScenarios = () => {
    alert("Acción ejecutada: Abriendo comparativa de escenarios completos");
  };

  const handleDownloadPDF = () => {
    alert("Acción ejecutada: Descargando reporte en formato PDF");
  };

  const handleShareResults = () => {
    alert("Acción ejecutada: Compartiendo resultados del reporte");
  };

  return {
    handleViewScenarios,
    handleDownloadPDF,
    handleShareResults,
  };
};