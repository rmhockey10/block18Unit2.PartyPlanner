// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-ftb-er-web-am";
const RESOURCE_EVENTS = "/events";
const RESOURCE_GUESTS = "/guests";
const RESOURCE_RSVPS = "/rsvps";
const EVENTS_API = BASE + COHORT + RESOURCE_EVENTS;
const GUESTS_API = BASE + COHORT + RESOURCE_GUESTS;
const RSVPS_API = BASE + COHORT + RESOURCE_RSVPS;

// === State ===
let events = [];
let selectedEvent;
let guests = [];
let rsvps = [];

async function getEvents() {
  try {
    const response = await fetch(EVENTS_API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getSelectedEvent(id) {
  try {
    const response = await fetch(EVENTS_API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

// async function getGuests() {
//   try {
//     const response = await fetch(GUESTS_API);
//     const result = await response.json();
//     guests = result.data;
// console.log(guests);
// guestsIds = guests.map((guests) => {
//   return guests.id % 10
// });
//     // console.log(guestsIds);
//     render();
//   } catch (e) {
//     console.error(e);
//   }
// }

// async function getRSVPs() {
//   try {
//     const response = await fetch(RSVPS_API);
//     const result = await response.json();
//     rsvps = result.data;
//     console.log(rsvps);
//     render();
//   } catch (e) {
//     console.error(e);
//   }
// }

// === Components ===

function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
      <a href="#selected">${event.name}</a>
    `;
  $li.addEventListener("click", () => getSelectedEvent(event.id));
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $events = events.map((event) => EventListItem(event));
  $ul.replaceChildren(...$events);

  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <p>${selectedEvent.date}</p>
    <p>${selectedEvent.location}</p>
    <figure>
      <img alt=${selectedEvent.name} src=${selectedEvent.imageUrl} />
    </figure>
    <p>${selectedEvent.description}</p>
  `;
  return $event;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Party Planner</h1>
      <main>
        <section>
          <h2>Events</h2>
          <EventList></EventList>
        </section>
        <section id="selected">
          <h2>Event Details</h2>
          <EventDetails></EventDetails>
        </section>
      </main>
    `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  // await getGuests();
  // await getRSVPs()
  render();
}

init();
