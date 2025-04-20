import { toEpoch, formatDate } from "./dateUtils";
import dayjs from "dayjs";

describe("Date Utility Functions", () => {
  // Test for toEpoch function
  describe("toEpoch", () => {
    it("should convert a valid date string to epoch milliseconds", () => {
      const dateStr = "2025-04-19T00:00:00Z";
      const epoch = toEpoch(dateStr);
      const expectedEpoch = dayjs(dateStr).valueOf();
      expect(epoch).toBe(expectedEpoch);
    });

    it("should handle Dayjs objects and convert to epoch milliseconds", () => {
      const dateStr = "2025-04-19T00:00:00Z";
      const dayjsObj = dayjs(dateStr);
      const epoch = toEpoch(dayjsObj);
      const expectedEpoch = dayjs(dateStr).valueOf();
      expect(epoch).toBe(expectedEpoch);
    });
  });

  // Test for formatDate function
  describe("formatDate", () => {
    it("should format epoch time into a readable date string", () => {
      const epoch = 1713859200000; // corresponds to "Saturday, 19 Apr 2025"
      const formattedDate = formatDate(epoch);
      const expectedDate = dayjs(epoch).format("dddd, DD MMM YYYY");
      expect(formattedDate).toBe(expectedDate);
    });

    it("should return the correct format even for edge cases", () => {
      const epoch = 0; // epoch for "Thursday, 01 Jan 1970"
      const formattedDate = formatDate(epoch);
      const expectedDate = dayjs(epoch).format("dddd, DD MMM YYYY");
      expect(formattedDate).toBe(expectedDate);
    });
  });
});
