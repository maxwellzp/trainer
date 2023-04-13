dev:
	NODE_ENV=development npm run dev
build:
	docker build -t newimg2:env .
run:
	docker run -d -p 3001:3001 --env-file ./.env --rm --name testapp newimg2:env
stop: 
	docker stop testapp
