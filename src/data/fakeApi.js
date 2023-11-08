import { format, add } from "date-fns";

const tomorrow = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");
const reservationsDefault = {
  [tomorrow]: [
    {
      tableId: 0,
      reservedTimes: ["20:00", "21:00", "22:00"],
    },
    {
      tableId: 1,
      reservedTimes: ["17:00", "21:00"],
    },
    {
      tableId: 2,
      reservedTimes: ["17:00", "21:00"],
    },
    {
      tableId: 3,
      reservedTimes: ["17:00", "21:00"],
    },
    {
      tableId: 6,
      reservedTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    },
  ],
};
const allHoursDefault = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const tablesDefault = [
  {
    tableId: 0,
    seats: 2,
    minGuests: 1,
  },
  {
    tableId: 1,
    seats: 2,
    minGuests: 1,
  },
  {
    tableId: 2,
    seats: 4,
    minGuests: 3,
  },
  {
    tableId: 3,
    seats: 4,
    minGuests: 3,
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
  {
    tableId: 7,
    seats: 16,
    minGuests: 13,
  },
];
const isNetworkDelayDefault = true;
const isRandomSuccessDefault = true;

export default class FakeReservationsApi {
  constructor({
    allHours = allHoursDefault,
    tables = tablesDefault,
    reservations = reservationsDefault,
    isNetworkDelay = isNetworkDelayDefault,
    isRandomSuccess = isRandomSuccessDefault,
  } = {}) {
    this.reservations = reservations;
    this.allHours = allHours;
    this.tables = tables;
    this.isNetworkDelay = isNetworkDelay;
    this.isRandomSuccess = isRandomSuccess;
  }

  getSuitableTables(guests) {
    let suitableTables = this.tables.filter(
      (t) => t.minGuests <= guests && guests <= t.seats,
    );
    return suitableTables;
  }
  async fetchAPI(dateString, guests) {
    //add fake network delay
    if (this.isNetworkDelay) {
      await new Promise((r) => setTimeout(r, 2000));
    }

    let availableHours = new Set();

    let suitableTables = this.getSuitableTables(guests);

    if (!this.reservations.hasOwnProperty(dateString)) {
      //the date has no reserved tables

      if (suitableTables.length > 0) {
        return this.allHours;
      } else {
        throw Error("No tables fit search your criteria");
      }
    } else {
      //the date has reservations, so get all available hour for the suitable tables

      for (const table of suitableTables) {
        //if a suitable table is not reserved for the date - return all possible hours
        let tableWithRes = this.reservations[dateString].find(
          (t) => t.tableId === table.tableId,
        );
        if (tableWithRes) {
          for (const hour of this.allHours) {
            if (!tableWithRes.reservedTimes.includes(hour)) {
              availableHours.add(hour);
            }
          }
        } else {
          return this.allHours;
        }
      }
    }
    return Array.from(availableHours);
  }
  async submitAPI(formData) {
    //add fake network delay
    if (this.isNetworkDelay) {
      await new Promise((r) => setTimeout(r, 2000));
    }
    if (this.isRandomSuccess) {
      let randomFail = Math.round(Math.random() * 100);
      if (randomFail > 50) {
        return {
          message: `Fake Api error. Random number was ${randomFail}. For success, random number should be below 50. Hit Submit Button again`,
        };
      }
    }

    let suitableTables = this.getSuitableTables(formData.guests);
    if (!this.reservations.hasOwnProperty(formData.date)) {
      this.reservations[formData.date] = [];
    }

    for (let sTable of suitableTables) {
      let reserved = this.reservations[formData.date]?.find(
        (t) => t.tableId === sTable.tableId,
      );
      if (!reserved) {
        this.reservations[formData.date].push({
          tableId: sTable.tableId,
          reservedTimes: [formData.time],
        });
        return { message: "success" };
      }
      if (reserved.reservedTimes.includes(formData.time)) {
        continue;
      } else {
        reserved.reservedTimes = [...reserved.reservedTimes, formData.time];

        return { message: "success" };
      }
    }
    return { message: "fail" };
  }

  async getMaxTableSize() {
    let maxTableSize = 0;
    for (let table of this.tables) {
      if (table.seats > maxTableSize) {
        maxTableSize = table.seats;
      }
    }
    return maxTableSize;
  }
}
