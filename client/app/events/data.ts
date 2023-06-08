import { EventUIProps } from "@/components/event"
import moment from "moment"

export const dataEvent: EventUIProps[] = [
    { id: crypto.randomUUID(), title: 'Event 1', date: moment().format('ll'), location: 'London, UK', type: 'off-work', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. ' },
    { id: crypto.randomUUID(), title: 'Event 2', date: moment().format('ll'), location: 'London, UK', type: 'off-work', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. ' },
    { id: crypto.randomUUID(), title: 'Event 3', date: moment().format('ll'), location: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzFhN2E5N2EtOWVlZC00YzQzLTllNmYtMzg1MTIwYjMyYThm%40thread.v2/0?context=%7b%22Tid%22%3a%22e36a4f3b-b339-4c34-b999-553e5a183eca%22%2c%22Oid%22%3a%224eeee018-4b61-46ec-9b0a-a37e2c8fb3e1%22%7d', type: 'work', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. ' },
    { id: crypto.randomUUID(), title: 'Event 4', date: moment().format('ll'), location: 'https://meet.google.com/nio-dygu-hkr', type: 'work', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. ' },
]