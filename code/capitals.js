const capitals = [
  "Montgomery",
  "Juneau",
  // "Phoenix",
  // "Little Rock",
  // "Sacramento",
  // "Denver",
  // "Hartford",
  // "Dover",
  // "Tallahassee",
  // "Atlanta",
  // "Honolulu",
  // "Boise",
  // "Springfield",
  // "Indianapolis",
  // "Des Moines",
  // "Topeka",
  // "Frankfort",
  // "Baton Rouge",
  // "Augusta",
  // "Annapolis",
  // "Boston",
  // "Lansing",
  // "Saint Paul",
  // "Jackson",
  // "Jefferson City",
  // "Helena",
  // "Lincoln",
  // "Carson City",
  // "Concord",
  // "Trenton",
  // "Santa Fe",
  "Albany",
  "Raleigh",
  "Bismarck",
  "Columbus",
  "Oklahoma City",
  "Salem",
  "Harrisburg",
  "Providence",
  "Columbia",
  "Nashville",
  "Austin",
  "Salt Lake City",
  "Montpelier",
  "Richmond",
  "Olympia",
  "Charleston",
  "Madison",
  "Cheyenne",
  "Chicago",
  "NYC",
  // "Abidjan",
  // "Yamoussoukro",
  // "Abu Dhabi",
  // "Abuja",
  // "Accra",
  // "Adamstown",
  // "Addis Ababa",
  // "Algiers",
  // "Alofi",
  // "Amman",
  // "Amsterdam",
  // "The Hague",
  // "Andorra la Vella",
  // "Ankara",
  // "Antananarivo",
  // "Apia",
  // "Ashgabat",
  // "Asmara",
  // "Astana",
  // "Asunción",
  // "Athens",
  // "Avarua",
  // "Baghdad",
  // "Baku",
  // "Bamako",
  // "Bangkok",
  // "Bangui",
  // "Banjul",
  // "Basseterre",
  // "Beijing",
  // "Beirut",
  // "Belfast",
  // "Belgrade",
  // "Belmopan",
  // "Berlin",
  // "Bern",
  // "Bishkek",
  // "Bissau",
  // "Bloemfontein",
  // "Cape Town",
  // "Pretoria",
  // "Bogotá",
  // "Brades",
  // "Plymouth",
  // "Brasília",
  // "Bratislava",
  // "Brazzaville",
  // "Bridgetown",
  // "Brussels",
  // "Bucharest",
  // "Budapest",
  // "Buenos Aires",
  // "Cairo",
  // "Camp Thunder Cove",
  // "Canberra",
  // "Caracas",
  // "Cardiff",
  // "Castries",
  // "Cetinje",
  // "Podgorica",
  // "Charlotte Amalie",
  // "Chișinău",
  // "Cockburn Town",
  // "Colombo",
  // "Conakry",
  // "Copenhagen",
  // "Cotonou",
  // "Porto-Novo",
  // "Dakar",
  // "Damascus",
  // "Dar es Salaam",
  // "Dodoma",
  // "Dhaka",
  // "Dili",
  // "Djibouti",
  // "Doha",
  // "Douglas",
  // "Dublin",
  // "Dushanbe",
  // "Edinburgh",
  // "Flying Fish Cove",
  // "Freetown",
  // "Funafuti",
  // "Gaborone",
  // "George Town",
  // "Georgetown",
  // "Georgetown",
  // "Gibraltar",
  // "Gitega",
  // "Bujumbura",
  // "Guatemala City",
  // "Gustavia",
  // "Hamilton",
  // "Hanoi",
  // "Harare",
  // "Hargeisa",
  // "Havana",
  // "Helsinki",
  // "Honiara",
  // "Islamabad",
  // "Jakarta",
  // "Jamestown",
  // "Jerusalem",
  // "Ramallah",
  // "Juba",
  // "Kabul",
  // "Kampala",
  // "Kathmandu",
  // "Khartoum",
  // "Kigali",
  // "King Edward Point",
  // "Kingston",
  // "Kingston",
  // "Kingstown",
  // "Kinshasa",
  // "Kuala Lumpur",
  // "Kuwait City",
  // "La Paz",
  // "Sucre",
  // "Laâyoune",
  // "Tifariti",
  // "Libreville",
  // "Lilongwe",
  // "Lima",
  // "Lisbon",
  // "Ljubljana",
  // "Lobamba",
  // "Mbabane",
  // "Lomé",
  // "London",
  // "Luanda",
  // "Lusaka",
  // "Luxembourg",
  // "Madrid",
  // "Majuro",
  // "Malabo",
  // "Malé",
  // "Managua",
  // "Manama",
  // "Manila",
  // "Metro Manila",
  // "Maputo",
  // "Mariehamn",
  // "Marigot",
  // "Maseru",
  // "Mata Utu",
  // "Mexico City",
  // "Minsk",
  // "Mogadishu",
  // "Monaco",
  // "Monrovia",
  // "Montevideo",
  // "Moroni",
  // "Moscow",
  // "Muscat",
  // "Nairobi",
  // "Nassau",
  // "N'Djamena",
  // "New Delhi",
  // "Niamey",
  // "Nicosia",
  // "Nouakchott",
  // "Nouméa",
  // "Nuuk",
  // "Oranjestad",
  // "Oslo",
  // "Ottawa",
  // "Ouagadougou",
  // "Pago Pago",
  // "Palikir",
  // "Panama City",
  // "Papeete",
  // "Paramaribo",
  // "Paris",
  // "Philipsburg",
  // "Phnom Penh",
  // "Port Louis",
  // "Port Moresby",
  // "Port of Spain",
  // "Port Vila",
  // "Port-au-Prince",
  // "Prague",
  // "Brno",
  // "Praia",
  // "Pristina",
  // "Pyongyang",
  // "Quito",
  // "Rabat",
  // "Reykjavík",
  // "Riga",
  // "Riyadh",
  // "Road Town",
  // "Rome",
  // "Roseau",
  // "Saipan",
  // "San José",
  // "San Juan",
  // "San Marino",
  // "San Salvador",
  // "Santiago",
  // "Valparaíso",
  // "Santo Domingo",
  // "São Tomé",
  // "Sarajevo",
  // "Seoul",
  // "Sejong City",
  // "Singapore",
  // "Skopje",
  // "Sofia",
  // "South Tarawa",
  // "St. George's",
  // "St. Helier",
  // "St. Peter Port",
  // "St. Pierre",
  // "Stanley",
  // "Stepanakert",
  // "Stockholm",
  // "Sukhumi",
  // "Suva",
  // "Taipei",
  // "Tallinn",
  // "Tashkent",
  // "Tbilisi",
  // "Tegucigalpa",
  // "Comayagüela",
  // "Tehran",
  // "Thimphu",
  // "Tirana",
  // "Tiraspol",
  // "Tokyo",
  // "Tórshavn",
  // "Tripoli",
  // "Tunis",
  // "Ulaanbaatar",
  // "Vaduz",
  // "Valletta",
  // "The Valley",
  // "Vatican City",
  // "Victoria",
  // "Vienna",
  // "Vientiane",
  // "Vilnius",
  // "Warsaw",
  // "Washington, D.C.",
  // "Wellington",
  // "West Island",
  // "Willemstad",
  // "Windhoek",
  // "Yaoundé",
  // "Yaren",
  // "Yerevan",
  "Zagreb"
];