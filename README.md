# Million Frontend

Frontend de la plataforma **Million**, desarrollado con **React + TypeScript + Vite**, bajo los principios de **Clean Architecture** y **SOLID**, asegurando escalabilidad, mantenibilidad y facilidad de pruebas.

---

[![CI/CD](https://img.shields.io/github/actions/workflow/status/imeshinnovation/million-frontend/ci.yml?style=for-the-badge&logo=github)](https://github.com/imeshinnovation/million-frontend/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/Code_Style-ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Formatter-Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![SOLID](https://img.shields.io/badge/Principles-SOLID-orange?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-blueviolet?style=for-the-badge)
![License](https://img.shields.io/github/license/imeshinnovation/million-frontend?style=for-the-badge)

---

## 📂 Estructura del Proyecto

```bash
/public
/src
  /api                 # Módulos de comunicación con el backend (fetch/axios)
  /components/Layout   # Componentes de diseño global (headers, footers, sidebars)
  /features/properties # Funcionalidades específicas de propiedades (vista, lógica)
  /pages               # Rutas principales de la aplicación (Next.js/React Router)
  /styles              # Estilos globales y modulares (CSS/SCSS)
  /utils               # Utilidades y helpers reutilizables
```

Esta organización permite mantener el proyecto modular, escalable y alineado con **Clean Architecture**, desacoplando la lógica de negocio de los frameworks o librerías.

---

## Entornos de Ejecución del Proyecto

```bash

El proyecto cuenta con dos archivos de environment:
- .env.development
- .env.production

Debes ajustas los parametros según el entorno a ejecutar.

Para Pruebas ejecuta el proyecto así:
- npm run dev

Para Producción ejecuta el proyecto así:
- npm run prod

```

---

## 📐 Diagrama de Arquitectura (Mermaid)

```mermaid
flowchart TD
  subgraph UI[Presentation Layer]
    A[Pages] --> B[Layout Components]
    B --> C[Features / Properties]
  end

  subgraph App[Application Layer]
    C --> D[Utils & Business Logic]
  end

  subgraph Infra[Infrastructure Layer]
    D --> E[API Calls]
    E --> F[Backend / External Services]
  end

  UI --> App
  App --> Infra
```

Este flujo asegura que la **dependencia siempre apunte hacia adentro**, protegiendo la lógica de negocio y garantizando bajo acoplamiento.

---

## 🛠️ Principios SOLID aplicados

| Principio | Implementación |
|-----------|----------------|
| **S**ingle Responsibility | Cada módulo tiene una responsabilidad única: `api` maneja peticiones HTTP, `features/properties` la lógica de propiedades, `Layout` la UI global. |
| **O**pen/Closed | Nuevas funcionalidades se agregan como `features` sin modificar módulos existentes. |
| **L**iskov Substitution | Los servicios de `api` pueden ser reemplazados por mocks en pruebas. |
| **I**nterface Segregation | Las utilidades (`utils`) se crean de forma modular para ser consumidas sin dependencias innecesarias. |
| **D**ependency Inversion | La lógica de negocio (`features`) depende de abstracciones (`utils` y `api`), no de implementaciones concretas. |

---

## ✅ Estrategia de Pruebas

El proyecto aplica pruebas con **Jest** y **React Testing Library**.

- **Unitarias** → funciones puras en `utils` y hooks.  
- **Integración** → interacción entre `features` y `api`.  
- **End-to-End (E2E)** → flujos de usuario en `pages`.  

### Diagrama de Flujo de Pruebas

```mermaid
graph TD
  A[Unit Tests - Utils] --> B[Integration Tests - Features + API]
  B --> C[E2E Tests - Pages]
  C --> D[Coverage & Reports]
```

### Comandos de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Modo watch
npm test -- --watch

# Reporte de cobertura
npm test -- --coverage


--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |     100 |      100 |     100 |     100 |                   
 features/properties/components |     100 |      100 |     100 |     100 |                   
  PropertyCard.tsx              |     100 |      100 |     100 |     100 |                   
  PropertyForm.tsx              |     100 |      100 |     100 |     100 |                   
 utils                          |     100 |      100 |     100 |     100 |                   
  formatters.ts                 |     100 |      100 |     100 |     100 |                   
--------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       13 passed, 13 total

```

---

## 🏗️ Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/imeshinnovation/million-frontend.git
cd million-frontend

# Instalar dependencias
npm install

# Levantar entorno de desarrollo
npm run dev

# Compilar para producción
npm run build

# Servir versión compilada
npm run preview
```

---

## 📊 Flujo de Datos

```mermaid
sequenceDiagram
  participant User as Usuario
  participant Page as Pages
  participant Feature as Feature (Properties)
  participant API as API Module
  participant Server as Backend

  User->>Page: Navega a una ruta
  Page->>Feature: Renderiza lógica y UI
  Feature->>API: Solicita datos
  API->>Server: Petición HTTP/REST
  Server-->>API: Respuesta JSON
  API-->>Feature: Devuelve datos procesados
  Feature-->>Page: Renderiza componentes
  Page-->>User: Muestra resultado
```

---

## 🚀 CI/CD Workflow

El proyecto está preparado para integrarse con **pipelines de CI/CD** (ej: GitHub Actions, GitLab CI, Jenkins) para garantizar despliegues automáticos y confiables.

### Flujo CI/CD (Mermaid)

```mermaid
flowchart LR
  A[Commit en main/dev] --> B[Build]
  B --> C[Test Unitarios]
  C --> D[Test de Integración]
  D --> E[Generación de Artefactos]
  E --> F{Branch?}
  F -->|main| G[Deploy Producción]
  F -->|dev| H[Deploy Staging]
```

1. **Commit/PR** → dispara el pipeline.  
2. **Build** → compila con Vite/TypeScript.  
3. **Tests** → unitarios e integración con cobertura.  
4. **Artefactos** → empaquetado listo para despliegue.  
5. **Deploy** → staging o producción según rama.  

---

## 📦 Buenas Prácticas Adoptadas

- **TypeScript** para tipado estático y reducción de errores.  
- **Linting** con ESLint y convenciones de commits (`conventional commits`).  
- **CI/CD Ready** → preparado para pipelines con integración continua.  
- **Inyección de dependencias** para testabilidad en `api`.  
- **Arquitectura modular** → separación en `features`, `utils`, `api` y `layout`.  

---

## Identificación de Vulnerabilidades

```bash
"vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0,
      "total": 0
    },

npm audit --json > npm-audit.json

```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  

---

## 👤 Autor

**Alexander Rubio Cáceres**  
- Ingeniero de Software
- Especialista en Seguridad de la Información
- Desarrollador FullStack Senior

### Email:
📧 imesh.innovation@gmail.com | 📧 sigueme.android@gmail.com  
