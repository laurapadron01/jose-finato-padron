# Portafolio — José Antonio Finato Padrón

Sitio web estático (una sola página) del portafolio de José Finato Padrón, ingeniero industrial y jefe de obra. Sin framework ni build: HTML + CSS + JavaScript puro, listo para desplegar en Vercel.

## Estructura

```
index.html      · página principal (8 secciones + overlays)
styles.css      · estilos y tokens del diseño V2 (crema · naranja · madera)
main.js         · interacciones (nav, flip, acordeón, galerías, menú, toast)
404.html        · página de error
assets/img/     · imágenes optimizadas (WebP) + favicon
assets/cv/      · CV en PDF (pendiente de añadir: CV-ES.pdf / CV-EN.pdf)
```

## Ver en local

No necesita build. Con cualquier servidor estático:

```bash
python -m http.server 8080
# abrir http://localhost:8080
```

(Abrir `index.html` con doble clic también funciona.)

## Desplegar en Vercel

1. Sube este repositorio a GitHub.
2. En Vercel (cuenta de José) → **Add New… → Project** → importa el repo.
3. Framework Preset: **Other**. No hace falta build command ni output directory (es estático; la raíz del repo es el sitio).
4. **Deploy**. Vercel sirve `index.html` y usa `404.html` para las rutas no encontradas.

## Pendientes

- Añadir `assets/cv/CV-ES.pdf` y `CV-EN.pdf` y enlazarlos desde el botón «Descargar CV».
- Confirmar la URL de LinkedIn (hoy enlaza a `#`).
- Decisiones de diseño abiertas (feedback de José): la foto de la sección «Enfoque» y el tag «Reformas llave en mano».
- Dominio propio (p. ej. josefinatopadron.com) apuntado a Vercel.

Contenido y decisiones: ver `../contenido-portafolio.md` y `../bitacora.md`.
