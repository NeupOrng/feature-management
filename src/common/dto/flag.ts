export class FlagDto {
    id: string;
    name: string;
    key: string;
    description?: string;
    isEnabled: boolean;
}

export class AppDto {
    id: string;
    name: string;
    description?: string;
    flags: FlagDto[];
}


export class ProjDto {
    id: string;
    name: string;
    description?: string;
    applications: AppDto[];
}