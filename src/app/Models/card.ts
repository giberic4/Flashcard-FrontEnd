export interface card {
id : number
front : string
back : string
state? : boolean
show? : boolean
}
export const defaultCard: card = {
    id: 0,
    front: '',
    back: '',
    state: false,
    show: true, // Default value for optional property
  };