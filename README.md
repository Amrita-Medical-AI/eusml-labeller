# Liver-labeller
A simple-to-use web application to facilitate labelling at source during an endoscopic ultrasound procedure.

Contents
========
* [Why?](#why)
* [Installation](#installation)
* [Development](#development)
* [Deployment](#deployment)

## Why?
Hospitals keep a video record of all endoscopy procedures. These videos serve as valuable resources for training AI models but require an expert to retrospectively label the videos, which is a time-consuming process. 
The eusml-labeler streamlines this process by allowing experts to label the videos during the procedure itself. This not only saves time but also ensures more accurate labelling as the expert can label the video in real time.



## Installation
To install the application, follow these steps:

1. Clone the repository:

  ```sh
  git clone https://github.com/Amrita-Medical-AI/eusml-labeller.git
  ```

2. Navigate to the cloned directory:

  ```sh
  cd eusml-labeller
  ```

3. Install the dependencies:

  ```sh
  npm install
  ```

4. Start the application:

  ```sh
  npm start
  ```

The application should now be running on your local machine.

## Development

- This step only applies if you've opted out of having the CLI install dependencies for you:

  ```sh
  npx remix init
  ```

- Validate the app has been set up properly (optional):

  ```sh
  npm run validate
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.


## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments. By default, Arc will deploy to the `us-west-2` region, if you wish to deploy to a different region, you'll need to change your [`app.arc`](https://arc.codes/docs/en/reference/project-manifest/aws)

Prior to your first deployment, you'll need to do a few things:

- Create a new [GitHub repo](https://repo.new)

- [Sign up](https://portal.aws.amazon.com/billing/signup#/start) and login to your AWS account

- Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to [your GitHub repo's secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Go to your AWS [security credentials](https://console.aws.amazon.com/iam/home?region=us-west-2#/security_credentials) and click on the "Access keys" tab, and then click "Create New Access Key", then you can copy those and add them to your repo's secrets.

- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions).

- Create an [AWS credentials file](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html#getting-started-quickstart-new).

- Along with your AWS credentials, you'll also need to give your CloudFormation a `SESSION_SECRET` variable of its own for both staging and production environments, as well as an `ARC_APP_SECRET` for Arc itself.

  ```sh
  npx arc env --add --env staging ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env staging SESSION_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production ARC_APP_SECRET $(openssl rand -hex 32)
  npx arc env --add --env production SESSION_SECRET $(openssl rand -hex 32)
  ```

  If you don't have OpenSSL installed, you can also use [1password](https://1password.com/password-generator) to generate a random secret; just replace `$(openssl rand -hex 32)` with the generated secret.

## Where do I find my CloudFormation?

You can find the CloudFormation template that Architect generated for you in the sam.yaml file.

To find it on AWS, you can search for [CloudFormation](https://console.aws.amazon.com/cloudformation/home) (make sure you're looking at the correct region!) and find the name of your stack (the name is a PascalCased version of what you have in `app.arc`, so by default it's EusmlLabeller88d9Staging and EusmlLabeller88d9Production) that matches what's in `app.arc`, you can find all of your app's resources under the "Resources" tab.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.
