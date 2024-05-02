import { saveUserPath } from "../src/firebaseFunctions"; // Adjust path as necessary
import { getDatabase, ref, push, set } from "firebase/database";

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(() => ({
    push: jest.fn(() => ({
      set: jest.fn().mockResolvedValue("Mocked path saved"),
    })),
  })),
}));

describe("saveUserPath", () => {
  it("saves a path to the database", async () => {
    const path = [{ latitude: 1, longitude: 2 }];
    const userId = "testUser";

    await saveUserPath(userId, path);

    expect(ref).toHaveBeenCalledWith(`users/${userId}/paths`);
    expect(push).toHaveBeenCalled();
    expect(push().set).toHaveBeenCalledWith(path);
  });
});
