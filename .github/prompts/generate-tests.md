---
name: generate-tests
description: Generar pruebas específicas para la aplicación React utilizando el framework de pruebas existente.
agent: agent
---

# Generar pruebas específicas para la aplicación React

Escribe pruebas específicas para el comportamiento actual de esta aplicación React.

## Antes de escribir las pruebas

1. Lee las instrucciones del repositorio.
2. Revisa los scripts en `package.json`, especialmente `test`, `lint` y `build`.
3. Identifica la infraestructura de pruebas existente:
   - Ejecutores de pruebas (test runners), como Vitest o Jest.
   - Librerías de pruebas, como React Testing Library.
   - Archivos de configuración y preparación.
   - Archivos de prueba existentes y convenciones de nomenclatura.
4. Analiza la aplicación para determinar qué funcionalidades están implementadas actualmente.

## Framework de pruebas

- Utiliza el framework de pruebas existente y sigue las convenciones del proyecto.
- Si el proyecto no cuenta con un framework de pruebas, sugiere una configuración mínima que sea compatible con sus herramientas de construcción (build tooling). Consulta antes de añadir cualquier dependencia o configuración.

## Cobertura de pruebas

Escribe pruebas únicamente para las funcionalidades que ya están implementadas en la aplicación:

- **Renderizado de productos:** Los productos muestran los nombres, precios, imágenes y textos accesibles esperados.
- **Filtrado:** Los filtros por categoría o búsqueda muestran los productos correspondientes; si no hay coincidencias, se muestra el estado de "vacío".
- **Interacciones con el carrito:** Los usuarios pueden añadir, eliminar y actualizar artículos; el contador del carrito y los totales se actualizan correctamente.

## Pautas para las pruebas

- Prueba el comportamiento observable por el usuario, no los detalles de implementación.
- Prioriza el uso de consultas accesibles, como `getByRole` y `getByLabelText`.
- Simula interacciones de usuario realistas, incluyendo el uso del teclado cuando sea apropiado.
- Asegúrate de que cada prueba sea independiente y determinista.
- Utiliza datos simulados (mocks). No realices peticiones de red reales.

## Código de producción

No modifiques el código de producción sin autorización previa. Si consideras necesario realizar un cambio, explica el motivo y solicita aprobación antes de proceder. Esto incluye cambios destinados a facilitar las pruebas o correcciones de errores detectados durante el proceso de testing.

## Verificación e informe

Ejecuta las pruebas. En tu respuesta final:

- Enumera los archivos de prueba que has añadido o modificado.
- Resume los escenarios cubiertos.
- Informa sobre los resultados de las pruebas, incluyendo cualquier fallo detectado. - Señale cualquier vacío, áreas omitidas o tareas de seguimiento recomendadas.
