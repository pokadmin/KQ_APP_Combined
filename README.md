# 🛠️ Knowledge Quotient API

Knowledge Quoteint is a standalone Webapp for spiritual seekers on the path of knwoledge. more details here [Path of Knowledge Program ](https://oormi.in/pokp/index.php)

This API repo is built for serving resources that can be consumed by frontend technologies and mobile apps.



## Prerequisites

- Composer
- PHP >= 7.3


## Setup

#### Local Environment setup

we require PHP>=7.3, MySQl DB and Apache server.
Best and easy way to get all three is by installing [XAMPP](https://www.apachefriends.org/download.html).
- Install XAMPP
- After installation and succesfull startup, all the details should be availble at [Dashboard](http://localhost/dashboard)
- DB will be available at  [phpMyadmin](http://localhost/phpmyadmin/)
- Once this basic setup is done, lets get ready for Laravel installation  
- Install Composer - dependancy manager for PHP  [Link](https://getcomposer.org/)
- Go to C:/xampp/htdocs/ ( normally apache serves files out of this folder) 

- Grab the repo and install the dependencies.

```bash
git clone https://github.com/pokadmin/kq_back_end.git
cd kq_back_end
composer install
```
Note: In case 'composer install' is timing out, remove "google/apiclient" from composer.json in the kq_back_end folder and run 'composer update'

## Database Setup
**Setup MySQL DB**
- Go to http://localhost/phpmyadmin/index.php?route=/server/sql or connect to localhost mysql server using your favorite SQL client and execute sql command below 

```sql
create DATABASE knowledge_quotient
```

- Create .env file inside kq_back_end folder from `.env.example`. Verify below important parameters. Optionally change the DB Username and Password according to what you have set in phpmyadmin (if any) 
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knowledge_quotient
DB_USERNAME=root
DB_PASSWORD=
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



## Testing

The endpoints to get all Question_Answers and get a single Question_Answer should be public and accessible without an access token. Run the following cURL command and you should get a response with all Question_Answers.

```bash
curl http://localhost:8000/api/questionAnswer -i
```
## Development on going.....

