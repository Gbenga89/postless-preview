# Postless Postman setup

This directory contains a Postman collection and local environment for testing the planned Postless API routes.

## Import

1. Open Postman.
2. Select **Import**.
3. Import `postman/postless.postman_collection.json`.
4. Import `postman/postless.postman_environment.json`.
5. Select the **Postless Local** environment.

## Configure variables

Set these environment variables before running requests:

- `baseUrl`: defaults to `http://localhost:3000`.
- `authToken`: paste a valid bearer token for the user/session you want to test.
- `brandId`: set after creating or selecting a brand.
- `postId`: set after creating or selecting a post.
- `inboxItemId`: set after creating or selecting an inbox item.

The collection sends `Authorization: Bearer {{authToken}}` on every request.

## Maintenance

Keep this collection in sync as routes are added, renamed, or removed. Add new requests to the matching folder with a realistic JSON body and a status-code test script so the team can use Postman as a lightweight API smoke-test surface.
