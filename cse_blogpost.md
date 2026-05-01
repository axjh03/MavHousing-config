# Project Template
## Team Name
The Builders Squad

## Timeline
Fall 2025 – Spring 2026

## Students
- Alok Jha – Computer Science
- Atiqur Rahman – Computer Science
- Aastha Khatri – Computer Science
- Talha Tamid – Computer Science
- Aviral Saxena – Computer Science
- Md Rashidul Sami – Computer Science

## Abstract
MavHousing is a comprehensive, full-stack housing management platform designed for the University of Texas at Arlington (UTA). The system digitizes and unifies the entire student housing lifecycle—from initial application and identity verification through lease generation, rent payment processing, maintenance request management, and real-time communication. Built on a robust microservice architecture using NestJS, Next.js, and a dual-database strategy (PostgreSQL and MongoDB), MavHousing provides role-specific dashboards for students, staff, and administrators. Key features include AI-powered student ID verification via Google Gemini, an automated "Blaze" AI chatbot assistant, and integrated email/SMS notifications to streamline campus housing operations.

## Background
University housing offices often rely on fragmented, manual systems for managing applications, lease agreements, and maintenance workflows. At UTA, these processes frequently involve paper forms and disconnected spreadsheet tracking, leading to administrative delays and data inconsistency. Students often lack a centralized portal to manage their housing needs, from applying for a room to making payments or reporting maintenance issues. MavHousing addresses these challenges by consolidating these workflows into a single, unified, web-based platform. By modernizing university housing operations with AI integration and automated notification systems, MavHousing improves efficiency for staff and enhances the overall resident experience.

## Project Requirements
1. **Housing Applications:** Students must be able to submit multi-step applications with lifestyle preferences and roommate compatibility data.
2. **AI Identity Verification:** The system must automatically verify student identity by analyzing uploaded ID cards using Google Gemini AI.
3. **Lease Management:** Staff must be able to generate, review, and approve lease agreements with support for units, rooms, and individual beds.
4. **Payment Processing:** Students must be able to view balances, track payment history, and manage rent payments through a secure dashboard.
5. **Maintenance Lifecycle:** Residents must be able to submit maintenance requests with photos and priority levels, while staff track and resolve them.
6. **AI Assistant ("Blaze"):** A conversational AI chatbot must be integrated to provide immediate support for common housing questions.
7. **Role-Based Access Control (RBAC):** Distinct permissions must be enforced for students, housing staff, and system administrators.
8. **Automated Notifications:** The system must send real-time alerts via email (Resend) and SMS (Twilio) for critical status changes.
9. **Data Persistence:** The system must use a dual-database approach (SQL for structured data, NoSQL for high-velocity chat data) to ensure performance.
10. **Administrative Reporting:** Administrators must be able to generate occupancy and financial reports to monitor fleet-wide performance.

## Design Constraints
1. **Accessibility:** The platform uses a responsive Next.js frontend with Tailwind CSS and Radix UI primitives to ensure usability across desktops, tablets, and mobile devices.
2. **Security:** Authentication is handled via stateless JWT tokens (RFC 7519), and all user passwords are encrypted using bcrypt hashing to protect sensitive student data.
3. **Usability:** The interface is divided into role-specific dashboards (Student, Staff, Admin) to reduce cognitive load and simplify complex workflows like lease generation.
4. **Extensibility:** A NestJS monorepo architecture allows for independent scaling of services (Auth, Core, Comms) and easy integration of new features.
5. **Maintainability:** The codebase is fully written in TypeScript for type safety, and uses Prisma ORM for version-controlled database migrations and reliable schema management.

## Engineering Standards
1. **OAuth 2.0 / JWT (RFC 7519):**
   - **Enforced by:** IETF
   - **What it is:** A standard for securely transmitting information between parties as a JSON object.
   - **How it's met:** MavHousing uses signed JWTs for stateless session management and secure API access.
