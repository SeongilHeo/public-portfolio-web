# Portfolio Website for public

> A personal portfolio site built with `React` and `Vite`, containerized with `Docker`, and deployed on `Vercel`.

I’ve removed most of the data images and documents. Please inspect the code logic where the data is used.

## Tech Stack

- **Framework:** React v19.1.1
- **Bundler:** Vite v6.3.5
- **Styling:** Tailwind CSS v4.1
- **Containerization:** Docker v27.5.1
- **Deployment:** Vercel  
- **CI/CD:** Vercel’s built-in pipeline

## Operations Guide

- **Runtime Environment:** Node.js v20, npm v10
- **Install Dependencies:** Run `npm install` at the project root  
- **Local Development:** Start the development server with `npm run dev` 
- **Production Build:** Generate build artifacts with `npm run build` into the `dist/` directory  
- **Environment Variables:** Set variables in a `.env` file and restart the server  

### Content & Asset Management

- **Adding or Editing Pages**  
  - Review routes under `src/routes`.  
  - Add or modify page components in `src/pages`.  

- **Updating Data**  
  - Edit JSON files in `src/data`.  
  - Place images and documents in the `public` folder; ensure paths in data files match.  
  - For project detail pages, add Markdown files and related assets to `public/content`.  

- **Adding Icons**  
  - Use Font Awesome v6: https://fontawesome.com/v6/  
  - Inspect the `src/icons` directory and update `initIcons`.  
  - To import, use:
  ```js
  import { FontAwesomeIcon, iconMap } from '@/icons';
  ```

## Deployment Guide

- **GitHub Pages Deployment**
  1. Refer to [vite guide](https://vite.dev/guide/static-deploy) and create `.github/workflows/deploy.yaml`
  2. Each push triggers an automatic build and deployment

- **Vercel Deployment**  
  1. Push commits to the `main` branch on GitHub  
  2. In the Vercel dashboard, link the project and configure environment variables
  3. Each push triggers an automatic build and deployment  

- **Docker Deployment**  
  ```bash
  docker compose up
  ```

- **Custom Domain:** Add domains in the Vercel project's **Domains** tab  
- **Rollback:** Revert Git commits and push to `main` to redeploy the previous version  

## License

This project is licensed under the MIT License.