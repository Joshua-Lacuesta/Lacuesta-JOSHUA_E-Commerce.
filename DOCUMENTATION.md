# Assignment #4: Website Layout and Structure with Content per Menu

## 1. Title of the Activity

**Assignment #4: Website Layout and Structure with Content per Menu**

**Project Title:** TAU Market E-Commerce Side Menu

## 2. Objectives

The objectives of this activity are to:

- Create a clean and organized e-commerce website layout.
- Build a grouped side menu with Main Navigation, Shopping, Account, and System sections.
- Provide separate content for Home, Products, Categories, Cart, My Orders, Wishlist, Profile, Settings, and Logout.
- Add an active menu indicator to show the currently selected section.
- Use product cards, images, buttons, hover effects, and responsive design.
- Connect the Categories section to the Products section through category filtering.
- Practice using HTML, CSS, and JavaScript in a functional front-end project.

## 3. Description of the Output

The output is a TAU Market e-commerce interface for students and the university community. It has a collapsible side menu and a main content area where the selected menu section is displayed without opening another page.

The Home section contains a welcome message, a short description of the website, and featured products. The Products section displays nine products, with three products for each category: School Essentials, Agri Supplies, and Fresh Harvest. Each product has an image, product name, description, price, and Add to Cart button.

The Categories section contains three category cards. Selecting **View products** opens the Products section and filters the display to show the three products belonging to the selected category. The Cart section contains a sample cart item, quantity, total amount, and checkout button. My Orders shows three sample orders with order numbers, statuses, and total amounts.

The Wishlist section displays three saved products with descriptions and Move to Cart buttons. The Profile section contains the user's name, email, course, and year level. The profile can be edited and saved; the information is stored in the browser's `localStorage`, so the updated details remain visible after refreshing the page. Settings contains account, privacy, and notification settings. Logout contains a logout message, explanation, and logout button.

The login page remains separate from the side-menu page as required by the assignment.

## 4. Screenshots of Each Page or Menu Output

The project uses one HTML page with different menu outputs. Capture one screenshot for each output and place the images in a `documentation-screenshots` folder.

| Screenshot | Required output |
|---|---|
| `01-home.png` | Home: welcome message and featured products |
| `02-products.png` | Products: product catalogue with images, prices, and Add to Cart buttons |
| `03-categories.png` | Categories: three category cards |
| `04-category-products.png` | Filtered Products output after selecting View products from a category |
| `05-cart.png` | Cart: sample item, quantity, total, and checkout button |
| `06-my-orders.png` | My Orders: three orders with statuses and totals |
| `07-wishlist.png` | Wishlist: three saved products and Move to Cart buttons |
| `08-profile.png` | Profile: name, email, course, and year level |
| `09-profile-edit.png` | Profile edit form before saving changes |
| `10-settings.png` | Settings: account, privacy, and notification settings |
| `11-logout.png` | Logout: logout message and logout button |

Insert the screenshots below this section when they are available. Each screenshot should show the active menu indicator and the corresponding content.

## 5. Screenshot of the Folder Structure

Insert a screenshot of the VS Code Explorer showing the project folder. The screenshot should include the main files, such as:

- `index.html`
- `login.html`
- `style.css`
- `script.js`
- `side-menu.html`
- `side-menu.css`
- `side-menu.js`
- `background.jpg`
- `EXAMPLES` image folder or its linked location

**Folder structure screenshot:** `12-folder-structure.png`

## 6. Screenshot of the GitHub Repository

Insert a screenshot of the GitHub repository page showing the repository name, project files, and uploaded project contents.

**GitHub repository screenshot:** `13-github-repository.png`

Repository link: **Insert GitHub repository URL here**

## 7. Short Explanation of the HTML Structure

The HTML file defines the structure of the website. It begins with the document declaration, language attribute, metadata, page title, and links to the CSS and JavaScript files. An SVG sprite contains reusable icons for the side-menu items.

The main layout is wrapped in an `.app-shell` container. The `<aside>` element contains the brand information, menu toggle button, and navigation groups. Each navigation link has a `data-title` attribute used by JavaScript to identify the selected menu. The `<main>` element contains the page header, cart count, dynamic `page-content` container, and university footer. JavaScript inserts the content of each menu into the `page-content` element.

## 8. Short Explanation of the CSS Design

The CSS creates the website's visual design and layout. CSS variables define reusable colors, sidebar widths, and theme values. Flexbox is used for the main application layout, sidebar, headers, buttons, and profile sections. CSS Grid is used for product cards, categories, wishlist items, orders, and responsive content.

The design uses a dark blue sidebar, blue action buttons, white content cards, rounded corners, shadows, consistent spacing, and a background image. The `.active` class highlights the selected menu item using a blue gradient and a left-side indicator. Hover transitions provide visual feedback when users move over menu links, cards, and buttons. Media queries adjust the layout for smaller screens.

## 9. Short Explanation of the JavaScript Features

The JavaScript controls the interactive behavior of the website. The `toggleMenu()` function collapses or expands the side menu. The `setActiveMenu()` function removes the active state from all links and applies it to the selected link.

The `pageViews` object stores the content for every menu section. The `renderView()` function displays the selected content in the main page area. The `productCatalog` array stores product names, categories, descriptions, prices, and image paths. The `productCards()` function creates product cards and filters products by category.

Category buttons use the `data-view` and `data-category` attributes to open the Products section and show the correct three products. Add to Cart and Move to Cart buttons increase the cart count and update the button text. The profile edit feature creates an editable form, validates the required fields, saves the new profile data to `localStorage`, and renders the updated information immediately. The logout button displays a confirmation alert.

## 10. Conclusion or Reflection

This activity demonstrated how HTML, CSS, and JavaScript work together to create a functional e-commerce interface. The project improved my understanding of page structure, layout design, navigation grouping, active states, dynamic content, image handling, and user interaction.

The connection between Categories and Products makes the website easier to use because users can select a category and immediately view its products. The editable Profile section also demonstrates how JavaScript and `localStorage` can save user information. Overall, the project provides a clean and organized marketplace layout while keeping the login page separate as required.
