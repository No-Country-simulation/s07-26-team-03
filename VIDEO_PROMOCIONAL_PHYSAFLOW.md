# PhysaFlow — Documento de Referencia para Video Promocional

**Versión del documento:** 1.0
**Fecha:** 2026-08-18
**Fuente:** Backend API real (rama `svr/report-pdf`), documentación del proyecto, y comportamiento verificado del sistema.

---

## 1. Descripción General del Producto

PhysaFlow es una herramienta SaaS que permite a operadores de data centers calcular su **capacidad varada (stranded capacity)** en menos de 3 minutos. El usuario introduce datos básicos de su facility, obtiene un análisis detallado con costos anuales estimados, y puede compartir el resultado con colegas o descargar un PDF profesional.

**Pitch de una línea:** "Sabé cuánto dinero está perdiendo tu data center por capacidad no utilizada — en 3 minutos, sin necesidad de un especialista."

---

## 2. Flujo de Usuario (Journey)

```
[Landing] → [Auth/OTP] → [Calculator] → [Results] → [Share] / [PDF] / [Scenarios]
```

---

## 3. Screens — Descripción Detallada

---

### 3.1 Pantalla: Landing / Calculator (Entrada)

**URL:** `https://physaflow.netlify.app/` (frontend Netlify)

**Descripción visual:**
- Diseño limpio, minimalista, orientado a datos.
- Paleta de colores: azul oscuro corporativo (#19375F como el BRAND_COLOR del PDF), acentos en azul claro/celeste, texto blanco sobre fondos oscuros.
- Header: Logo "PhysaFlow" a la izquierda, navegación simple.
- Hero section centrada con título: "Calculadora de Capacidad Varada" o similar.
- Subtítulo: "Descubrí cuánto dinero está perdiendo tu data center por capacidad no utilizada."

**Formulario de entrada (el inputs del assessment):**

| Campo | Tipo | Valores de ejemplo | Descripción |
|---|---|---|---|
| `facilityMw` | number | `1.00` | Capacidad total del facility en MW |
| `utilization` | number | `100.00` | Porcentaje de utilización (0–100%) |
| `coolingType` | select | `AIR`, `HYBRID`, `LIQUID`, `INMERSION` | Tipo de sistema de enfriamiento |
| `sessionId` | uuid (opcional) | `3fa85f64-...` | ID de sesión para tracking |
| `leadId` | uuid (opcional) | `3fa85f64-...` | ID del lead (usuarios autenticados) |

**Valores de ejemplo para el video:**

```json
{
  "facilityMw": 1.00,
  "utilization": 100.00,
  "coolingType": "AIR"
}
```

**CTA:** Botón principal "Calcular" o "Obtener mi análisis" — grande, azul, prominente.

**Indicadores de confianza:** "Resultados en menos de 3 minutos", "Sin tarjeta de crédito", "Tus datos no se almacenan sin tu consentimiento."

---

### 3.2 Pantalla: Resultados del Análisis

**URL aproximada:** `https://physaflow.netlify.app/assessment/{id}` (detrás de `GET /api/v1/assessments/{id}`)

**Descripción visual:**
- Fondo blanco/gris claro con cards flotantes.
- Sección de métricas clave (KPI cards) en la parte superior:

**KPI Cards (4 cards en grid):**

| Card | Valor ejemplo | Descripción |
|---|---|---|
| **Capacidad Varada** | `0.54 MW` | Capacidad instalada que no genera valor |
| **Porcentaje Varado** | `54.00 %` | Porcentaje de la capacidad total desperdiciada |
| **Costo Anual (mín)** | `$638,604` | Costo mínimo anual por la energía perdida |
| **Costo Anual (máx)** | `$780,516` | Costo máximo anual (margen del 10%) |

**Capacity Score (badge/medalla):**

| Score | Color asociado | Significado |
|---|---|---|
| `A+`, `A`, `A-` | Verde | Excelente — muy poca capacidad varada |
| `B+`, `B`, `B-` | Verde claro | Bueno — capacidad varada moderada |
| `C+`, `C` | Amarillo/Naranja | Regular — oportunidad de mejora |
| `D` | Naranja | Por debajo del promedio |
| `F` | Rojo | Crítico — acción inmediata necesaria |

**Ejemplo real del sistema:**
```
Capacity Score: B-
Color: Naranja claro
Texto: "Tu facility está perdiendo una cantidad sustancial de capacidad y presupuesto cada año."
```

**Sección: Recomendación automática**
- Card con ícono de bombilla/idea.
- Texto: *"Hay espacio para una mejora significativa. Una porción importante de tu capacidad instalada no está generando valor — revisa el desglose por capas para ubicar dónde ocurren las mayores pérdidas."*

**Acciones disponibles:**
- "Ver análisis por capas" (botón secundario)
- "Comparar escenarios" (botón secundario)
- "Descargar PDF" (botón primario — descarga el reporte)
- "Compartir" (botón terciario — genera link público)

---

### 3.3 Pantalla: Análisis por Capas

**URL aproximada:** `https://physaflow.netlify.app/assessment/{id}/layers`

**Descripción visual:**
- Título: "Desglose por Capas"
- Gráfico de barras horizontal o de embudo (funnel) mostrando la caída de capacidad por capa.

**Tabla de Capas:**

| Capa | Entrada (MW) | Salida (MW) | Pérdida (MW) | Pérdida (%) | Indicador visual |
|---|---|---|---|---|---|
| **Facility** | 1.00 | 0.64 | 0.36 | 36.25% | Barra de pérdida roja |
| **IT** | 0.64 | 0.51 | 0.13 | 20.00% | Barra de pérdida naranja |
| **Workload** | 0.51 | 0.46 | 0.05 | 10.00% | Barra de pérdida amarilla |

**Factores de pérdida por capa:**

*Facility:*
- Cooling: `0.15 MW` (40%)
- Power distribution: `0.13 MW` (35%)
- Unused capacity: `0.09 MW` (25%)

*IT:*
- Over provisioning: `0.05 MW` (40%)
- Underutilized servers: `0.04 MW` (35%)
- Network inefficiency: `0.03 MW` (25%)

*Workload:*
- Idle workloads: `0.02 MW` (40%)
- Poor scheduling: `0.02 MW` (35%)
- Ghost VMs: `0.01 MW` (25%)

**Visual sugerido:** Cada factor de pérdida como una fila expandible dentro de su capa, con mini-barras de porcentaje y valores en MW.

---

### 3.4 Pantalla: Escenarios

**URL aproximada:** `https://physaflow.netlify.app/assessment/{id}/scenarios`

**Descripción visual:**
- Título: "Escenarios de Optimización"
- Cards o tabla comparativa de escenarios.

**Escenarios generados:**

| Escenario | Utilización | Enfriamiento | Varada (MW) | Varada (%) | Costo Anual (rango) | Score |
|---|---|---|---|---|---|---|
| **Estado Actual** | 100% | Aire | 0.54 MW | 54.00% | $638,604 — $780,516 | B- |
| **Optimización de Utilización** | 90% | Aire | 0.59 MW | 59.00% | $697,734 — $852,786 | B- |
| **Optimización de Infraestructura** | 90% | Híbrido | 0.56 MW | 56.00% | $662,256 — $809,424 | B- |

**Visual sugerido para el video:**
- Gráfico de líneas comparativo: eje X = escenarios, eje Y = costo anual o % varado.
- El escenario "Optimización de Infraestructura" debería mostrar mejora visible vs Estado Actual.

---

### 3.5 Pantalla: Compartir / Link Público

**URL aproximada:** `https://physaflow.netlify.app/share/{token}`

**Descripción visual:**
- Título: "Compartí tu análisis"
- Input readonly con el link público: `https://physaflow.netlify.app/share/LPivwJ8YhwWq7...`
- Botones: "Copiar link", "Enviar por email"
- Indicador: "Este link expira en 7 días"
- Preview miniature del resultado compartido

**Datos visibles en el link público (sin login):**
- Facility MW, Utilización, Cooling Type
- Stranded MW y %
- Costos anuales min/max
- Capacity Score
- Recomendación

**Nota de seguridad:** El link público no expone información del usuario (no muestra email, nombre, company del lead).

---

### 3.6 Pantalla: Descargar PDF

**Acción:** Click en "Descargar PDF" → descarga archivo `physaflow-report-{id}.pdf`

**Descripción visual del PDF (2 páginas, formato A4):**

```
╔══════════════════════════════════════════════╗
║  PhysaFlow                                  ║
║  Reporte de Capacidad Varada                ║
║  Assessment ID: 200b0a47-...  Generado: ...  ║
╠══════════════════════════════════════════════╣
║  DATOS DE ENTRADA                           ║
║  Capacidad del facility    │  1.00 MW       ║
║  Utilización              │  100.00 %       ║
║  Tipo de enfriamiento     │  Aire          ║
╠══════════════════════════════════════════════╣
║  RESULTADOS DEL ANÁLISIS                    ║
║  Capacidad varada         │  0.54 MW       ║
║  Porcentaje varado        │  54.00 %       ║
║  Costo anual (mín)       │  $ 638,604.00  ║
║  Costo anual (máx)        │  $ 780,516.00  ║
║  Capacity Score           │  B-            ║
║  Versión del algoritmo   │  v1.2.0-core   ║
╠══════════════════════════════════════════════╣
║  RECOMENDACIÓN                              ║
║  Hay espacio para una mejora significativa... ║
╠══════════════════════════════════════════════╣
║  ANÁLISIS POR CAPAS                        ║
║  Capa     Entrada  Salida  Pérdida  %      ║
║  Facility  1.00     0.64    0.36     36.25%║
║  IT        0.64     0.51    0.13     20.00%║
║  Workload  0.51     0.46    0.05     10.00%║
║                                              ║
║  Factores — Facility:                       ║
║    • Cooling: 0.15 MW (40.00%)             ║
║    • Power distribution: 0.13 MW (35.00%)   ║
║    • Unused capacity: 0.09 MW (25.00%)      ║
╠══════════════════════════════════════════════╣
║  ESCENARIOS                                 ║
║  Escenario       Util   VaradaMW  Costo     ║
║  Estado actual   100%   0.54      B-       ║
║  Utiliz. Optim.  90%    0.59      B-       ║
║  Infra. Optim.    90%    0.56      B-       ║
╚══════════════════════════════════════════════╝
```

** Branding del PDF:**
- Título: PhysaFlow (bold, azul oscuro #19375F)
- Subtítulo: "Reporte de Capacidad Varada"
- Header con ID de assessment y timestamp de generación
- Footer: "Generado por PhysaFlow — physaflow.com"

---

## 4. Paleta de Colores (Extraída del Backend)

```css
/* Brand primary — azul oscuro corporativo */
--color-brand:    #19375F;

/* Header background en tablas */
--color-header:   #E6ECF5;

/* Status colors */
--color-score-a:  #28a745;  /* Verde — score excelente */
--color-score-b:  #7bc47f;  /* Verde claro — score bueno */
--color-score-c:  #f0ad4e;  /* Amarillo/Naranja — score regular */
--color-score-d:  #fd7e14;  /* Naranja — por debajo del promedio */
--color-score-f:  #dc3545;  /* Rojo — crítico */

/* Textos */
--text-primary:   #212529;
--text-secondary: #5a5a5a;
--text-muted:     #909090;
```

---

## 5. Tipografía

- **Títulos:** Helvetica Neue Bold / Inter Bold — 18–24px
- **Subtítulos:** Helvetica Neue Medium / Inter Medium — 14–16px
- **Cuerpo:** Helvetica Neue Regular / Inter Regular — 12–14px
- **Datos numéricos (KPIs):** SF Mono / Roboto Mono — 20–32px, bold
- **Labels de tablas:** 11–12px, uppercase, letter-spacing: 0.5px

---

## 6. Animaciones Sugeridas para el Video

| Momento | Animación sugerida |
|---|---|
| Hero / Calculator | Fade-in del formulario con los campos apareciendo uno por uno (stagger 150ms) |
| Click en "Calcular" | Spinner/chumber en el botón → transición rápida tipo slide-up |
| Aparición de resultados | KPI cards aparecen en grid con count-up animation en los números (0 → valor final en 800ms) |
| Capacity Score | Badge aparece con scale-in y color que se llena |
| Análisis por capas | Las barras de embudo se llenan de derecha a izquierda secuencialmente |
| Escenarios | Gráfico comparativo se dibuja línea por línea |
| PDF | Icono de descarga con pulse, luego el visor de PDF se abre |
| Share | Link aparece con un efecto de typing, botón "Copiado" con checkmark |

---

## 7. Datos Reales del Sistema (Ejemplo Completo)

Los siguientes datos fueron generados por el sistema real funcionando:

**Assessment ID:** `200b0a47-405b-42fa-a628-7e503647201a`
**Facility:** 1.00 MW | Utilización: 100% | Enfriamiento: Aire
**Creado:** 16/08/2026 18:33 UTC

**Resultado:**
- Capacidad varada: 0.54 MW (54.00%)
- Costos: $638,604 — $780,516 anuales
- Capacity Score: B-
- Recomendación: "Hay espacio para una mejora significativa. Una porción importante de tu capacidad instalada no está generando valor — revisa el desglose por capas para ubicar dónde ocurren las mayores pérdidas."

**Capas:**
- Facility: 1.00 → 0.64 MW (36.25% pérdida)
- IT: 0.64 → 0.51 MW (20.00% pérdida)
- Workload: 0.51 → 0.46 MW (10.00% pérdida)

**Escenarios:**
1. Estado actual: 100% util, Aire, 0.54 MW varado, $638K–$780K, Score B-
2. Optimización de utilización: 90% util, Aire, 0.59 MW varado, $697K–$852K, Score B-
3. Optimización de infraestructura: 90% util, Híbrido, 0.56 MW varado, $662K–$809K, Score B-

---

## 8. Notas para el Creador del Video

1. **No uses imágenes genéricas de data centers** — el producto es una herramienta SaaS, no una visita física a un data center.
2. **El foco debe estar en los números y la claridad visual** — el valor del producto es la velocidad y la precisión del análisis.
3. **El momento "wow" es cuando aparecen los costos anuales** — el usuario ve $638,000 dólares anuales perdidos en energía. Ese es el gancho principal.
4. **El flujo completo para el video debe ser:** Calculator → Results (KPI cards con números grandes) → Share link → PDF (preview del documento real).
5. **Duración recomendada:** 60–90 segundos para un video promocional de producto SaaS.
6. **Música sugerida:** Electrónica suave / corporate chill — sin letra, minimal.
7. **El PDF es un diferenciador clave** — mostrale al final como evidencia descargable que el usuario puede compartir con su equipo.

---

## 9. API Endpoints del Backend (Referencia)

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/api/v1/assessments` | No | Crear assessment y calcular resultado |
| `GET` | `/api/v1/assessments/{id}` | No | Obtener resultado de un assessment |
| `POST` | `/api/v1/assessments/{id}/layer-analysis` | JWT | Generar análisis por capas |
| `GET` | `/api/v1/assessments/{id}/layer-analysis` | JWT | Obtener análisis por capas |
| `POST` | `/api/v1/assessments/{id}/scenarios` | JWT | Generar escenarios de optimización |
| `GET` | `/api/v1/assessments/{id}/scenarios` | JWT | Obtener escenarios |
| `POST` | `/api/v1/assessments/{id}/shares` | JWT | Crear link público para compartir |
| `GET` | `/api/v1/public/shares/{token}` | No | Obtener resultado vía link público |
| `GET` | `/api/v1/assessments/{id}/report/pdf` | JWT | **Descargar PDF del assessment** |
| `GET` | `/api/v1/public/shares/{token}/report/pdf` | No | **Descargar PDF vía link público** |
| `POST` | `/api/v1/auth/request-otp` | No | Solicitar código OTP por email |
| `POST` | `/api/v1/auth/verify-otp` | No | Verificar OTP y recibir JWT |

---

*Documento generado el 2026-08-18 basado en la implementación real del backend (rama `svr/report-pdf`, commit `d8f8452`).*
