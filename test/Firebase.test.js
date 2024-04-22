// Firebase.test.js

import { getDatabase, ref, push, set } from "firebase/database";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  push: jest.fn(() => ({
    set: jest.fn().mockResolvedValue(true),
  })),
}));

describe("Firebase Data Storage", () => {
  it("stores the user path correctly in Firebase", async () => {
    const fakePath = [
      { latitude: 0, longitude: 0 },
      { latitude: 1, longitude: 1 },
    ];

    const db = getDatabase();
    const pathRef = ref(db, "/paths");
    const newPathRef = push(pathRef);

    await set(newPathRef, fakePath);
    expect(newPathRef.set).toHaveBeenCalledWith(fakePath);
  });
});
