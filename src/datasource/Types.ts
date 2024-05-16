export interface User {
    id?:number
    username?:String
    password?: String
    nickname?: String
    role?: String
    email?:String
}
export interface Recommend {
    id?:number
    user_name?:String
    singer_name?:String
    recommend_reason?:String
    complete?:boolean
}