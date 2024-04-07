## Installation Instructions

This guide will walk you through the setup process for using the application, including creating an API key for ExchangeRate-API, configuring environment variables, and launching the services using Docker Compose.

### Step 1: Obtain ExchangeRate-API Key

Before you start, you need to get an API key from ExchangeRate-API:

1. Visit the ExchangeRate-API website: [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/).
2. Sign up for an account or log in if you already have one.
3. Navigate to your dashboard and generate a new API key.

### Step 2: Configure Environment Variables

After obtaining the API key, you need to add it to your backend service:

1. Locate the `.env` file in your backend service's directory.
2. Open the file and add the following line, replacing `<YOUR_API_KEY>` with the API key you obtained from ExchangeRate-API:

    ```
    EXCHANGE_RATE_API_KEY=<YOUR_API_KEY>
    ```

   Example:
   ```
   EXCHANGE_RATE_API_KEY=699a04e8addb17ca51ff249e
   ```

### Step 3: Launching Services with Docker Compose

With the API key set, you can now launch the services using Docker:

1. Open a terminal or command prompt.
2. Navigate to the root directory of the project where the `docker-compose.yml` file is located.
3. Run the following command to start the services in detached mode:

   ```
   docker compose up -d
   ```

   This command will download the necessary Docker images (if not already downloaded), build the containers, and start the services in the background.

### Step 4: Accessing the Application

Once the services are up and running, you can access the application:

1. Open your web browser.
2. Navigate to `localhost:4001/api` to check the created routes and interact with the application.

### Additional Notes

- Ensure Docker is installed on your system before running `docker compose up`. If Docker is not installed, visit [Docker's official website](https://www.docker.com/) for installation instructions.
- If you make changes to the `.env` file or Docker configuration, you may need to rebuild the containers. You can do this by running `docker compose up -d --build`.
