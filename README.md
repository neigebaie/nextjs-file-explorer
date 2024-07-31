# Next.js File Explorer

This is a simple Next.js File Explorer.

## Prerequisites

- **Docker**: Make sure you have Docker installed on your system. You can download Docker from [Docker's official website](https://www.docker.com/get-started).

## Getting Started

Follow these instructions to get the project up and running in a Docker container.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/neigebaie/nextjs-file-explorer.git
cd nextjs-file-explorer
```

### 2. Build the Docker Image

To build the Docker image for the project, run the following command in the project directory:

```bash
docker build -t nextjs-file-explorer .
```

This command builds the Docker image and tags it as `nextjs-file-explorer`.

### 3. Run the Docker Container

After building the Docker image, you can run the container using:

```bash
docker run -p 3010:3010 nextjs-file-explorer
```

This command starts the container and maps port 3010 of the container to port 3010 on your local machine. You can access the application by navigating to `http://localhost:3010` in your web browser.

### 4. Environment Variables

Don't forget to set the environment variables, you can use the .env.template to know what has to be filled out.

```
NEXT_PUBLIC_API_URL=
```

### 6. Stopping the Container

To stop the running Docker container, find the container ID using:

```bash
docker ps
```

Then stop it with:

```bash
docker stop <container_id>
```

## Project Structure

Briefly describe the structure of your project.

```
/components  # React components
/app         # Next.js app
/lib         # Libraries
/public      # Public assets
...
```

## Roadmap

- Add file icons depending on file type
- Different color for already downloaded files
- Add total size + number of files + number of dirs

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
