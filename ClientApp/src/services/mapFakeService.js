const points = [
  {
    "Device": {
      "ID": 9,
      "IMEI": "358480085496414",
      "CreateTime": "2020-06-21T15:25:00",
      "Nickname": "میلاد قدردان جوان",
      "SimNumber": "9157096981",
      "Model": "TMT250",
      "SN": "1102322868",
      "OwnerMobileNumber": "9031457090"
    },
    "Location": {
      "Time": "2020-07-13T20:59:12",
      "Longitude": 59.5987783,
      "Latitude": 36.3231683,
      "Altitude": 0,
      "Angle": 0,
      "Satellites": 0,
      "Speed": 0,
      "Elements": [
        {
          "Id": 240,
          "Value": "AA=="
        },
        {
          "Id": 80,
          "Value": "AA=="
        },
        {
          "Id": 21,
          "Value": "BA=="
        },
        {
          "Id": 200,
          "Value": "Aw=="
        },
        {
          "Id": 69,
          "Value": "Aw=="
        },
        {
          "Id": 67,
          "Value": "Dns="
        },
        {
          "Id": 68,
          "Value": "AAA="
        }
      ]
    }
  },
  {
    "Device": {
      "ID": 13,
      "IMEI": "358480085786194",
      "CreateTime": "2020-06-22T07:33:00",
      "Nickname": "N/A",
      "SimNumber": "0000000000",
      "Model": "N/A",
      "SN": "N/A",
      "OwnerMobileNumber": null
    },
    "Location": {
      "Time": "2020-10-12T09:56:09",
      "Longitude": 59.5710116,
      "Latitude": 36.3237949,
      "Altitude": 0,
      "Angle": 0,
      "Satellites": 0,
      "Speed": 0,
      "Elements": [
        {
          "Id": 240,
          "Value": "AA=="
        },
        {
          "Id": 80,
          "Value": "AA=="
        },
        {
          "Id": 21,
          "Value": "BA=="
        },
        {
          "Id": 200,
          "Value": "Aw=="
        },
        {
          "Id": 69,
          "Value": "Aw=="
        },
        {
          "Id": 67,
          "Value": "Du4="
        },
        {
          "Id": 68,
          "Value": "AAA="
        }
      ]
    }
  }
];
export function getPoints() {
  return points;
}