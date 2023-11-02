export default class FakeReservationsApi {
  reservations = {
    "2023-11-03": [
      {
        tableId: 0,
        reservedTimes: ["20:00", "21:00","22:00"],
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
  allHours = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  tables = [
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


  getSuitableTables(guests) {
    let suitableTables = this.tables.filter(
      (t) => t.minGuests <= guests && guests <= t.seats
    );
    return suitableTables;
  }
  async fetchAPI(dateString, guests) {
    //add fake network delay
    //await new Promise((r) => setTimeout(r, 2000));

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
          (t) => t.tableId === table.tableId
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
  async submitAPI(formData){
    let suitableTables = this.getSuitableTables(formData.guests);
    if (!this.reservations.hasOwnProperty(formData.date)){
        this.reservations[formData.date] = [];
    }

    for(let sTable of suitableTables){
        let reserved = this.reservations[formData.date]?.find(t=>t.tableId === sTable.tableId)
        if(!reserved){
            this.reservations[formData.date].push({
                tableId:sTable.tableId,
                reservedTimes:[formData.time]
            })
            return {message:"success"}
        }
        if (reserved.reservedTimes.includes(formData.time)){
            continue;
        }
        else{
            reserved= {
                ...reserved,
                reservedTimes:[...reserved.reservedTimes, formData.time]
            }
        }
    }
    return {message:"fail"}
  }
}
