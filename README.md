# 🛠️ Knowledge Quotient API

Knowledge Quoteint is a standalone Webapp for spiritual seekers on the path of knwoledge. more details here [Path of Knowledge Program ](https://oormi.in/pokp/index.php)

This API repo is built for serving resources that will can be consumed by frontend technologies and mobile apps.



## Prerequisites

- Composer
- PHP >= 7.3


## Setup

Grab the repo and install the dependencies.

```bash
git clone https://github.com/pokadmin/kq_back_end.git
cd kq_back_end
composer install
```


## Database Setup
setup a MySQl DB 
```
knowledge_quotient
```


### Migrate and Seed your database

Run the migrations and seed the database with:

```bash
php artisan migrate --seed
```

## Running your app

Run the application with:

```bash
php artisan serve
```

If you get the message that your app key is missing, click on the button to generate one, and then refresh.

## Testing

The endpoints to get all comments and get a single comment should be public and accessible without an access token. Run the following cURL command and you should get a response with all comments.

```bash
curl http://localhost:8000/api/QuestionAnswer -i
```
## Development on going.....

