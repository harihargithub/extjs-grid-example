# Sencha Ext JS Grid Example

Advanced Sencha Ext JS Grid and Pivot Grid Showcase

## Application Sample Higtlights

- Multi theme
- Dark mode
- Theme colors (Material)
- Multi locale
- Responsive (Desktop, Tablet, Phone)
- Feature rich grid with many plugins
- Multi Grouping Grid
- Pivot Grid
- Grid Export to many file formats (xlsx, html, csv, etc...)

## Getting started
### Requirements

- Install [Node.js](https://nodejs.org/) (8+)
- Sencha Cmd 7.8.0 and later requires Oracle JRE (SE) 8-21 or OpenJDK 8-21.


### Running and building the application
Install the Ext JS framework dependencies:

### If you are a TRIAL customer

In this application example we are using some premium packages from Sencha, and you can download the addons trial version by signing
 up the form sencha sends to you by an email with the download links

[Sign up for the trial to download the zip](https://www.sencha.com/products/evaluate/)


### Add the Add-ons Components to your Project

#### Step 1: Extract the zip
Open the zip and extract the resources into a folder that you can keep as a reference to Ext JS resources.

#### Step 2: Copy the Add-ons packages
In this step, you copy the add-ons packages to your project. In this example we will use the Pivot and exporter add-ons as the example package.

Copy the add-ons packages [ext-addons-7.8.0-trial.zip]/packages to [project]/packages/local/.


# Step 3: Install npm dependences


    $ npm install



### If you are an ACTIVE customer

Ext JS and all related commercial packages are hosted on Sencha's private npm registry. Login to the registry using the following command which configures npm to download packages in the @sencha scope from Sencha's registry.

Username Note:

The email and password used during support portal activation (after license purchase) will be used to login to Sencha’s NPM repo. The username is the same as the email used, however, the @ character is replaced with '..' two periods. For example name@gmail.com converts to username: name..gmail.com

    $ npm login --registry=https://npm.sencha.com/ --scope=@sencha

    $ npm install

In this application example we are using some premium package from Sencha, and you can install the addons by npm by running the follow command.

    $ npm install @sencha/ext-pivot @sencha/ext-pivot-locale @sencha/ext-exporter



Development build:

    $ npm start

Production build:

    $ npm run build

### Run the app

    $ npm start


### Next Steps:

Now that you are on a successful path to building Ext JS applications, take some time to explore how to enhance your apps using hundreds of UI components, design, testing and debugging tools.

Explore more [examples](https://examples.sencha.com/extjs/), [resources](https://www.sencha.com/resources/) and [documentation](https://docs.sencha.com/extjs/).