export interface Matches{
    matches:Match[];
}

export interface Match{
    id:number;
    name:string;
    location:string;
    sportName:string;
    endsAt:string;
    isRunning:boolean;
    teams:Team[];
    score:Score;
    playingTeam:number;
    story:string;
}

export interface Team{
    id:number;
    name:string;
    plays:string;
}

export interface Score{
    [key:string]: string;
}