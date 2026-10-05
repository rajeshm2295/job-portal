name: JobFindHub Portal CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      - name: Deploy Application
        run: |
          echo "--- Starting Automated CI/CD Deployment Process ---"

          cd /home/adam/projects/job-portal/project/job-portal

          echo "Pulling latest code from main branch..."
          git fetch origin
          git reset --hard origin/main
          git pull origin main

          echo "Building and starting Docker containers..."
          echo "${{ secrets.SUDO_PASSWORD }}" | sudo -S docker compose up -d --build

          echo "--- Automated Deployment Completed Successfully! Portal is Live! ---"
