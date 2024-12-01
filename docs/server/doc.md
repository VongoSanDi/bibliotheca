Backend technologie analyse:
First was the use of the protocol(HTTP version), in my application i need to load a lot of informations from the user collection for example.
HTTP2 improve the performance mostly thanks to the multiplexing. The multiplexing is allow me to receive multiple information from the same tcp connection. Where in HTTP1 each information need to create a new tcp connection. For a collection of 500 books it is a lot of tcp connections.
https://stackoverflow.com/questions/36517829/what-does-multiplexing-mean-in-http-2
1.    Home Page: Lot of images and informations to receive such as the books cover
   → HTTP/2 multiplexing useful

2. Book details page: not much informations
   → HTTP/2 not really necessary

3. Search a book: same as book details page
   → HTTP/2 not really necessary

4. User collection: lot of books cover, same as Home page
   → HTTP/2 really useful here

Since i'm familiar with js/ts and nestjs the best choice if fastify

ENDPOINTS
- User
- Collection


# Table of contents

# Introduction

# Technology stack
- Node.js
- NestJs
- TypeScript
- Fastify
- Database: MariaDB
- ORM: TypeORM
- Schema Validation: Zod
- Testing: Jest

# Architecture

# Project structure
src/
|-- auth/
|-- author/
    |--dto/ # Data models
    |--entities/ # Entities
    |--controller.ts # Route handler
    |--controller.spec.ts # Router testing
    |--module.ts # Used to resolve module and provider relationships and dependencies
    |--service.ts # Business logic
    |--service.spec.ts # Business logic testing
|-- book/
|-- box-set/
|-- box-set-book/
|-- collection/
|-- collection-volume/
|-- common/
|-- country/
|-- currency/
|-- db/
|-- edition/
|-- genre/
|-- language/
|-- serie/
|-- status/
|-- type/
|-- user/
|-- volume/
test/
