import { test, expect } from "@playwright/test";
import { loadTestUsers } from '../../utils/loadTestUsers';
import UserService from '../../api-services/UserService.ts'

test.describe('User API tests', () => {
  let token: string;
  let username1: string;
  let username2: string;
  let fullName: string;
  let biography: string;
  let website: string;
  let location: string;
  let userService: UserService;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username1 = testApiUsers.users.QaAutoUser1.username;
    username2 = testApiUsers.users.QaAutoUser2.username;
    fullName = testApiUsers.users.QaAutoUser2.fullName;
    biography = testApiUsers.users.QaAutoUser2.biography;
    website = testApiUsers.users.QaAutoUser2.website;
    location = testApiUsers.users.QaAutoUser2.location;
  })

  test.beforeEach(({ request }) => {
    userService = new UserService(request);
  })

  test("Get authenticated user", async () => {
  const response = await userService.getAuthenticatedUser(token);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.login).toBe(`${username2}`);
});

test("Get user settings", async () => {
  const response = await userService.getUserSettings(token);
  expect(response.status()).toBe(200);
});

test("Update user settings", async () => {
  const randomSuffix = Date.now();
  const response = await userService.updateUserSettings(token, fullName, biography, website, location);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.full_name).toBe(`${fullName}${randomSuffix}`);
  expect(body.description).toBe(`${biography}${randomSuffix}`);
  expect(body.website).toBe(`${website}${randomSuffix}`);
  expect(body.location).toBe(`${location}${randomSuffix}`);
});

test("Get following users", async () => {
  const response = await userService.getFollowingUsers(token);
  expect(response.status()).toBe(200);
});

})

test.describe("Add a following user", () => {
  let token: string;
  let username: string;
  let userService: UserService;

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username = testApiUsers.users.QaAutoUser1.username;
  })

  test.beforeEach(({ request }) => {
    userService = new UserService(request);
  })

  test("Follow a user", async () => {
    const response = await userService.addFollowingUser(token, username);
    expect(response.status()).toBe(204);
  });

  test.afterEach(async () => {
    const response = await userService.deleteFollowingUser(token, username);
    expect(response.status()).toBe(204);
  });
});

test.describe("Unfollow a user", () => {
  let token: string;
  let username: string;
  let userService: UserService;

test.beforeEach(({ request }) => {
    userService = new UserService(request);
  })

  test.beforeAll(() => {
    const testApiUsers = loadTestUsers();
    token = testApiUsers.users.QaAutoUser2.apiKey;
    username = testApiUsers.users.QaAutoUser1.username;
    
  })
  test.beforeEach(async () => {
    const response = await userService.addFollowingUser(token, username);
    expect(response.status()).toBe(204);
  });

  test("Delete following user", async () => {
    const response = await userService.deleteFollowingUser(token,username);
    expect(response.status()).toBe(204);
  });
});
