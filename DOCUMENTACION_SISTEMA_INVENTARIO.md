# Documentación del Sistema de Inventario - Lógica de Negocio

## Resumen Ejecutivo

Se ha implementado una solución completa para el sistema de inventario que incluye:

1. **Movimientos en lote**: Capacidad de registrar múltiples movimientos de unidades en una sola operación
2. **Sistema de confirmación**: Manejo de confirmaciones para movimientos de cesión
3. **Historial de ubicaciones**: Registro completo de cambios de ubicación sin perder el historial de movimientos

## Arquitectura de la Solución

### 1. Movimientos en Lote

#### Endpoint: `POST /movimiento/bulk`

Permite crear múltiples movimientos de unidades en una sola operación, ideal para casos como:
- Adquisición de múltiples notebooks (10 unidades)
- Devolución de varios productos
- Cesión masiva de equipos

#### Payload de Ejemplo:
```json
{
  "persona": 123,
  "fecha": "2024-01-15T10:00:00Z",
  "operacion": "ADQUIERE",
  "detalle": "Compra de 10 notebooks",
  "unidades": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  "confirmado": null
}
```

#### Ventajas:
- **Eficiencia**: Una sola petición HTTP para múltiples movimientos
- **Transaccionalidad**: Todos los movimientos se guardan o ninguno (ACID)
- **Validación**: Verificación de existencia de todas las unidades antes de procesar
- **Escalabilidad**: Maneja cualquier cantidad de unidades

### 2. Sistema de Confirmación para Cesiones

#### Campo `confirmado` en la entidad Movimiento:
- **Valores**: `null` (pendiente), `true` (confirmado), `false` (rechazado)
- **Aplicación**: Solo para movimientos de tipo `CEDIÓ`
- **Por defecto**: `null` para cesiones, `null` para otras operaciones

#### Endpoints de Confirmación:

##### `PATCH /movimiento/:id/confirmar`
Confirma o rechaza la recepción de un movimiento de cesión.

```json
{
  "confirmado": true
}
```

##### `GET /movimiento/pendientes-confirmacion`
Obtiene todos los movimientos de cesión pendientes de confirmación.

#### Flujo de Trabajo:
1. Persona A cede 5 notebooks a Persona B
2. Se crean 5 movimientos con `operacion: "CEDIÓ"` y `confirmado: null`
3. Persona B confirma la recepción de los equipos
4. Los movimientos se actualizan con `confirmado: true`

### 3. Historial de Ubicaciones

#### Nueva Entidad: `HistorialUbicacion`

Mantiene un registro completo de todos los cambios de ubicación de las unidades:

```typescript
{
  id: number;
  user: number;                    // Usuario que registra el cambio
  fechaCambio: Date;              // Fecha del cambio
  motivo: string;                 // Motivo del cambio
  ubicacionAnterior: Ubicacion;   // Ubicación previa (nullable para primera ubicación)
  ubicacionNueva: Ubicacion;      // Nueva ubicación
  unidad: Unidad;                 // Unidad afectada
}
```

#### Endpoint: `POST /historial-ubicacion/cambiar-ubicacion`

Registra un cambio de ubicación y mantiene el historial completo.

```json
{
  "unidadId": 101,
  "nuevaUbicacionId": 5,
  "fechaCambio": "2024-01-15T14:30:00Z",
  "motivo": "Reubicación por mantenimiento"
}
```

#### Consultas Disponibles:

##### `GET /historial-ubicacion/unidad/:unidadId`
Obtiene el historial completo de cambios de ubicación de una unidad.

##### `GET /historial-ubicacion/unidad/:unidadId/ubicacion-actual`
Obtiene la ubicación actual de una unidad.

##### `GET /historial-ubicacion/ubicacion/:ubicacionId/unidades`
Obtiene todas las unidades que se encuentran en una ubicación específica.

## Casos de Uso Implementados

### Caso 1: Adquisición Masiva
**Escenario**: Una persona adquiere 10 notebooks.

