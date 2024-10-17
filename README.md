# School Management Website

A full-stack **School Management System** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js) that helps manage Admin Dashboard, Staff Dashabord and Librarian Dashboard. This project allows users (Admin, Staff, Librarian) to interact with the platform efficiently.

# Features

**Admin Dashbaord** : Admin can add, edit,delete Staff and Libararian . Also can access or view all details in the website
**Staff Dashbaord** : Staff can manage (add,edit,delete) Student Details .
**Libarian (Worker)** : Worker can manage Libarary details, students records

**Authentication & Authorization**: JWT-based login for Admin, Staff, Librarian
- **Responsive Design**: Optimized for both mobile and desktop screens.
- **CRUD Operations**: Manage student and  Staff, Librarian, Book details

# Tech Stack 

**Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **File Storage**: Multer (for profile pictures, reports, etc.)



# .ENV

PORT = 8060
MONGO_URI =""

WEB_TOKEN_SECRET = ""
JWT_SECRET = ""
JWT_REFRESH_SECRET = ""

ADMIN_EMAIL =""
ADMIN_PASSWORD = ""


# GlobalApi


const GlobalApi = { baseUrl: "", };

export default GlobalApi;



# For Installation :

git init
git clone https://github.com/GOVINDSAJEEVKUMAR/SCHOOL-MANAGEMENT.git

**Front End** : 
cd Client/.
npm i 
npm run dev

**BackEnd**:

cd Back/.
npm i
npm start




