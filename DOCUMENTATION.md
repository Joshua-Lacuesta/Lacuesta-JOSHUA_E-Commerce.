# Assignment #5: Responsive and Accessible Website using React Bootstrap

**Project title:** TAU Market: Campus Goods, Grown Together
**Course:** College of Engineering and Technology, Tarlac Agricultural University

## Project Overview

TAU Market is a responsive campus storefront for school essentials, agricultural supplies, and local harvest products. The interface uses React components, Bootstrap layout utilities, Bootstrap Icons, and custom CSS. It supports product search and category filters, a working demo cart and checkout flow, a wishlist, order history, profile editing, and notification settings.

The cart, orders, wishlist, and notification setting are demonstration state and are not connected to a server. Profile details are stored in the browser's `localStorage`. No real payment or account authentication is performed.

## Tools Used

- React and React DOM for the interactive interface and component state.
- Vite for local development and production builds.
- Bootstrap 5 for responsive grid and form utilities.
- Bootstrap Icons for interface icons.
- HTML and custom CSS for semantic structure, visual styling, and responsive breakpoints.
- Netlify for deployment of the generated `dist` folder.

## Run and Build

Install Node.js, then run these commands from the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview the deployment build:

```bash
npm run build
npm run preview
```

## Development Process Screenshots

Add the requested screenshots to `documentation-screenshots/` and insert them below with captions. Capture the actual VS Code, terminal, browser, and Netlify screens during your own workflow; these screenshots are not generated or included automatically.

| File | Caption |
|---|---|
| `01-react-project-folder.png` | Project folder showing `package.json`, `src/`, assets, and documentation. |
| `02-project-setup.png` | Terminal showing the project setup and dependency installation. |
| `03-installed-packages.png` | `package.json` showing React, Bootstrap, Bootstrap Icons, and Vite. |
| `04-react-source-code.png` | React components and responsive layout code in VS Code. |
| `05-running-desktop.png` | TAU Market running in the browser at a desktop viewport. |
| `06-running-mobile.png` | TAU Market at a mobile viewport with the navigation drawer. |
| `07-netlify-deployment.png` | Netlify deployment screen showing the deployed site. |

## Final Output Screenshots

Add browser screenshots of the Home page, product catalogue, category filter, cart, and at least one profile or order view. Include desktop and mobile examples to demonstrate responsiveness and keep the active interface content visible in each image.

## Deployment and Repository

**Netlify URL:** Add the published Netlify URL after deployment.
**GitHub repository:** Add the public repository URL after pushing the project.

Netlify build configuration is included in `netlify.toml`. Connect the GitHub repository to Netlify and use the build command `npm run build` with publish directory `dist`.

## Accessibility and Responsive Design

The page uses semantic landmarks, a skip-to-content link, descriptive product image text, named icon-only controls, visible keyboard focus, an Escape-key close action for the mobile menu, labeled form fields, status announcements, and reduced-motion support. The layout changes from a fixed desktop navigation rail to an off-canvas mobile menu and uses Bootstrap's responsive product grid.

## Conclusion

This activity demonstrates how React state, Bootstrap layout utilities, and custom CSS can be combined to create a responsive, interactive storefront. The result adapts to smaller screens, supports keyboard and assistive-technology basics, and is configured for a production build that can be deployed through Netlify.