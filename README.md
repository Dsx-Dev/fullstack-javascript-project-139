### Hexlet tests and linter status:
[![Actions Status](https://github.com/Dsx-Dev/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Dsx-Dev/fullstack-javascript-project-139/actions) [![Maintainability](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-139/maintainability.svg)](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-139) [![Code Coverage](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-139/coverage.svg)](https://qlty.sh/gh/Dsx-Dev/projects/fullstack-javascript-project-139)
# ChatAPP

Este proyecto es un chat en tiempo real basado en **React** (frontend) y el servidor de **Hexlet** (backend).  
A continuación se describen los pasos para ejecutarlo localmente (tanto en desarrollo como en producción).

## Uso en local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Dsx-Dev/fullstack-javascript-project-139.git
cd fullstack-javascript-project-139
```

### 2. Instalar dependencias
En la raíz:
```bash
npm install
```
Luego en la carpeta frontend/:
```bash
cd frontend
npm install
cd ..
```

### Modo desarrollo (puerto 3000)
En una terminal, inicia el frontend:
```bash
cd frontend
npm start
```
Esto abre el frontend en http://localhost:3000.

En otra terminal, levanta el servidor backend:
```bash
npm start
```
Corre en http://localhost:5001.

### Modo producción (puerto 5001)
Compila el frontend:
```bash
cd frontend
npm run build
cd ..
```
Inicia el servidor:
```bash
npm start
```
Abre http://localhost:5001 en tu navegador.