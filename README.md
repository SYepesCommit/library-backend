#  Library Management System - Prueba Técnica Grupo NEX

Este proyecto es una solución robusta para la gestión de préstamos de libros, desarrollada como prueba técnica para **Grupo NEX**. Se enfoca en la integridad de los datos, el rendimiento de las consultas y el cumplimiento estricto de las reglas de negocio.

---
### Puntos Clave de Arquitectura
* **API GraphQL**: Implementación eficiente para consultas flexibles.
* **Prisma ORM**: Acceso a datos con tipado fuerte y migraciones automatizadas.
* **Integridad Transaccional**: Uso de `$transaction` para garantizar que la disponibilidad del libro y el registro de reserva se actualicen de forma atómica.
* **Optimización N+1**: Implementación de **Eager Loading** mediante el uso estratégico de `include` en Prisma, reduciendo la carga en la base de datos.
* **Reglas de Negocio Implementadas**: 
    * Límite de 3 libros activos por usuario.
    * Validación de disponibilidad en tiempo real.
    * Filtros avanzados por rango de fechas en consultas de historial.

### Tecnologías
* **Framework**: NestJS
* **API**: GraphQL (Code First)
* **Base de Datos**: PostgreSQL
* **ORM**: Prisma
* **Testing**: Jest (Unit Testing)
---


###  Architecture Highlights
* **GraphQL API**: Flexible and efficient data fetching.
* **Prisma ORM**: Type-safe database access and streamlined migrations.
* **Transactional Integrity**: Uses `$transaction` to ensure book availability and reservation records are updated atomically (Rules #2 & #3).
* **N+1 Performance Fix**: Implemented **Eager Loading** via Prisma's `include` to optimize relational queries and prevent the N+1 problem.
* **Business Rules**: 
    * Maximum 3 active reservations per user.
    * Real-time book availability tracking.
    * Date range filtering for reservation history.

###  Tech Stack
* **Framework**: NestJS
* **API**: GraphQL
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Testing**: Jest

---

##  Configuración / Getting Started

### 1. Instalación de paquetes / Installation
```bash
pnpm install
```

### 2. Base de Datos / Database
Configura tu archivo .env con las credenciales de tu PostgreSQL (Si no existe, es necesario crearlo en la raiz del proyecto):
```bash
DATABASE_URL="postgresql://user_nex_santi:nex_santi_pass@127.0.0.1:5433/library_db?schema=public"
PORT=3000
```

### 3. Configuracion de Docker.
Para levantar la base de datos de manera inmediata, utiliza el siguiente archivo docker-compose.yml (crear en la raíz si no existe):
```bash
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    container_name: library_postgres_db
    restart: always
    environment:
      POSTGRES_USER: user_nex_santi
      POSTGRES_PASSWORD: nex_santi_pass
      POSTGRES_DB: library_db
    ports:
      - "5433:5432" # <-- Cambiamos 5432 por 5433 en tu PC
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Comando para iniciar la DB:
```bash
docker-compose up -d
```

### 4. Sincronizar Base de Datos (Prisma):
Este comando creará las tablas y generará el cliente de tipado:

```bash
pnpm prisma migrate dev --name init
```

###  4. Ejecución / Execution

```bash
# Desarrollo / Development
pnpm start:dev

# La consola de GraphQL estará disponible en:
# http://localhost:3000/graphql

# La consola de prisma studio
npx prisma studio
```

### Pruebas / Testing
El proyecto incluye una suite completa de pruebas unitarias que validan las reglas de negocio y la integridad de los servicios.
```bash
# Ejecutar todos los tests / Run all tests
pnpm test

# Ejecutar test específico de reservas
pnpm test src/reservations/reservations.service.spec.ts
```
