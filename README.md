# meteor-taxes-avalara

This is a Reaction Commerce plugin that fully integrates with the Avalara tax service toh provide real-time tax
computation and tax return filings.

## This plugin is a community plugin and is not supported by the Reaction team.
Please use *at your own risk*. The Reaction team will not respond to issues or PR's on this
but welcome the community to contribute.

## How to install

1. Navigate to `<reaction-root>/imports/plugins/custom`
2. `git clone git@github.com:reaction-contrib/meteor-taxes-avalara.git`
3. `reaction reset`

## First Step: Acquire account information from Avalara

In order to enable the Avalara service in Reaction you must have an API login key, username and password. You can get
more information and sign up for an account [here](http://developer.avalara.com/)

## Second Step: Configuation

The Avalara configuration screen can be reached from the Tax dashboard panel. Move the slider to the right to enable.

<p align="center">
  <img width="260" src="https://raw.githubusercontent.com/reaction-contrib/meteor-taxes-avalara/master/images/avalara-tax-panel.png">
</p>

Once enabled you have a number of options to configure

### Configuration Fields

#### Avalara API Login ID

The API Login ID provided to you by Avalara (this is a required field)

#### Username

The Username provided to you by Avalara. This is the same username you use to log into
the administrator dashboard (this is a required field)

#### Password

The Password provided to you (or created by you) for Avalara. This is the same password
you would use to log into the administrator dashboard (this is a required field)

#### Company Code

The company code you created in the Avalara administrator panel. (this is a required field)

#### Shipping Tax Code

This is the tax code you want to record Shipping under. By default in Reaction, shipping is not Taxable. While
this code is not technically required to report taxes, it is required to report taxes on shipping correctly
so we require it here. You can use the code `NT` (Non-Taxable) if you don't have a specific code you 
wish to use.

#### Address Validation

Whether you want to use the Avalara service to validate shipping addresses as entered by the customer.
Avalara requires you provide valid addresses for proper tax reporting, but you can disable this if
you have another address validation service in place.

#### Enable Address Validation by Country

Avalara only supports address validation in the US and Canada and this option allows you to disable
validation for an individual country.

#### Request Timeout

This is the maximum time a request should be tried before considered an error. If you experience timeouts you may want to consider
increasing this value. Under normal circumstances you should not need to change this.

#### Production Mode

Whether these are "Live" actual transactions or testing transactions. For development you would normally
keep this as "Sandbox" and only switch to "Live" on your production servers.

#### Perform Tax Calculation

Whether you want to use the Avalara Tax API to calculate taxes on your carts and orders.

#### Retain Log Duration (days)

You should normally only enable transaction logging when you are experiencing some sort of problem. But when you
have logging enabled it produces a lot of data which is stored in your database. This parameter allows you to select how
long you want to store these logs. Logs older than this period will be automatically removed.

#### Commit Documents

This option allows you to send your documents with the commit flag turns off. This essentially turns off Tax reporting
(but not Tax calculation)

#### Test Credentials

This button allows you to confirm if the values you've entered in the form fields are correct. It makes a test API call
to Avalara with your credentials, and reports if a successful connection was established.

### Selecting Tax Codes

Once the configuration is complete you should see that the Product Detail Page (PDP) has a "Tax Code" field
that has been pre-populated with Tax Codes from Avalara. You can also enter any tax code here. This is the tax code
that will be used when the transaction is sent to Avalara.

<p align="center">
  <img width="300" src="https://raw.githubusercontent.com/reaction-contrib/meteor-taxes-avalara/master/images/avalara-tax-code-dropdown.png">
</p>
