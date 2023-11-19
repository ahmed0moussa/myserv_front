import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

const defaultevent = [
    {
        "id": 1,
        "title": "World Braille Day",
        "start": "2023-01-04T00:00:00.000Z",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },
    {
        "id": 2,
        "title": "World Leprosy Day",
        "start": "2023-01-30",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 3,
        "title": "International Mother Language Day",
        "start": "2023-02-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 4,
        "title": "International Women's Day",
        "start": "2023-03-08",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 5,
        "title": "World Thinking Day",
        "start": "2023-02-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 6,
        "title": "International Mother Language Day",
        "start": "2023-03-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 7,
        "title": "World Water Day",
        "start": "2023-03-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 8,
        "title": "World Health Day",
        "start": "2023-04-07",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 9,
        "title": "International Special Librarians Day",
        "start": "2023-04-16",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 10,
        "title": "Earth Day",
        "start": "2023-04-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    }
];

const events: EventInput[] = [
    {
        "id": createEventId(),
        "title": "World Braille Day",
        "start": "2023-10-24",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },
    {
        "id": createEventId(),
        "title": "World Braille Day",
        "start": "2023-01-04T00:00:00.000Z",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },
    {
        "id": createEventId(),
        "title": "World Leprosy Day",
        "start": "2023-01-30",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "International Mother Language Day",
        "start": "2023-02-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "International Women's Day",
        "start": "2023-03-08",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "World Thinking Day",
        "start": "2023-02-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "International Mother Language Day",
        "start": "2023-03-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "World Water Day",
        "start": "2023-03-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "World Health Day",
        "start": "2023-04-07",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "International Special Librarians Day",
        "start": "2023-04-16",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": createEventId(),
        "title": "Earth Day",
        "start": "2023-04-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },
    
];

const calenderDefaultCategories = [
    {
        id: 1,
        title: "New Event Planning",
        type: "success",

    },
    {
        id: 2,
        title: "Meeting",
        type: "info",
    },
    {
        id: 3,
        title: "Generating Reports",
        type: "warning",
    },
    {
        id: 4,
        title: "Create New theme",
        type: "danger",
    },
];

export { calenderDefaultCategories, events, defaultevent };