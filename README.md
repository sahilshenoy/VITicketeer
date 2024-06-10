# VITicketeer

<div align="center">
  <br />
    <img src="public/assets/images/readmeBanner.png" alt="Project Banner">
  <br />


  <h3 align="center">An Events app for VIT Bhopal</h3>

  <div align="center">
    VITicketeer is a comprehensive ticketing platform designed for the clubs of VIT Bhopal University to manage and book tickets for all club events.
  </div>
</div>


## 📚 Table of Contents

1. 🏁 [Introduction](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. 🌟 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 🔗 [About the Creators](#about)


## <a name="introduction">🏁 Introduction</a>

Built on Next.js 14, VITicketeer stands as a comprehensive, full-stack platform for managing events at VIT Bhopal University. It serves as a hub for all college events, featuring seamless payment processing through Stripe. Students and staff can purchase tickets for any event or even initiate and manage their own events.

## <a name="tech-stack">🛠️ Tech Stack</a>

- Node.js
- Next.js
- TypeScript
- TailwindCSS
- Stripe
- Zod
- React Hook Form
- Shadcn
- Uploadthing

## <a name="features">🌟 Features</a>

- **Authentication (CRUD) with Clerk:** User management through Clerk, ensuring secure and efficient authentication.
  
- **Events (CRUD):** Comprehensive functionality for creating, reading, updating, and deleting events, giving users full control over event management.
  - **Create Events:** Users can effortlessly generate new events, providing essential details such as title, date, location, and any additional information.
  - **Read Events:** Seamless access to a detailed view of all events, allowing users to explore event specifics, including descriptions, schedules, and related information.
  - **Update Events:** Empowering users to modify event details dynamically, ensuring that event information remains accurate and up-to-date.
  - **Delete Events:** A straightforward process for removing events from the system, giving administrators the ability to manage and curate the platform effectively.
  
- **Related Events:** Smartly connects related events, displaying them on the event details page to make it more engaging for users.

- **Organized Events:** Efficient organization of events, ensuring a structured and user-friendly display for the audience, i.e., showing events created by the user on the user profile.

- **Search & Filter:** Empowering users with a robust search and filter system, enabling them to easily find the events that match their preferences.

- **New Category:** Dynamic categorization allows for the seamless addition of new event categories, keeping the platform adaptable.

- **Checkout and Pay with Stripe:** Smooth and secure payment transactions using Stripe, enhancing user experience during the checkout process.

- **Event Orders:** Comprehensive order management system, providing a clear overview of all event-related transactions.

- **Search Orders:** Quick and efficient search functionality for orders, facilitating easy tracking and management.

## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/sahilshenoy/VITicketeer.git
cd VITicketeer
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual credentials 

**Running the Project**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


</details>

## <a name="about">👤 About the Creators</a>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://imgur.com/JO0rUIX.jpg" alt="Sahil Shenoy" style="border-radius: 50%; width: 150px; height: 150px;">
        <br>
        <strong>Sahil Shenoy</strong>
        <p>Software Engineer with expertise in Cloud Computing, High Performance Computing, and Quantum Computing. Passionate about developing scalable solutions and exploring new technologies.</p>
      </td>
      <td align="center">
        <img src="https://imgur.com/XL45jXn.jpg" alt="Dhwani Budhiraja" style="border-radius: 50%; width: 150px; height: 150px;">
        <br>
        <strong>Dhwani Budhiraja</strong>
        <p>Full Stack Developer with a strong background in AI & web development and a keen interest in creating user-friendly applications. Skilled in various modern web technologies and always eager to learn more.</p>
      </td>
    </tr>
  </table>
</div>

