# Configuración del formulario de contacto

El formulario público de BucleMenta guarda cada solicitud en la tabla `contactRequests` y también intenta notificar al propietario del proyecto. Para activar el envío directo al correo final de la empresa, configura estas variables privadas en el proyecto:

| Variable | Uso |
| --- | --- |
| `CONTACT_EMAIL` | Dirección que recibirá las solicitudes del formulario. Debe ser el email real de BucleMenta cuando esté definido. |
| `RESEND_API_KEY` | Clave privada del proveedor Resend para enviar el correo desde el servidor. |
| `EMAIL_FROM` | Remitente verificado en Resend, por ejemplo `BucleMenta <contacto@dominio.cl>`. |

Mientras estas variables no existan, la solicitud queda guardada con estado `received` y se intenta enviar una notificación interna al propietario del proyecto. No se muestra ningún email ni teléfono inventado en la página.