2. **REST API Design (RFC 7231):**
   - **Enforced by:** IETF
   - **What it is:** A set of principles for building interoperable web services using standard HTTP methods.
   - **How it's met:** All microservices expose RESTful endpoints organized by domain, documented via Swagger/OpenAPI.
3. **WCAG 2.1 (Web Content Accessibility Guidelines):**
   - **Enforced by:** W3C
   - **What it is:** Guidelines for making web content accessible to people with disabilities.
   - **How it's met:** The frontend follows WCAG 2.1 Level AA standards using accessible Radix UI components and high-contrast themes.
4. **ISO/IEC 27001 (Information Security):**
   - **Enforced by:** ISO
   - **What it is:** An international standard for information security management systems.
   - **How it's met:** Implementation of RBAC, bcrypt password hashing, and secure Cloudflare R2 object storage for sensitive files.
5. **Programming Standards (Clean Code):**
   - **Enforced by:** Industry Best Practices
   - **What it is:** Principles for writing readable, maintainable, and testable code.
   - **How it's met:** Use of ESLint, Prettier, and TypeScript across the monorepo to ensure consistent code quality and reduce technical debt.

## System Overview
MavHousing is architected as a NestJS monorepo comprising several independent microservices. The **Auth Service** manages identity and RBAC; the **Internal API** handles core domain logic, AI integrations (Google Gemini), and database operations (Prisma/PostgreSQL and Mongoose/MongoDB); and the **Comms Service** manages outbound notifications via Resend and Twilio. The **Next.js Frontend** provides a polished, responsive user experience for all user roles. Redis and BullMQ are utilized for background job processing, such as automated report generation and scheduled tasks.

## Results
MavHousing was successfully developed as a functional, end-to-end university housing management solution. The system demonstrates complete workflows from initial student application through AI-driven verification to final lease approval and maintenance resolution. Performance testing shows that the microservice architecture effectively scales to handle concurrent user interactions and background processing tasks.

*(Demo Video: Link to be provided upon recording)*

## Future Work
- **Live Payment Gateway:** Integration with Stripe or similar processors for real-time ACH and credit card transactions.
- **Native Mobile App:** Extending the platform to iOS and Android using React Native for push notifications and on-the-go maintenance requests.
- **AI-Driven Roommate Matching:** Using machine learning to analyze student lifestyle preferences for automated, high-compatibility pairings.
- **Automated Lease Renewals:** Implementing a one-click renewal system for returning students to simplify the housing transition each semester.

## Project Files
- [Project Charter](https://drive.google.com/file/d/1T7EqSGyQYTCm-g4328QQapX1ejH5yZmH/view?usp=drive_link)
- [System Requirements Specification](https://drive.google.com/file/d/1VSDdpqsW0CMKccbGc0i9dx_1PB5hnkhH/view?usp=drive_link)
- [Architectural Design Specification](https://drive.google.com/file/d/1zPHfOZJyTKmP4G-OiZ7EfhemwQTFKftP/view?usp=sharing)
- [Detailed Design Specification](https://drive.google.com/file/d/1REWGw1E6YZqnFI6L8NdbWojFMkYT2Mf0/view?usp=drive_link)
- [Project Poster](https://drive.google.com/file/d/1AfX_vvt4lrAL-vyUN-ZF-Amrbe3RARe_/view?usp=sharing)

## References
1. Next.js Documentation. React Framework for Production. https://nextjs.org/docs
2. NestJS Documentation. Progressive Node.js Framework. https://docs.nestjs.com
3. Prisma Documentation. Next-generation ORM for Node.js & TypeScript. https://www.prisma.io/docs
4. Socket.IO Documentation. Real-time WebSocket Library. https://socket.io/docs
5. Redis Documentation. In-memory Data Store. https://redis.io/docs
6. BullMQ Documentation. Redis-based Queue System. https://docs.bullmq.io
7. Cloudflare R2 Documentation. S3-compatible Object Storage. https://developers.cloudflare.com/r2
8. Swagger OpenAPI Specification. API Documentation Standard. https://swagger.io/specification/
9. Google AI Gemini API Documentation. Generative AI Models. https://ai.google.dev
