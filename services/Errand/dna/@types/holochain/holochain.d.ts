// holochain type definitions


type Hash = string;
type Signature = string;
type HolochainError = object;
type PackageRequest = object;

/*============================================
=            Holochain Data Types            =
============================================*/

interface Header {
  Type: string;
  Time: string;
  HeaderLink: Hash;
  EntryLink: Hash;
  TypeLink: Hash;
  Sig: Signature;
  Change: Hash;
}

interface GetResponse {
  Entry?: any;
  EntryType?: string;
  Sources?: Hash[]; 
}

interface GetLinksResponse {
  Hash: Hash;
  Entry?: any;
  EntryType?: string;
  Tag?: string;
  Source?: Hash;
}

interface QueryResponse {
  Hash?: string
  Entry?: any
  Header?: Header
}

interface BridgeStatus {
  Side: number;
  CalleeName?: string;
  CalleeApp?: Hash;
  Token?: string;
}


/*=====  End of Holochain Data Types  ======*/


interface HolochainSystemGlobals {
  Version: string;
  HashNotFound: any;
  Status: any;
  GetMask: any;
  LinkAction: any;
  PkgReq: any;
  Bridge: any;
  SysEntryType: any;
  BundleCancel: any;
}

interface HolochainAppGlobals {
  Name: string;
  DNA: {
    Hash: Hash;
  };
  Key: {
    Hash: Hash;
  }
  Agent: {
    Hash: Hash;
    TopHash: Hash;
    String: string;
  }
}



