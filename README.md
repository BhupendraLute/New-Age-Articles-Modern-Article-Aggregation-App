
# 📰 New Age Articles

**New Age Articles** is a modern, dynamic web application designed to help users explore and stay updated with trending articles across various categories. Built with Next.js, Prisma, and PostgreSQL, this app offers smooth pagination, category-based filtering, and the ability for users to personalize their reading experience!

---

## 🚀 Features

✅ **Article Aggregation:**  
- Fetches and displays articles from various categories.  
- Shows article titles, images, dates, and categories.  
- Links directly to the original article source.  

✅ **Category Management:**  
- Users can explore new categories.  
- Ability to add a new category of their choice.  
- Filter articles by selected categories or view all articles.

✅ **Pagination:**  
- Seamless pagination that changes articles without modifying the URL.  
- Ensures smooth navigation across multiple pages of articles.

✅ **Authentication:**  
- User authentication handled via Clerk.  
- Each user has personalized categories and article preferences.

✅ **Database Integration:**  
- PostgreSQL database powered by Neon DB.  
- Prisma ORM for efficient and type-safe database operations.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL (Neon DB)
- **Authentication:** Clerk
- **State Management:** React hooks (useState, useEffect)

---

## 🧑‍💻 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/BhupendraLute/New-Age-Articles-Modern-Article-Aggregation-App.git
cd new-age-articles
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**  

Create a `.env.local` file in the root directory and add:

```
DATABASE_URL=your_postgresql_database_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_API_KEY=your_clerk_api_key
```

4. **Generate Prisma Client & Apply Migrations:**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server:**

```bash
npm run dev
```

✅ Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🌐 Deployment

You can deploy this project on Vercel seamlessly:

```bash
vercel deploy
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

---

## 🏷️ License

This project is open-source and available under the [MIT License](LICENSE).

---

🔥 **New Age Articles** — Stay informed, stay inspired. Happy reading! 🎉
