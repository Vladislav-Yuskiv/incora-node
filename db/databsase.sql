 CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255)  NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255)  NULL,
	"password"  varchar(255) NOT NULL,
	"token" varchar(500)  NULL
);
