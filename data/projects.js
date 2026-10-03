/**
 * Projects Data Module
 * 
 * Este archivo exporta los datos de proyectos como variable JS.
 * Esto permite que la página funcione tanto con servidor local
 * como abriendo index.html directamente desde el sistema de archivos.
 * 
 * Para agregar un nuevo proyecto, simplemente añade un nuevo objeto
 * al array siguiendo la misma estructura.
 */
const PROJECTS_DATA = [
  {
    "id": "cohort-retention",
    "title": "Análisis de Retención Empleados y Metricas RRHH",
    "summary": "Analicé el comportamiento de salida de los empleados en una empresa del sector financiero Dominicano, para poder identificar los factores clave de la rotación de empleados y otras metricas de RRHH para la mejora continua.",
    "problem": "Una entidad del sector financiero dominicano enfrentaba una tasa de rotación de personal no controlada, generando pérdidas de capital intelectual, altos costos recurrentes de reclutamiento y capacitación, y fricción operativa en áreas críticas de servicio y cumplimiento regulatorio. La gestión de Recursos Humanos operaba de forma reactiva debido a la falta de métricas consolidadas y a la ausencia de visibilidad sobre las variables determinantes (antigüedad, bandas salariales, liderazgo o estancamiento profesional) que motivaban la salida voluntaria de los colaboradores.",
    "analysis": "Se llevó a cabo una evaluación cuantitativa y estructurada del historial de desvinculaciones dentro de la entidad, con datos claves en capacitación, rotación y desempeño de los empleados.",
    "impact": "Transformación del área de gestión humana de un rol administrativo a un socio estratégico, sustituyendo suposiciones con indicadores objetivos para la toma de decisiones. Disminución en los gastos asociados a procesos de selección urgentes, curvas de aprendizaje e indemnizaciones innecesarias.",
    "tags": [
      "Estadística",
      "Excel",
      "Power BI"
    ],
    "category": [
      "excel",
      "powerbi"
    ],
    "links": {
      "github": "https://github.com/tu-usuario/cohort-retention-analysis",
      "dashboard": "https://public.tableau.com/views/demo-cohort",
      "report": "https://github.com/tu-usuario/cohort-retention-analysis/blob/main/REPORT.md"
    },
    "metrics": [
      {
        "value": "-11pp",
        "label": "Churn temprano"
      },
      {
        "value": "60%",
        "label": "Churn en M2-M3 detectado"
      },
      {
        "value": "8.5% → 5.2%",
        "label": "Churn mensual"
      }
    ]
  }
];