```bash
POST /movimiento/bulk
{
  "persona": 123,
  "fecha": "2024-01-15T10:00:00Z",
  "operacion": "ADQUIERE",
  "detalle": "Compra de 10 notebooks Dell",
  "unidades": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
}
```

**Resultado**: Se crean 10 movimientos individuales en la base de datos.

### Caso 2: Cesión con Confirmación
**Escenario**: Persona A cede 5 notebooks a Persona B.

#### Paso 1: Crear movimientos de cesión
```bash
POST /movimiento/bulk
{
  "persona": 123, // Persona A
  "fecha": "2024-01-15T10:00:00Z",
  "operacion": "CEDIÓ",
  "detalle": "Cesión de 5 notebooks a Persona B",
  "unidades": [101, 102, 103, 104, 105]
}
```

#### Paso 2: Confirmar recepción
```bash
PATCH /movimiento/456/confirmar
{
  "confirmado": true
}
```

### Caso 3: Cambio de Ubicación
**Escenario**: Mover notebook de "Oficina Central" a "Sucursal Norte".

```bash
POST /historial-ubicacion/cambiar-ubicacion
{
  "unidadId": 101,
  "nuevaUbicacionId": 5,
  "fechaCambio": "2024-01-15T14:30:00Z",
  "motivo": "Reubicación por mantenimiento"
}
```

**Resultado**: 
- Se crea un registro en `HistorialUbicacion`
- Se actualiza la ubicación actual en la tabla `Unidad`
- Se preserva el historial completo de movimientos

## Ventajas de la Implementación

### 1. **Integridad de Datos**
- Transacciones ACID para movimientos en lote
- Validaciones de existencia de unidades antes de procesar
- Preservación del historial completo

### 2. **Flexibilidad**
- Sistema de confirmación opcional y configurable
- Manejo de diferentes tipos de operaciones
- Historial de ubicaciones independiente de movimientos

### 3. **Escalabilidad**
- Operaciones en lote eficientes
- Consultas optimizadas con relaciones
- Estructura modular y extensible

### 4. **Trazabilidad**
- Registro completo de movimientos
- Historial de ubicaciones con fechas y motivos
- Auditoría de cambios con usuario responsable

## Consideraciones Técnicas

### Base de Datos
- Nueva tabla: `inve_09_hist_ubicacion`
- Campo agregado: `inve08_confirmado` en tabla `inve_08_mov_movimiento`
- Nuevo enum: `RECIBIÓ` en `TipoOperacionEnum`

### Migraciones Necesarias
```sql
-- Agregar campo confirmado a la tabla de movimientos
ALTER TABLE inve_08_mov_movimiento 
ADD COLUMN inve08_confirmado BOOLEAN NULL;

-- Crear tabla de historial de ubicaciones
CREATE TABLE inve_09_hist_ubicacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_auth_id INT NOT NULL,
  inve09_fecha_cambio DATETIME NOT NULL,
  inve09_motivo VARCHAR(500),
  rela_ubicacion_anterior INT NULL,
  rela_ubicacion_nueva INT NOT NULL,
  rela_inve06 INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (rela_ubicacion_anterior) REFERENCES inve_07_cab_ubicacion(id),
  FOREIGN KEY (rela_ubicacion_nueva) REFERENCES inve_07_cab_ubicacion(id),
  FOREIGN KEY (rela_inve06) REFERENCES inve_06_det_unidad(id)
);
```

### Rendimiento
- Índices recomendados en campos de búsqueda frecuente
- Paginación para consultas de historial
- Cache para ubicaciones actuales si es necesario

## Conclusiones

La solución implementada cubre completamente los requerimientos planteados:

1. ✅ **Múltiples movimientos en un payload**: Implementado con endpoint `/bulk`
2. ✅ **Sistema de confirmación**: Campo `confirmado` con lógica específica para cesiones
3. ✅ **Historial de ubicaciones**: Entidad independiente que preserva el historial completo

La arquitectura es modular, escalable y mantiene la integridad de los datos mientras proporciona la flexibilidad necesaria para manejar casos de uso complejos del sistema de inventario.
