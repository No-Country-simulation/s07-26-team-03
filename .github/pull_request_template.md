## Ticket en Jira
Closes # (ID del issue)

## 📝 Descripción
## 📸 Screenshots / Video (Opcional pero recomendado para Front)
## ✅ Checklist de Auto-Revisión
*El autor del PR confirma que ha realizado lo siguiente:*

### General
- [ ] El código sigue las buenas prácticas de SOLID y Clean Code.
- [ ] No he dejado código comentado ni `console.log`, `print`, `System.out.println` innecesarios.
- [ ] He realizado una prueba manual de la funcionalidad completa.

### Backend
- [ ] **Seguridad:** Los endpoints nuevos están correctamente protegidos.
- [ ] **Datos:** Si hay modificación en la base de datos, incluir la migración correspondiente.
- [ ] **Validación:** Los DTOs deben validar toda la entrada de datos, no confiarse en el frontend.
- [ ] **Secretos:** No se han subido credenciales ni claves harcodeadas (usan `.env`).

## 🧪 Cómo probar esto
1. Loguearse como usuario X.
2. Ir a la sección Y.
3. Hacer click en Z.
4. 
