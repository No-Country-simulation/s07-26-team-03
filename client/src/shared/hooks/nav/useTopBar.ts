import { useState, type ChangeEvent, type SyntheticEvent } from "react";

export function useTopBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    alert(`Buscando: "${searchQuery}"`);
  };

  const handleCalendarClick = () => {
    alert("Abrir calendario de eventos");
  };

  const handleSupportClick = () => {
    alert("Abrir centro de ayuda y soporte");
  };

  const handleNotificationsClick = () => {
    alert("Abrir panel de notificaciones");
  };

  const handleUserMenuClick = () => {
    alert("Desplegar submenu de usuario");
  };

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleCalendarClick,
    handleSupportClick,
    handleNotificationsClick,
    handleUserMenuClick,
  };
}