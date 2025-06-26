# Test info

- Name: Repository API tests >> Search a repo
- Location: D:\QA Madness\gitea-practice\tests\api\repository.spec.ts:38:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 409
    at D:\QA Madness\gitea-practice\tests\api\repository.spec.ts:21:31
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import { loadTestUsers } from '../../utils/loadTestUsers';
   3 |
   4 | const testApiUsers = loadTestUsers();
   5 |
   6 | test.describe("Repository API tests", () => {
   7 |   const token = testApiUsers.users.QaAutoUser2.apiKey;
   8 |   const owner = testApiUsers.users.QaAutoUser2.username;
   9 |   let repo = "test-repo-1";
  10 |   let repoId: number;
  11 |
  12 |   test.beforeEach(async ({ request }) => {
  13 |     const response = await request.post("/api/v1/user/repos", {
  14 |       headers: {
  15 |         Authorization: `token ${token}`,
  16 |       },
  17 |       data: {
  18 |         name: `${repo}`,
  19 |       },
  20 |     });
> 21 |     expect(response.status()).toBe(201);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  22 |     const body = await response.json();
  23 |     expect(body.name).toBe(`${repo}`);
  24 |     repoId = body.id;
  25 |   });
  26 |
  27 |   test("Get repo by Id", async ({ request }) => {
  28 |     const response = await request.get(`/api/v1/repositories/${repoId}`, {
  29 |       headers: {
  30 |         Authorization: `token ${token}`,
  31 |       },
  32 |     });
  33 |     expect(response.status()).toBe(200);
  34 |     const body = await response.json();
  35 |     expect(body.name).toBe(`${repo}`);
  36 |   });
  37 |
  38 |   test('Search a repo', async({ request }) => {
  39 |     const response = await request.get(`/api/v1/repos/search?q=${repo}`);
  40 |     expect(response.status()).toBe(200);
  41 |     const body = await response.json();
  42 |     expect(body.data[0].name).toBe(`${repo}`);
  43 |     expect(body.data[0].full_name).toBe(`${owner}/${repo}`);
  44 |   })
  45 |
  46 |   test("Update a repository", async ({ request }) => {
  47 |     const response = await request.patch(`/api/v1/repos/${owner}/${repo}`, {
  48 |       headers: {
  49 |         Authorization: `token ${token}`,
  50 |       },
  51 |       data: {
  52 |         name: `${repo}-updated`,
  53 |       },
  54 |     });
  55 |     expect(response.status()).toBe(200);
  56 |     const body = await response.json();
  57 |     expect(body.name).toBe(`${repo}-updated`);
  58 |     repo = body.name;
  59 |   });
  60 |
  61 |   test('Delete a repository', async ({ request }) => {
  62 |     const response = await request.delete(`/api/v1/repos/${owner}/${repo}`, {
  63 |         headers: {
  64 |           Authorization: `token ${token}`,
  65 |         },
  66 |       });
  67 |       expect(response.status()).toBe(204);
  68 |   })
  69 |
  70 |   test.afterEach(async ({ request }) => {
  71 |     const repoExists = await request.get(`/api/v1/repositories/${repoId}`, {
  72 |       headers: {
  73 |         Authorization: `token ${token}`,
  74 |       },
  75 |     });
  76 |     if (repoExists.status() === 200) {
  77 |       const response = await request.delete(`/api/v1/repos/${owner}/${repo}`, {
  78 |         headers: {
  79 |           Authorization: `token ${token}`,
  80 |         },
  81 |       });
  82 |       expect(response.status()).toBe(204);
  83 |     }
  84 |   });
  85 | });
  86 |
```