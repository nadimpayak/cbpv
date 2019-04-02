export interface Nutrients {
    // USR_GRP (V_CD_TYP):
    // USR_GRP_ID: number;
    USR_GRP_CD: string;
    USR_GRP_DSC: string;
    EFF_STRT_DT_TM: string;
    EFF_END_DT_TM: string;
    GRP_TYP: string;
    // USR_ID: number;
    // ROLE_ID: number;

    // ROLE (V_CD_TYP):
    SR_GRP_ID: string; 
    ROLE_CD: string; 
    // ROLE_ID: string; 
    ROLE_DSC: string; 

    // AUTH (V_CD_TYP):
    AUTH_ID: string; 
    READ: string; 
    EXECUTE: string; 
    DELETE: string; 
    CREATE: string; 
    ROLE_ID: string; 
    AUTH_CD: string; 
    AUTH_DSC: string; 
    UPDATE: string; 
    AUTH_FLD: string; 

    // USR_GRP (V_CD_TYP):
    // USR_GRP_ID: number; 
    // USR_GRP_CD: string;
    // USR_GRP_DSC: string;
    // EFF_STRT_DT_TM: string;
    // EFF_END_DT_TM: string;
    // GRP_TYP: string;
    // USR_ID: number;
    // ROLE_ID: string; 
}


export class User {
    USR_ID: string;
    STS: string;
    USR_GRP_ID: string;
    REVALIDED: string;
    USR_DSC: string;
    USR_NM: string;
  
    constructor(obj?: any) {
        this.USR_ID = obj.ndbno || '';
        this.STS = obj.name || '';
        this.USR_GRP_ID = obj.name || '';
        this.REVALIDED = obj.name || '';
        this.USR_DSC = obj.name || '';
        this.USR_NM = obj.name || '';
    }
}