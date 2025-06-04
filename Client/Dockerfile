# Etapa 1: build de la aplicación React con Vite
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Compila el proyecto (typescript + vite)
RUN npm run build

# Etapa 2: servidor Nginx para producción
FROM nginx:stable-alpine

# Copia el build generado al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia tu configuración personalizada de Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copia el script que espera al backend
COPY ./wait-for-server.sh /wait-for-server.sh
RUN chmod +x /wait-for-server.sh

# Expone el puerto 80 para servir la app
EXPOSE 80

# Usa el script como punto de entrada
CMD ["/wait-for-server.sh"]
