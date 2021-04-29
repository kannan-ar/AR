import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

interface Message {
    type: string,
    value: any
}

const subject = new Subject<Message>()

export const getSubscriber = (type: string) => {
    return subject.pipe(filter(x => x.type === type))
}

export const pushMessage = (type: string, value: any) => {
    subject.next({
        type: type,
        value: value,
    })
}
