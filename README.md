# HTTP Web Crawler

A web crawler built by following the [FreeCodeCamp "HTTP Networking in Node.js" course](https://www.freecodecamp.org/news/http-networking-in-node-js-a-beginners-guide/).

This tool is designed for SEO experts to analyze the internal linking structure of a website, showing which pages link to other pages within the same domain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository to your local machine.
2.  Navigate into the project directory.
3.  Initialize the project. The `npm init` command will guide you through creating a `package.json` file. You can accept the defaults by pressing Enter.
    ```bash
    npm init
    ```
4.  If there are dependencies listed in `package.json` (or if you add them later), you would install them with:
    ```bash
    npm install
    ```

## Usage

To run the web crawler, you first need to configure the `start` script in your `package.json` file.

1.  Open `package.json` and add the following to the `scripts` object:

    ```json
    "scripts": {
      "start": "node main.js"
    }
    ```

2.  Now, you can start the web crawler from your terminal by running:

    ```bash
    npm start [YOUR_DESIRED_URL_TO_CRAWL]
    ```

