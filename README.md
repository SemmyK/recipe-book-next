# RecipeBook App Version 5.0.0

## Recreated Recipe App with Next.js + MongoDB + TailwindCSS + next-auth + prisma

### Features

- read, filter and search for recipes
- choose dark/light mode
- create profile using email, google or facebook registration
- with profile created you can add recipes and edit or delete your added recipes
- view other profiles

**For developers**

To start the project after downloading, from root directory, in terminal run:

1. npm install
2. add .env file with fields: DATABASE_URL, MONGO_URI (these two can be the same if you want to store auth users in the same db collection as recipes), SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXTAUTH_URL_INTERNAL, GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, FACEBOOK_SECRET,
3. npm run dev


