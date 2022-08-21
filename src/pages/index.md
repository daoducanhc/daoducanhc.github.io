# [](#create-a-blog-site) Create a blog site in a nutshell

Welcome to my very first post (hope it will not be the last one) of my personal blog. 

This topic will be how to create a blog site with your custom domain name.

# [](#domain-name-registation) Domain name registation

First step, you will need to register a domain name of your own.

Go to your favorite registation domain name and pick.

There are some few notice if you want your domain name look professional.

* **COM** — commercial websites, though open to everyone
* **NET** — network websites, though open to everyone
* **ORG** — non-profit organization websites, though open to everyone
* **EDU** — restricted to schools and educational organizations
* **MIL** — restricted to the U.S. military
* **GOV** — restricted to the U.S. government
* **US**, UK, RU and other two-letter country codes — each is assigned to a domain name authority in the respective country

# [](#config-domain-name) Config domain name

In this step, you have to config 2 things

## Name Server

Normally, you will use the **default name servers** of the site that you register your domain name.

In my case, I register at _matbao_, so I will use their default name servers.

![](assets/images/.png)

## DNS

Now, you have to create 3 records (in case of using github to host your website)

| Host        | Type         | Value |
|:-------------|:------------------|:------|
| @           | A | 185.199.108.153<br>185.199.109.153<br>185.199.110.153<br>185.199.111.153  |
| www | CNAME   | yourname.github.io  |
| @           | NS     | yourdefault_ns.com   |

In my case, it would be:

| Host        | Type         | Value |
|:-------------|:------------------|:------|
| @           | A | 185.199.108.153<br>185.199.109.153<br>185.199.110.153<br>185.199.111.153  |
| www | CNAME   | daoducanhc.github.io  |
| @           | NS     | ns1.matbao.com<br>ns2.matbao.com   |

# [](#build-a-static-site-generator) Build a static site generator

This part is mostly contributed by another guildline [Original instruction](https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/?fbclid=IwAR1aQi7l0VhkeZ61oLsO-DBGyCwHo8iwclU5twU2HQe8KCqBunSv-jF47pM)

In simple, all you need to do is:

## Fork repo
* Fork this repo [GitHubRepo](https://github.com/doug2k1/nanogen/tree/legacy)
* Add file CNAME and fill it with your domain name (my case is chrisdao.net)

## Run
* Install npm
* Install required packages by npm
```
npm i
```
* Run repo

> For local testing
```
npm run build
npm run serve
```

> For custom domain
```
npm run build:prod
```
# [](#make-it-happen-in-your-own-domain) Make it happen in your own domain

## Config Pages in your github repo

After your command ``` npm run build:prod ```, it will generate a folder ```docs```. This folder is what you want to be shown in your website. 

To make that happen, go to ```Settings```, ```Pages``` and set build from branch ```master```, ```/docs```

Go down to ```Custom domain``` and fill it with your website (my case is chrisdao.net)

Now if you check your website, it is only html without css. It because the source code have the wrong link css (they link to their own name repo ```nanogen```).

## Modify some code

In ```site.config.js```, change line 7 

```
basePath: process.env.NODE_ENV === 'production' ? '/nanogen' : '',
```

to

```
basePath: process.env.NODE_ENV === 'production' ? '' : '',
```
