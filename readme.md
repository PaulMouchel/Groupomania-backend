# Bienvenue sur l'API de Groupomania !

Groupomania est le réseau social interne de l'entreprise du même nom. Ce projet a été réalisé dans le cadre de la formation développeur web d'OpenClassRooms.
Ce repository contient l'API qui interagit avec le frontend du repository Groupomania

## A propos
Ce projet a été créé avec le stack suivante:

- <a  href="https://nodejs.org/"  title="Node.js"><img  src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg"  alt="Node.js"  width="21px"  height="21px"> Node.js</a>
- <a  href="https://expressjs.com/"  title="Express"><img  src="https://github.com/get-icon/geticon/raw/master/icons/express.svg"  alt="Express"  width="21px"  height="21px"> Express.js</a>
- <a  href="https://dev.mysql.com/"  title="MySQL"><img  src="https://github.com/get-icon/geticon/raw/master/icons/mysql.svg"  alt="MySQL"  width="21px"  height="21px"> MySQL</a>
- <a  href="https://www.prisma.io/"  title="Prisma"><img  src="https://github.com/get-icon/geticon/raw/master/icons/prisma.svg"  alt="Prisma"  width="21px"  height="21px"> Prisma</a>
- <a  href="https://www.typescriptlang.org/"  title="Typescript"><img  src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg"  alt="Typescript"  width="21px"  height="21px"> Typescript</a>
- <a  href="https://aws.amazon.com/"  title="AWS"><img  src="https://github.com/get-icon/geticon/raw/master/icons/aws.svg"  alt="AWS"  width="21px"  height="21px"> AWS S3</a>
- <a  href="https://www.heroku.com/"  title="Heroku"><img  src="https://github.com/get-icon/geticon/raw/master/icons/heroku-icon.svg"  alt="Heroku"  width="21px"  height="21px"> Heroku</a>



## Démarrer

Pour démarrer ce projet en local, vous pouvez cloner le repository et exécuter les commandes suivantes

	npm install
	npm run dev

Vous devez également ajouter à la racine du projet le fichier `.env` contenant les variables suivantes :

Port de communication :

	PORT=4200

URL de la base de données :

	DATABASE_URL="*****************"

Chaine de caractère aléatoire pour la gestion des JWT :

	RANDOM_TOKEN_SECRET=******************

Accès au bucket AWS S3 :

	S3_ACCESS_KEY_ID=******************
	S3_SECRET_ACCESS_KEY=******************
	S3_BUCKET_NAME=******************