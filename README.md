# ProPlay Accessories: A Sports Equipment Store

### Live Site: [ProPlay Accessories Live](https://dainty-belekoy-1b713a.netlify.app/)


**ProPlay Accessories** is a responsive e-commerce platform designed for sports
enthusiasts to browse, purchase, and manage sports equipment. With intuitive
navigation, robust user authentication, and private routes for a personalized
experience, it caters to all sports disciplines.

---

## Key Features

1. **User Authentication**: Login/Register via Email and Google, conditional
   navbar buttons based on login state, and personalized experience.
2. **Private Routes**: Add Equipment, View Details, My Equipment List, and
   Update functionality restricted to authenticated users only.
3. **Equipment Management**: Users can add, view, update, or delete equipment
   they own using easy-to-use forms and modals.
4. **Sorting and Filtering**: Sort all sports equipment by price and filter by
   categories for a seamless browsing experience.
5. **Responsive Design**: Fully responsive layout for mobile, tablet, and
   desktop views, ensuring accessibility for all users.

---

## Pages Overview

### Navbar

- Displays the website logo and navigation links for Home, All Sports Equipment,
  Add Equipment, and My Equipment List.
- Conditional rendering of login/register buttons or user profile with a logout
  option.

### Home Page

- Includes a dynamic slider banner with engaging content, a featured product
  section, sports categories, and additional informational sections.

### All Sports Equipment

- Displays all equipment in a table format with essential details like Name,
  Category, Price, and a "View Details" button.
- Sort functionality based on price (ascending/descending).

### Add Equipment (Private Route)

- A form for adding new equipment with fields like Name, Category, Description,
  Price, Rating, Stock, Customization, and more.

### My Equipment List (Private Route)

- Displays the user's added equipment in card format with Update and Delete
  options.
- Delete includes a confirmation modal for safe removal.

### Update Equipment (Private Route)

- A pre-filled form to edit equipment details. Shows a success message upon
  successful update.

### View Details (Private Route)

- Shows detailed information about the selected equipment in a beautiful card
  layout.

### 404 Page

- A custom 404 page with navigation back to the homepage for non-existing
  routes.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Hosting**: Netlify (Frontend), Vercel (Backend)

---

## Additional Features

- **Environment Variables**: Sensitive information like Firebase configuration
  and MongoDB credentials are stored securely.
- **Custom Animations**: Includes ASO animations and typewriter effects for an
  enhanced user experience.
- **Loading Spinner**: Provides visual feedback during data fetch operations.

---
