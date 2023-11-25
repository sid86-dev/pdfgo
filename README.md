# PDFGo 📄🚀

Welcome to PDFGo, your all-in-one solution for working with PDF files! PDFGo is a versatile software and API service that empowers you to extract images from PDF files and provides a range of other functionalities. Whether you're building a React Native mobile app, a Next.js web app, or a Node.js server, PDFGo has got you covered.

## Features 🌟

- **Image Extraction**: Extract images effortlessly from PDF files.
- **Cross-Platform**: Compatible with React Native, Next.js, and Node.js.
- **API Service**: Easily integrate PDFGo functionalities into your applications.
- **Turbo Repo**: All components bundled in a Turbo repository for seamless collaboration.

## Components 🛠️

PDFGo comprises the following components:

1. **React Native Mobile App**: A mobile app built with React Native for a smooth cross-platform experience.

2. **Next.js Web App**: A web application developed with Next.js, making it easy to deploy and scale.

3. **Node.js Server**: Powering the backend with Node.js for robust and efficient server-side operations.

4. **FastAPI Lambda**: Leverage the serverless capabilities of FastAPI Lambda for scalable and cost-effective processing.


## React Native Mobile App 📱

### Overview
> The React Native mobile app is designed to provide a user-friendly experience for extracting images from PDF files on mobile devices. It seamlessly 
  integrates with PDFGo's core functionalities, allowing users to navigate through PDFs and extract images with ease.

### Usage
Explore the `react-native-app` directory to understand the structure of the React Native app. Key features include a PDF viewer and an image extraction interface.

### How to Run
```bash
cd react-native-app
npm install
npx react-native run-android  # or run-ios for iOS
```

## Next.js Web App 🌐

### Overview
> The Next.js web app offers a responsive and scalable solution for interacting with PDFGo through a web interface. Users can upload PDFs, view content, and 
  utilize PDF extraction functionalities conveniently.

### Usage
Navigate to the `nextjs-web-app` directory to explore the web app's source code. The web app provides an intuitive interface for interacting with PDFGo's features.

### How to Run
```bash
cd nextjs-web-app
npm install
npm run dev
```

Visit `http://localhost:3000` to access the Next.js web app.

## Node.js Server ⚙️

### Overview
> The Node.js server forms the backbone of PDFGo, handling backend operations, including PDF extraction and other functionalities. It acts as a central hub 
  for communication between the frontend and external services.

### Usage
Inspect the `node-server` directory to delve into the Node.js server code. This component orchestrates PDF processing and ensures smooth communication between the frontend and other services.

### How to Run
```bash
cd node-server
npm install
npm start
```

The server will be running at `http://localhost:your-api-port`.

## FastAPI Lambda 🚀📤

### Overview
> FastAPI Lambda offers a serverless solution for PDFGo, providing a scalable and cost-effective way to handle PDF operations. It allows for efficient 
  processing without the need for managing server infrastructure.

### Usage
Explore the FastAPI Lambda component in the respective directory for details on its integration with PDFGo. This component is designed for seamless serverless execution.

## API Endpoints 🚀

### Overview
PDFGo exposes a set of API endpoints that enable seamless communication between different components. These endpoints facilitate various functionalities, including image extraction and other PDF-related operations.

### Available Endpoints
- `/api/v1/pdf/extract/images`: Extract images from a PDF file.

## Contributions and Issues 🤝

Contributions to PDFGo are highly encouraged! If you encounter any issues or have ideas for improvements, please create issues or submit pull requests. Your feedback and contributions are essential to the growth of PDFGo.

## License 📝

PDFGo is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute PDFGo according to the terms of the license.

Happy exploring and contributing to PDFGo! 🚀📄
