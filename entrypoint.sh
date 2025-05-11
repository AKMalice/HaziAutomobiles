#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Nginx
echo "Starting Nginx..."
service nginx start

echo "Starting the application..."
exec gunicorn --bind 0.0.0.0:8000 HaziAutomobiles.wsgi:application --workers 3
