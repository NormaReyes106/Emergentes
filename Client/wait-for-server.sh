#!/bin/sh

    echo "Esperando que el backend (server:3002) esté disponible..."

until nc -z server 3002; do
    echo "Backend aún no disponible, esperando..."
    sleep 2
done

    echo "Backend disponible. Iniciando NGINX..."
    nginx -g "daemon off;"