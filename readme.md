# Campus Coordination System

This project is developed as part of the Final Year Project for the **Bachelor of Science in Software Engineering (BSSE)** program at **FUSST**, batch **FA-202**. The **Campus Coordination System** is designed to assist in managing and coordinating campus-related tasks, focusing on intelligent and manual timetable and course allocation.

## Developers

- **Mohammad Ahmad Malik**
- **Adnan Nasir Sheikh**
- **Hassan Askari**

## Technologies Used

- **Backend**: Django, Django REST Framework (DRF)
- **Frontend**: React (Vite as the build tool)
- **Database**: SQLite (development), PostgreSQL (production)
- **Containerization**: Docker
- **Version Control**: Git, GitHub

## Features

- **Intelligent Timetable Allocation**: Automatically generates optimized timetables for students and faculty based on course requirements.
- **Manual Timetable Allocation**: Allows manual adjustments to the timetable when necessary.
- **Course Allocation**: Efficient course allocation for students, ensuring optimal use of resources and faculty availability.
- **User Authentication**: Secure login and registration for students, faculty, and administrators.
- **Responsive Interface**: Built with React and Vite, offering a smooth and responsive user experience across devices.

## Project Structure

### Backend
- The backend is built using **Django** and **Django REST Framework** to handle API requests.
- The backend contains models, views, serializers, and URL routing for core functionalities like timetable and course allocation.
- The backend is containerized using **Docker** for easy deployment.

### Frontend
- The frontend is developed using **React** and **Vite** for fast, modern web development.
- The frontend interacts with the backend through API calls and displays data in a user-friendly interface.
- **React** components are used for the dynamic interface, and **Vite** ensures quick development and optimized build times.

### Docker
- The project includes **Docker** support for both backend and frontend to ensure a seamless development and deployment experience.
- The provided `docker-compose.yml` file allows you to easily run the entire application in containers.

## Installation

### Prerequisites

- **Docker**: Ensure Docker is installed to run the application in containers.
- **Python 3.x**: Required for the Django backend.
- **Node.js (v18 or later)**: Required for the React frontend.

### Setup Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/campus-coordination-system.git
    cd campus-coordination-system
    ```

2. **Backend Setup**:

    - Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    - Create a virtual environment and activate it (optional but recommended):

        ```bash
        python -m venv venv
        source venv/bin/activate  # On Windows: venv\Scripts\activate
        ```

    - Install dependencies:

        ```bash
        pip install -r requirements.txt
        ```

    - Apply database migrations:

        ```bash
        python manage.py migrate
        ```

    - Run the Django development server:

        ```bash
        python manage.py runserver
        ```

3. **Frontend Setup**:

    - Navigate to the `frontend` directory:

        ```bash
        cd ../frontend
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Run the development server:

        ```bash
        npm run dev
        ```

4. **Using Docker (Optional)**:
    - To run both the frontend and backend with Docker, use the provided `docker-compose.yml` file:

        ```bash
        docker-compose up --build
        ```

    - This command will build and start both the frontend and backend services in containers.

## Future Improvements

- Implement advanced scheduling algorithms for timetable and course allocation.
- Add user roles with different permissions for students, faculty, and administrators.
- Enhance the frontend UI/UX with more interactive and responsive elements.
- Implement notification system for reminders and updates.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Special thanks to the faculty, mentors, and peers at FUSST for their guidance and support throughout the development of this project.
