import FakeReservationsApi from "../data/fakeApi";
import { format } from "date-fns";

const date = format(new Date(2023, 10, 3), "yyyy-MM-dd");
const allHours = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const tables = [
  {
    tableId: 0,
    seats: 4,
    minGuests: 3,
  },
  {
    tableId: 1,
    seats: 4,
    minGuests: 3,
  },
  {
    tableId: 2,
    seats: 2,
    minGuests: 1,
  },
  {
    tableId: 3,
    seats: 2,
    minGuests: 1,
  },
  {
    tableId: 4,
    seats: 6,
    minGuests: 5,
  },
  {
    tableId: 5,
    seats: 8,
    minGuests: 6,
  },
  {
    tableId: 6,
    seats: 12,
    minGuests: 9,
  },
];
const api = new FakeReservationsApi(allHours, tables);

describe("getSuitableTables", () => {
  test("returns tables array with 2 suitable tables when guest size is 1", () => {
    api.tables = tables;
    let suitableTables = api.getSuitableTables(1);
    expect(suitableTables.length).toBe(2);
    expect(suitableTables.every((t) => t.seats === 2)).toBeTruthy();
  });
  test("returns tables array with 1 suitable tables when guest size is 12", () => {
    api.tables = tables;
    let suitableTables = api.getSuitableTables(12);
    expect(suitableTables.length).toBe(1);
    expect(suitableTables.every((t) => t.seats === 12)).toBeTruthy();
  });
  test("returns empty array when guest size is more than the biggest table", () => {
    api.tables = tables;
    let suitableTables = api.getSuitableTables(13);
    expect(suitableTables.length).toBe(0);
  });
});

describe("fetchAPI", () => {
  test("returns array with all hours when a date has no reservations", async () => {
    api.reservations = {};

    let hours = await api.fetchAPI(date, 12);
    expect(hours.toString()).toEqual(allHours.toString());
  });

  test("returns empty array if number of guests exceeds capacity of available tables", async () => {
    api.tables = [{ tableId: 0, seats: 2, minGuests: 1 }];
    api.reservations = {};
    await expect(api.fetchAPI(date, 3)).rejects.toThrowError();
  });

  test("return empty array when table is reserved for the day", async () => {
    api.tables = tables;
    api.reservations = {
      "2023-11-03": [
        {
          tableId: 6,
          reservedTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        },
      ],
    };

    let hours = await api.fetchAPI(date, 12);
    expect(hours.length).toBe(0);
  });

  test("return some hours when date has reservations", async () => {
    api.tables = tables;
    api.reservations = {
      "2023-11-03": [
        {
          tableId: 6,
          reservedTimes: ["17:00", "18:00", "21:00", "22:00"],
        },
      ],
    };
    let hours = await api.fetchAPI(date, 12);
    expect(hours.toString()).toEqual(["19:00", "20:00"].toString());
  });
  test("Get all hours when multiple tables are available at different times", async () => {
    api.tables = tables;
    api.reservations = {
      "2023-11-03": [
        {
          tableId: 3,
          reservedTimes: ["17:00", "18:00", "19:00", "20:00"],
        },
        {
          tableId: 2,
          reservedTimes: ["21:00", "22:00"],
        },
      ],
    };
    let hours = await api.fetchAPI(date, 2);
    expect(hours.toString()).toEqual(allHours.toString());
  });
});

describe("submitAPI", () => {
  test("with empty reservations, adds a reservation for the given date and guest count when", async () => {
    api.tables = tables;
    api.reservations = {};

    const formData = {
      date: date,
      guests: 2,
      time: "17:00",
      occasion: "No occasion",
    };
    const response = await api.submitAPI(formData);
    expect(response.message).toBe("success");
    expect(Object.keys(api.reservations).includes(date)).toBeTruthy();
  });
  test("adds a reservation for the given date and guest count", async () => {
    api.tables = tables;
    api.reservations = {
      date: [
        { tableId: 2, reservedTimes: ["18:00", "19:00", "20:00"] },
        { tableId: 3, reservedTimes: ["18:00", "19:00", "20:00"] },
      ],
    };

    const formData = {
      date: date,
      guests: 2,
      time: "17:00",
      occasion: "No occasion",
    };
    const response = await api.submitAPI(formData);
    expect(response.message).toBe("success");
    expect(api.reservations[date][0].reservedTimes.includes("17:00")).toBeTruthy();
  });

  test("fails to add a reservation for the given date and guest count when no available times", async () => {
    api.tables = tables;
    api.reservations = {
      [date]: [
        { tableId: 2, reservedTimes: ["18:00", "19:00", "20:00"] },
        { tableId: 3, reservedTimes: ["18:00", "19:00", "20:00"] },
      ],
    };

    const formData = {
      date: date,
      guests: 2,
      time: "18:00",
      occasion: "No occasion",
    };
    const response = await api.submitAPI(formData);
    expect(response.message).toBe("fail");
  });
});
