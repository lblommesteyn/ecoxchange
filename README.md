# **EcoXchange**

**EcoXchange** is a web-based platform designed to facilitate the trading of renewable energy and carbon offset certificates. Our mission is to help businesses meet their sustainability goals by providing an easy-to-use marketplace for buying and selling environmental credits.

## **Table of Contents**
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Ran Into](#challenges-we-ran-into)
- [Accomplishments That We’re Proud Of](#accomplishments-that-were-proud-of)
- [What We Learned](#what-we-learned)
- [What’s Next](#whats-next)
- [Tech Stack](#tech-stack)
- [License](#license)

## **Inspiration**
Climate change is a major issue, and businesses are under pressure to reduce their carbon footprints. At the same time, renewable energy markets are growing, but companies that produce renewable energy often have a hard time selling their excess credits. We created **EcoXchange** to make it easy for both sides to trade environmental credits and contribute to global sustainability efforts.

## **What It Does**
**EcoXchange** connects companies that generate renewable energy or alternative energy credits with businesses that need to offset their carbon emissions. Through our platform, users can:
- **Sell**: Upload and list renewable energy certificates (RECs), alternative energy certificates (AECs), and low-carbon fuel standard (LCFS) credits.
- **Buy**: Browse the marketplace and purchase certificates to offset emissions.
- **Validate**: All certificates are validated using AI and cosine similarity to ensure authenticity before trading.

## **How We Built It**
The project was built using a modern, scalable stack:
- **Frontend**: React and Next.js for a smooth, user-friendly interface.
- **Backend**: Node.js and Express for handling API requests and business logic.
- **Database**: MongoDB for secure and efficient certificate data storage.
- **Document Processing**: PyMuPDF for reading and extracting data from uploaded documents.
- **AI Validation**: Cerebras AI, using machine learning and cosine similarity, validates that each certificate is authentic and classifies it accordingly.

## **Challenges We Ran Into**
- **Authentication**: Implementing a secure, scalable system for user authentication and authorization.
- **File Reading**: Ensuring accurate data extraction from a wide variety of renewable energy certificates using PyMuPDF.
- **AI Validation**: Tuning the AI model to accurately classify certificates using cosine similarity to validate authenticity.

## **Accomplishments That We’re Proud Of**
- Built a fully functional minimum viable product (MVP) that enables businesses to trade renewable energy certificates.
- Integrated a smart AI system to validate and classify certificates.
- Developed a clean, responsive, and user-friendly UI that makes the trading process simple.

## **What We Learned**
We learned a lot about the complexities of building a platform that handles sensitive data, such as certificates and financial transactions. We also gained experience integrating machine learning models into real-world applications and balancing user-friendly design with security and performance.

## **What’s Next**
- **Blockchain Integration**: We’re exploring adding blockchain to create an immutable ledger for certificate transactions, improving trust and transparency.
- **Expanded Analytics**: Providing more detailed insights into certificate value trends and sustainability metrics for users.
- **Mobile App**: Creating a mobile version of the platform to make it accessible to more users.

## **Tech Stack**
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Document Processing**: PyMuPDF
- **AI**: Cerebras AI for document validation and classification

## **License**
This project is licensed under the MIT License.
